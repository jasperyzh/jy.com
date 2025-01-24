
// pen-plotter sketches examples

// pen-plotter-circles.js - Typical example of pen plotter artwork using polylines
// https://github.com/mattdesl/canvas-sketch/blob/master/examples/pen-plotter-circles.js

// pen-plotter-patchwork - Advanced example of pen plotter algorithms, as well as manually exporting PNG and SVG layers
// https://github.com/mattdesl/canvas-sketch/blob/master/examples/pen-plotter-patchwork.js


// Pen Plotter Art & Algorithms, Part 1 - https://mattdesl.svbtle.com/pen-plotter-1
// Pen Plotter Art & Algorithms, Part 2 - https://mattdesl.svbtle.com/pen-plotter-2


/* 
canvas-sketch-util - https://github.com/mattdesl/canvas-sketch-util

math - https://github.com/mattdesl/canvas-sketch-util/blob/master/docs/math.md

random - https://github.com/mattdesl/canvas-sketch-util/blob/master/docs/random.md

color - https://github.com/mattdesl/canvas-sketch-util/blob/master/docs/color.md

penplot - https://github.com/mattdesl/canvas-sketch-util/blob/master/docs/penplot.md

geometry - https://github.com/mattdesl/canvas-sketch-util/blob/master/docs/geometry.md

*/


const canvasSketch = require('canvas-sketch');
const { polylinesToSVG } = require('canvas-sketch-util/penplot');
const random = require('canvas-sketch-util/random');

const clustering = require('density-clustering');
const convexHull = require('convex-hull');

/* 
density-clustering

The density-clustering library provides various clustering algorithms for grouping points based on proximity and density. In the given code, it is used for performing k-means clustering.

    Clustering.KMEANS(): This method groups the points into a specified number of clusters (in this case, clusterCount = 3). Each cluster consists of points that are closer to a particular centroid compared to others.
    scan.run(points, clusterCount): Runs the k-means algorithm on the points array and returns an array of clusters. Each cluster is an array of point indices (not the points themselves but their indices in the original points array).
    Filtering Clusters: Only clusters with at least three points are retained since a minimum of three points is needed for a valid convex hull.

convex-hull

The convex-hull library computes the convex hull of a set of points. The convex hull is the smallest convex shape (polygon) that can enclose all the points in a given set. It's like wrapping a rubber band around a set of points.

    convexHull(positions): This function returns an array of edges, where each edge is represented by two indices referring to points in the positions array.
    Hull Construction: The code then constructs a path from the convex hull edges, which forms a closed polygon around the cluster.

How They Work Together

    Clustering: The points are clustered using density-clustering.
    Hull Generation: The smallest cluster is selected and its convex hull is calculated using convex-hull.
    Drawing the Hull: The convex hull points are used to draw a closed path (polygon) on the canvas.
    Points Removal: The points inside the convex hull are removed from the dataset for the next iteration.
*/
const debug = false;

const settings = {
  dimensions: [ 12, 12 ],
  pixelsPerInch: 300,
  units: 'cm',
};

const sketch = ({ width, height, units, render }) => {
  // A large point count will produce more defined results
  const pointCount = 50000;
  let points = Array.from(new Array(pointCount)).map(() => {
    const margin = 2;
    return [
      random.range(margin, width - margin),
      random.range(margin, height - margin)
    ];
  });

  // We will add to this over time
  const lines = [];

  // The N value for k-means clustering
  // Lower values will produce bigger chunks
  const clusterCount = 3;

  // Thickness of pen in cm
  const penThickness = 0.03;

  // Run at 30 FPS until we run out of points
  let loop = setInterval(() => {
    const remaining = integrate();
    if (!remaining) return clearInterval(loop);
    render();
  }, 1000 / 30);

  return ({ context }) => {
    // Clear canvas
    context.clearRect(0, 0, width, height);

    // Fill with white
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // Draw lines
    lines.forEach(points => {
      context.beginPath();
      points.forEach(p => context.lineTo(p[0], p[1]));
      context.strokeStyle = debug ? 'blue' : 'black';
      context.lineWidth = penThickness;
      context.lineJoin = 'round';
      context.lineCap = 'round';
      context.stroke();
    });

    // Turn on debugging if you want to see the points
    if (debug) {
      points.forEach(p => {
        context.beginPath();
        context.arc(p[0], p[1], 0.02, 0, Math.PI * 2);
        context.strokeStyle = context.fillStyle = 'red';
        context.lineWidth = penThickness;
        context.fill();
      });
    }

    return [
      // Export PNG as first layer
      context.canvas,
      // Export SVG for pen plotter as second layer
      {
        data: polylinesToSVG(lines, {
          width,
          height,
          units
        }),
        extension: '.svg'
      }
    ];
  };

  function integrate () {
    // Not enough points in our data set
    if (points.length <= clusterCount) return false;

    // k-means cluster our data
    const scan = new clustering.KMEANS();
    const clusters = scan.run(points, clusterCount)
      .filter(c => c.length >= 3);

    // Ensure we resulted in some clusters
    if (clusters.length === 0) return;

    // Sort clusters by density
    clusters.sort((a, b) => a.length - b.length);

    // Select the least dense cluster
    const cluster = clusters[0];
    const positions = cluster.map(i => points[i]);

    // Find the hull of the cluster
    const edges = convexHull(positions);

    // Ensure the hull is large enough
    if (edges.length <= 2) return;

    // Create a closed polyline from the hull
    let path = edges.map(c => positions[c[0]]);
    path.push(path[0]);

    // Add to total list of polylines
    lines.push(path);

    // Remove those points from our data set
    points = points.filter(p => !positions.includes(p));

    return true;
  }
};

canvasSketch(sketch, settings);