const canvasSketch = require("canvas-sketch");
const { polylinesToSVG } = require("canvas-sketch-util/penplot");

const random = require("canvas-sketch-util/random");
const convexHull = require("convex-hull");
const clustering = require("density-clustering");

const settings = {
  dimensions: [14.8, 21], //"A5",
  orientation: "portrait",
  pixelsPerInch: 300,
  scaleToView: true,
  units: "cm",
};
const lines = [];
const clusterCount = 3;

const sketch = () => {
  // Generate random points on the canvas, avoiding negative values
  const pointCount = 1.618 * 1000;
  const margin = 3;
  let points = Array.from({ length: pointCount }, () => [
    Math.max(
      random.value() * (settings.dimensions[0] - 2 * margin) + margin,
      0,
    ),
    Math.max(
      random.value() * (settings.dimensions[1] - 2 * margin) + margin,
      0,
    ),
  ]);

  /*
   * console.log(settings.dimensions);

  // Ensure there are enough points for a convex hull
  if (points.length < 3) {
    throw new Error("Not enough points to create a convex hull.");
  }

  // Calculate the convex hull using the points
  let hullEdges;
  try {
    hullEdges = convexHull(points);
  } catch (error) {
    console.error("Error calculating convex hull:", error);
    return;
  }

  // Convert edges to vertices for both canvas drawing and SVG export
  const hull = hullEdges.map((edge) => points[edge[0]]);
  hull.push(hull[0]); // Close the loop
  lines.push(hull);

  */

  const update = () => {
    if (points.length <= clusterCount) return;

    const scan = new clustering.KMEANS();
    const clusters = scan.run(points, clusterCount).filter((c) =>
      c.length >= 3
    );

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

  return ({ context, width, height, units, playhead }) => {
    update(playhead);
    update(playhead);
    update(playhead);
    update(playhead);
    update(playhead);
    update(playhead);
    update(playhead);
    update(playhead);
    update(playhead);
    update(playhead);
    update(playhead);
    update(playhead);
    update(playhead);
    update(playhead);
    update(playhead);
    update(playhead);
    update(playhead);
    update(playhead);
    update(playhead);
    update(playhead);
    update(playhead);
    update(playhead);
    update(playhead);
    update(playhead);
    update(playhead);
    update(playhead);
    update(playhead);
    update(playhead);
    update(playhead);
    update(playhead);
    update(playhead);
    update(playhead);
    update(playhead);
    update(playhead);
    update(playhead);
    update(playhead);

    console.log(playhead)
    context.clearRect(0, 0, width, height);

    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    // context.fillStyle = "black";
    // points.forEach(([x, y]) => {
    //   context.beginPath();
    //   context.arc(x, y, 0.1, 0, Math.PI * 2);
    //   context.fill();
    // });

    context.strokeStyle = "red";
    context.lineWidth = 0.05;
    lines.forEach((line) => {
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
