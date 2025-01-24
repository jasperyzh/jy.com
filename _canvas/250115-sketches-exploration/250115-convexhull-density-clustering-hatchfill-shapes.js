const canvasSketch = require("canvas-sketch");
const { polylinesToSVG } = require("canvas-sketch-util/penplot");
const random = require("canvas-sketch-util/random");
const { lerp } = require("canvas-sketch-util/math");
const convexHull = require("convex-hull");
const clustering = require("density-clustering");

const DEBUG = 10;

const settings = {
  dimensions: [14.8, 21],
  orientation: "portrait",
  pixelsPerInch: 300,
  scaleToView: true,
  units: "cm",
};

const lines = [];
const hatchfills = [];
const clusterCount = 3;

const sketch = () => {
  const pointCount = 1.618 * 1300;
  const margin = 5;
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

  const update = () => {
    for (let i = 0; i < 20; i++) {
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
    }
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

  const drawHatchFill = (context, path) => {
    const [minX, minY, maxX, maxY] = path.reduce(
      ([minX, minY, maxX, maxY], [x, y]) => [
        Math.min(minX, x),
        Math.min(minY, y),
        Math.max(maxX, x),
        Math.max(maxY, y),
      ],
      [Infinity, Infinity, -Infinity, -Infinity],
    );

    context.strokeStyle = "#131313";
    context.lineWidth = 0.03;

    const minRange = 0.1;
    const maxRange = 0.2;
    const scaleRange = 0.5;

    const noiseScale = 0.1;

    for (let x = minX; x <= maxX; x += random.range(minRange, maxRange)) {
      for (let y = minY; y <= maxY; y += random.range(minRange, maxRange)) {
        if (pointInPolygon([x, y], path)) {
          const noiseValue = random.noise2D(x * noiseScale, y * noiseScale) *
            Math.PI * 2;
          const offsetX = random.range(-0.01, 0.03);
          const offsetY = random.range(-0.05, 0.05);
          /* context.save();
          context.translate(x + offsetX, y + offsetY);
          context.rotate(noiseValue);
          context.beginPath();
          context.moveTo(-0.1, 0);
          context.lineTo(0.1, 0);
          context.moveTo(0, -0.1);
          context.lineTo(0, 0.1);
          context.stroke();
          context.restore(); */
          let scaleRangeAvg = lerp(0.00001, 0.02, scaleRange * noiseValue);
          // let scaleRangeAvg = scaleRange * noiseValue;

          // console.log(scaleRangeAvg, noiseValue)
          context.save();
          context.miterLimit = 4;
          context.translate(x + offsetX, y + offsetY);
          context.rotate(noiseValue);
          context.scale(scaleRangeAvg, scaleRangeAvg);
          
          context.save(); // Save the transformed context
          context.beginPath();
          context.arc(50, 50, 30, 0, 2 * Math.PI, false);
          context.closePath();
          context.fill();
          
          // Reset transformations for consistent stroke weight
          context.save();
          context.setTransform(1, 0, 0, 1, 0, 0); // Reset to identity matrix
          context.strokeStyle = "rgba(0, 0, 0, 1)";
          context.lineWidth = 1; // Consistent stroke weight
          context.stroke();
          context.restore(); // Restore previous transformations
          
          context.restore();
          context.restore();

          
          const radiusX = random.range(0.1, 0.3);  // For the horizontal radius
          const radiusY = radiusX * random.range(0.8, 1.2); // Slight variation for ellipses
          
          // Convert ellipse to a polyline for SVG export
          const circlePoints = circleToPolyline(x + offsetX, y + offsetY, scaleRangeAvg* 30);
          hatchfills.push(circlePoints);
        
          /*
          context.save();
          context.translate(x + offsetX, y + offsetY);
          context.rotate(noiseValue);
          context.strokeStyle = "rgba(0,0,0,0)";
          context.miterLimit = 4;
          context.font = "15px ''";
          context.fillStyle = "rgba(0,0,0,0)";
          context.font = "   15px ''";
          context.scale(scaleRangeAvg, scaleRangeAvg);
          context.save();
          context.fillStyle = "black";
          context.font = "   15px ''";
          context.beginPath();
          context.moveTo(68.3048, 113.022);
          context.lineTo(293, 113.022);
          context.lineTo(293, 139.033);
          context.lineTo(68.3048, 139.033);
          context.lineTo(68.3048, 113.022);
          context.closePath();
          context.moveTo(86.5401, 74.0064);
          context.lineTo(265.184, 74.0064);
          context.lineTo(265.184, 178.668);
          context.lineTo(83.1403, 178.668);
          context.lineTo(83.1403, 153.896);
          context.lineTo(230.258, 153.896);
          context.lineTo(230.258, 99.088);
          context.lineTo(86.5401, 99.088);
          context.lineTo(86.5401, 74.0064);
          context.closePath();
          context.moveTo(151.445, 56.0467);
          context.lineTo(186.988, 56.0467);
          context.lineTo(186.988, 254.223);
          context.bezierCurveTo(
            186.988,
            272.802,
            182.97,
            280.853,
            170.917,
            285.807,
          );
          context.bezierCurveTo(
            158.863,
            290.761,
            141.246,
            291.381,
            115.593,
            291.381,
          );
          context.bezierCurveTo(
            114.047,
            282.401,
            109.411,
            268.776,
            104.466,
            260.106,
          );
          context.bezierCurveTo(
            120.538,
            260.725,
            139.082,
            260.725,
            144.336,
            260.416,
          );
          context.bezierCurveTo(
            149.591,
            260.416,
            151.445,
            258.867,
            151.445,
            253.913,
          );
          context.lineTo(151.445, 56.0467);
          context.closePath();
          context.moveTo(68.3048, 197.557);
          context.lineTo(88.3945, 177.739);
          context.bezierCurveTo(
            103.539,
            184.861,
            123.32,
            196.937,
            133.519,
            205.608,
          );
          context.lineTo(111.884, 227.593);
          context.bezierCurveTo(
            102.921,
            218.613,
            83.4494,
            205.917,
            68.3048,
            197.557,
          );
          context.closePath();
          context.moveTo(253.439, 179.907);
          context.lineTo(280.637, 201.892);
          context.bezierCurveTo(
            261.166,
            214.588,
            238.603,
            227.593,
            220.986,
            235.334,
          );
          context.lineTo(200.278, 216.755);
          context.bezierCurveTo(
            216.968,
            207.775,
            240.149,
            191.673,
            253.439,
            179.907,
          );
          context.closePath();
          context.moveTo(192.861, 170.927);
          context.bezierCurveTo(
            208.314,
            212.11,
            240.458,
            244.004,
            288.055,
            257.629,
          );
          context.bezierCurveTo(
            280.328,
            264.441,
            270.438,
            278.066,
            265.493,
            287.355,
          );
          context.bezierCurveTo(
            215.114,
            269.086,
            183.28,
            230.38,
            165.044,
            177.429,
          );
          context.lineTo(192.861, 170.927);
          context.closePath();
          context.moveTo(55.3238, 249.888);
          context.bezierCurveTo(
            75.7226,
            243.385,
            106.321,
            231.928,
            136.301,
            220.471,
          );
          context.lineTo(142.791, 247.101);
          context.bezierCurveTo(
            118.993,
            258.558,
            93.3397,
            270.015,
            72.6319,
            279.304,
          );
          context.lineTo(55.3238, 249.888);
          context.closePath();
          context.moveTo(138.773, 0);
          context.lineTo(177.407, 0);
          context.lineTo(177.407, 43.6607);
          context.lineTo(138.773, 43.6607);
          context.lineTo(138.773, 0);
          context.closePath();
          context.moveTo(45.1245, 26.6299);
          context.lineTo(289.291, 26.6299);
          context.lineTo(289.291, 58.8335);
          context.lineTo(45.1245, 58.8335);
          context.lineTo(45.1245, 26.6299);
          context.closePath();
          context.moveTo(27.5074, 26.6299);
          context.lineTo(62.7416, 26.6299);
          context.lineTo(62.7416, 116.428);
          context.bezierCurveTo(
            62.7416,
            167.211,
            58.1055,
            243.695,
            30.289,
            292,
          );
          context.bezierCurveTo(23.7985, 285.807, 8.34494, 275.279, 0, 271.873);
          context.bezierCurveTo(
            25.653,
            227.283,
            27.5074,
            162.566,
            27.5074,
            116.428,
          );
          context.lineTo(27.5074, 26.6299);
          context.closePath();
          context.fill();
          context.stroke();
          context.restore();
          context.restore(); */
        }
      }
    }
  };

  return ({ context, width, height, units }) => {
    update();

    context.clearRect(0, 0, width, height);
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    lines.forEach((line) => {
      drawHatchFill(context, line);

      context.strokeStyle = "red";
      context.lineWidth = 0.05;
      context.beginPath();
      if (DEBUG) {
        line.forEach(([x, y], index) => {
          if (index === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        });
      }
      context.closePath();
      context.stroke();
    });

    return [
      context.canvas,
      {
        data: [polylinesToSVG([...lines, ...hatchfills], { width, height, units })],
        extension: ".svg",
      },
    ];
  };
};

canvasSketch(sketch, settings);
