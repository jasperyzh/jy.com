const canvasSketch = require("canvas-sketch");
const { polylinesToSVG } = require("canvas-sketch-util/penplot");
const random = require("canvas-sketch-util/random");
const convexHull = require("convex-hull");
const clustering = require("density-clustering");

const settings = {
  dimensions: [14.8, 21],
  orientation: "portrait",
  pixelsPerInch: 300,
  scaleToView: true,
  units: "cm",
};
const lines = [];
const clusterCount = 3;

const sketch = () => {
  const pointCount = 1.618 * 1000;
  const margin = 3;
  let points = Array.from({ length: pointCount }, () => [
    Math.max(
      random.value() * (settings.dimensions[0] - 2 * margin) + margin,
      0
    ),
    Math.max(
      random.value() * (settings.dimensions[1] - 2 * margin) + margin,
      0
    ),
  ]);

  const update = () => {
    if (points.length <= clusterCount) return;

    const scan = new clustering.KMEANS();
    const clusters = scan.run(points, clusterCount).filter((c) => c.length >= 3);

    if (clusters.length === 0) return;

    clusters.sort((a, b) => a.length - b.length);
    const cluster = clusters[0];
    const positions = cluster.map((i) => points[i]);

    const edges = convexHull(positions);
    if (edges.length <= 2) return;

    let path = edges.map((c) => positions[c[0]]);
    path.push(path[0]);
    lines.push(path);

    points = points.filter((p) => !positions.includes(p));
  };

  const pointInPolygon = (point, vs) => {
    let x = point[0], y = point[1];
    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      let xi = vs[i][0], yi = vs[i][1];
      let xj = vs[j][0], yj = vs[j][1];
      let intersect = ((yi > y) !== (yj > y)) &&
                      (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  };

  const drawHatchFill = (context, path) => {
    const [minX, minY, maxX, maxY] = path.reduce(
      ([minX, minY, maxX, maxY], [x, y]) => [
        Math.min(minX, x),
        Math.min(minY, y),
        Math.max(maxX, x),
        Math.max(maxY, y),
      ],
      [Infinity, Infinity, -Infinity, -Infinity]
    );

    context.strokeStyle = "blue";
    context.lineWidth = 0.03;

    for (let x = minX; x <= maxX; x += 0.2) {
      for (let y = minY; y <= maxY; y += 0.2) {
        if (pointInPolygon([x, y], path)) {
          context.beginPath();
          context.moveTo(x, y);
          context.lineTo(x + 0.2, y + 0.2);
          context.stroke();
        }
      }
    }
  };

  return ({ context, width, height, units }) => {
    update();
    update();
    update();
    update();
    update();
    update();
    update();
    update();
    update();
    update();
    update();
    update();
    update();
    update();
    update();

    context.clearRect(0, 0, width, height);
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    lines.forEach((line) => {
      drawHatchFill(context, line);

      context.strokeStyle = "red";
      context.lineWidth = 0.05;
      context.beginPath();
      line.forEach(([x, y], index) => {
        if (index === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      });
      context.closePath();
      context.stroke();
    });

    return [
      context.canvas,
      {
        data: polylinesToSVG(lines, { width, height, units }),
        extension: ".svg",
      },
    ];
  };
};

canvasSketch(sketch, settings);
