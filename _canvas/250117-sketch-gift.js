const canvasSketch = require("canvas-sketch");
const { pathsToSVG, createPath, renderPaths } = require(
  "canvas-sketch-util/penplot",
);
const random = require("canvas-sketch-util/random");
const { lerp } = require("canvas-sketch-util/math");

const convexHull = require("convex-hull");
const clustering = require("density-clustering");

const DRAW_CONVEX = 1;

const settings = {
  dimensions: [12, 12],
  orientation: "portrait",
  pixelsPerInch: 300,
  scaleToView: true,
  units: "cm",
};

const POINT_COUNT = 1200;
const MARGIN = 3; // cm
const CLUSTER_COUNT = 3;

const convex_lines = [];
const circles_lines = [];

const sketch = ({ width, height }) => {
  const paths = [];

  const SVG_EXPORT = pathsToSVG(paths, {
    width: 14.8,
    height: 21,
    units: "cm",
    lineWidth: 0.03,
    fillStyle: "red",
    optimize: true,
  });

  let points = Array.from({ length: POINT_COUNT }, () => [
    Math.max(
      random.value() * (settings.dimensions[0] - 2 * MARGIN) + MARGIN,
      0,
    ),
    Math.max(
      random.value() * (settings.dimensions[1] - 2 * MARGIN) + MARGIN,
      0,
    ),
  ]);

  const setup_convex = () => {
    if (points.length <= CLUSTER_COUNT) return;

    const scan = new clustering.KMEANS();
    const clusters = scan.run(points, CLUSTER_COUNT).filter((c) =>
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
    convex_lines.push(path);

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

  const circleToPolyline = (x, y, radius, steps = 100) => {
    const circlePoints = [];
    for (let i = 0; i <= steps; i++) {
      const angle = (i / steps) * Math.PI * 2;
      const pointX = x + Math.cos(angle) * radius;
      const pointY = y + Math.sin(angle) * radius;
      circlePoints.push([pointX, pointY]);
    }
    return circlePoints;
  };

  const draw_circles = (context, path) => {


    // console.log("draw_circles");
    const [minX, minY, maxX, maxY] = path.reduce(
      ([minX, minY, maxX, maxY], [x, y]) => [
        Math.min(minX, x),
        Math.min(minY, y),
        Math.max(maxX, x),
        Math.max(maxY, y),
      ],
      [Infinity, Infinity, -Infinity, -Infinity],
    );

    const minDensity = 0.23;
    const maxDensity = 0.432;
    const minScale = 0.01;
    const maxScale = 0.3;
    const noiseScale = 0.08;

    for (let x = minX; x <= maxX; x += random.range(minDensity, maxDensity)) {
      for (let y = minY; y <= maxY; y += random.range(minDensity, maxDensity)) {
        // console.log("draw_circles loop");

        if (pointInPolygon([x, y], path)) {
          const noiseValue = random.noise2D(x * noiseScale, y * noiseScale) *
            Math.PI * 2;
          const offsetX = -1//random.range(-0.000001, 0.000001);
          const offsetY = -1//random.range(-0.000001, 0.000001);

          let scaleRangeAvg = lerp(minScale, maxScale, Math.abs(noiseValue));

          const centerX = x + offsetX * 1.618;
          const centerY = y + offsetY * 1.618;
          const radius = scaleRangeAvg;

          // Calculate the top-left corner of the bounding box
          const topLeftX = centerX + radius;
          const topLeftY = centerY + radius;

          // Define the rotation angle in degrees
          const rotationAngleDegrees = noiseValue * (180 / Math.PI); // Convert radians to degrees
          const rotationAngleRadians = rotationAngleDegrees * (Math.PI / 180); // Convert back to radians

          // Rotate the top-left point and determine the new center
          const rotatedCenterX =
            Math.cos(rotationAngleRadians) * (centerX - topLeftX) -
            Math.sin(rotationAngleRadians) * (centerY - topLeftY) +
            topLeftX;
          const rotatedCenterY =
            Math.sin(rotationAngleRadians) * (centerX - topLeftX) +
            Math.cos(rotationAngleRadians) * (centerY - topLeftY) +
            topLeftY;

          // Add hatch fill path
          circles_lines.push(createPath((ctx) => {
            // Draw the arc with its new rotated position
            ctx.arc(
              rotatedCenterX,
              rotatedCenterY,
              radius, // Radius of the arc
              0,
              2 * Math.PI,
              false,
            );
            ctx.closePath();

            // Optionally, add more shapes or lines here
          }));
        }
      }
    }
  };

  return ({ context, width, height, units }) => {
    context.clearRect(0, 0, width, height);

    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    context.strokeStyle = "#131313";
    context.lineWidth = 0.03;
    context.miterLimit = 4; // what is miterLimit?

    for (let i = 0; i < 7; i++) {
      setup_convex();
    }

    const draw_convex = createPath((ctx) => {
      convex_lines.forEach((line) => {
        line.forEach(([x, y], index) => {
          if (index === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
      });
    });

    const convex_path = [draw_convex];
    // paths.push(draw_convex);

    convex_lines.forEach((line) => {
      draw_circles(context, line);
    });
    paths.push(...circles_lines);

    // EMULATE SVG EXPORT
    paths.forEach((path) => {
      // Convert the path to a string for SVG compatibility
      const pathString = path.toString();
      const tempPath = new Path2D(pathString);
      context.fillStyle = "rgba(255, 255, 255, 1)";
      context.fill(tempPath);
      context.strokeStyle = "rgba(0, 0, 0, 1)";
      context.lineWidth = 0.03;
      context.stroke(tempPath);
    });

    convex_path.forEach((path) => {
      // Convert the path to a string for SVG compatibility
      const pathString = path.toString();
      const tempPath = new Path2D(pathString);
      context.fillStyle = "rgba(255, 255, 255, 0)";
      context.fill(tempPath);
      context.strokeStyle = "rgba(255, 0, 0, 1)";
      context.lineWidth = 0.1;
      context.stroke(tempPath);
    });

    // EXPORTS
    return [
      // Export PNG as first layer
      context.canvas,
      // Export SVG for pen plotter as second layer
      /* {
        data: pathsToSVG(convex_lines, {
          width,
          height,
          units,
        }),
        extension: ".svg",
      },
      // Export SVG with fills
      {
        data: SVG_EXPORT,
        extension: ".svg",
      }, */
      {
        data: pathsToSVG(paths, {
          width: 14.8,
          height: 21,
          units: "cm",
          lineWidth: 0.03,
          fillStyle: "white",
          // optimize the SVG output for pen plotter use
          // optimize: true,
        }),
        extension: ".svg",
      },
      {
        data: pathsToSVG(convex_path, {
          width: 14.8,
          height: 21,
          units: "cm",
          lineWidth: 0.03,
          // fillStyle: "red",
          // optimize the SVG output for pen plotter use
          optimize: true,
        }),
        extension: ".svg",
      },
      /*  ,
      pathsToSVG(convex_path, {
        width: 14.8,
        height: 21,
        units: "cm",
        lineWidth: 0.03,
        fillStyle: "red",
        // optimize the SVG output for pen plotter use
        optimize: true,
      }), */
    ];
  };
};

canvasSketch(sketch, settings);
