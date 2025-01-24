const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [14.8, 42],
  units: "cm",
  pixelsPerInch: 300,
  scaleToView: true,
};

const sectionA = (context) => {
  // SECTION 1: Random Values
  context.fillText("Random Values", 1, 1); // Title for this section

  for (let i = 0; i < 7; i++) {
    const x = 1 + i * 1.6; // Calculate x position for each value
    const y = 2; // Fixed y position
    const value = random.value().toFixed(i); // Generate a random value
    console.log(typeof (Number(value)));
    context.fillText(value, x, y); // Display the value
  }
};

const sectionB = (context) => {
  // SECTION 2: Random Points on a Circle
  const radius = 3; // Circle radius
  const circleCenter = [7, 8]; // Center of the circle
  context.beginPath();
  context.arc(circleCenter[0], circleCenter[1], radius, 0, Math.PI * 2); // Draw the circle
  context.strokeStyle = "rgba(0,0,0,.3)"; // Circle outline color
  context.lineWidth = 0.05; // Circle outline thickness
  context.stroke();

  context.fillStyle = "red"; // Color for points
  for (let i = 0; i < 13; i++) {
    const [x, y] = random.onCircle(radius); // Generate a random point on the circle
    context.beginPath();
    context.lineTo(7, 8);
    context.lineTo(circleCenter[0] + x, circleCenter[1] + y);
    context.stroke();

    context.beginPath();
    context.arc(circleCenter[0] + x, circleCenter[1] + y, 0.1, 0, Math.PI * 2); // Draw the point
    context.fill();
  }
};

const sectionC = (context) => {
  // SECTION 3: Noise
  const noiseScale = 0.1; // Scale for noise coordinates
  context.fillText("Noise (2D)", 1, 10); // Title for this section
  for (let i = 0; i < 1000; i++) {
    const x = random.range(1, 14); // Random x position
    const y = random.range(11, 18); // Random y position
    const noise = random.noise2D(x * noiseScale, y * noiseScale, 1, 1); // Generate 2D noise
    const size = Math.abs(noise) * 0.5; // Map noise to size
    context.beginPath();
    context.arc(x, y, size, 0, Math.PI * 2); // Draw a circle based on noise
    context.fillStyle = `hsl(${(noise + 1) * 360}, 80%, 60%)`; // Map noise to color
    context.fill();
  }
};

const sectionD = (context) => {
  // SECTION 4: Weighted Randomness
  const colors = [
    { value: "red", weight: 1 },
    { value: "blue", weight: 3 },
    { value: "green", weight: 5 },
  ];
  context.fillText("Weighted Colors", 1, 19); // Title for this section
  for (let i = 0; i < 10; i++) {
    const color = random.weightedSet(colors); // Pick a color based on weight
    context.fillStyle = color; // Set the fill color
    context.fillRect(1 + i * 1.2, 20, 1, 1); // Draw a rectangle with the chosen color
  }
};
const sectionE = (context) => {
  // SECTION 5: Shuffle an Array
  const originalArray = ["A", "B", "C", "D", "E"]; // Define an array
  const shuffledArray = random.shuffle(originalArray.slice()); // Shuffle the array
  context.fillText("Original: " + originalArray.join(" "), 1, 22); // Display original array
  context.fillText("Shuffled: " + shuffledArray.join(" "), 1, 23); // Display shuffled array
};

const sectionF = (context) => {
  context.fillText("Random Utilities", 1, 24); // Title for this section

  // Random Chance Visualization
  for (let i = 0; i < 20; i++) {
    const x = 1 + i * 0.5;
    const y = 25;
    const result = random.chance(0.7);
    context.fillStyle = result ? "green" : "red";
    context.fillRect(x, y, 0.4, 0.4);
  }
  context.fillText("Chance (0.7): Green=True, Red=False", 1, 26);

  // Random Range Visualization
  const rangeMin = 1;
  const rangeMax = 14;
  context.fillStyle = "blue";
  for (let i = 0; i < 20; i++) {
    const value = random.range(rangeMin, rangeMax);
    context.beginPath();
    context.arc(value, 27, 0.2, 0, Math.PI * 2);
    context.fill();
  }
  context.fillText("Range (10-20): Blue Dots", 1, 28);

  // Random Range Floor Visualization
  context.fillStyle = "purple";
  for (let i = 1; i <= 10; i++) {
    context.fillRect(i, 30, 0.4, 0.4);
  }
  const floorValue = random.rangeFloor(1, 10);
  context.fillStyle = "orange";
  context.fillRect(floorValue, 30, 0.4, 0.4);
  context.fillText("RangeFloor (1-10): Purple=Range, Orange=Sample", 1, 31);

  // Random Gaussian Visualization
  const gaussianData = [];
  for (let i = 0; i < 100; i++) {
    gaussianData.push(random.gaussian(5, 2));
  }
  gaussianData.forEach((value) => {
    context.fillStyle = "orange";
    context.fillRect(1 + value, 33, 0.2, 0.2);
  });
  context.fillText("Gaussian (mean: 5, std: 2): Histogram", 1, 34);

  // Random On Circle Visualization
  const onCircleRadius = 2;
  context.beginPath();
  context.arc(10, 36, onCircleRadius, 0, Math.PI * 2);
  context.strokeStyle = "black";
  context.lineWidth = 0.05;
  context.stroke();
  context.fillStyle = "green";
  for (let i = 0; i < 50; i++) {
    const [x, y] = random.onCircle(onCircleRadius);
    context.beginPath();
    context.arc(10 + x, 36 + y, 0.1, 0, Math.PI * 2);
    context.fill();
  }
  context.fillText("OnCircle (r=2): Green Dots", 1, 37);

  // Random Inside Circle Visualization
  const insideCircleRadius = 2;
  context.beginPath();
  context.arc(20, 38, insideCircleRadius, 0, Math.PI * 2);
  context.strokeStyle = "black";
  context.lineWidth = 0.05;
  context.stroke();
  context.fillStyle = "blue";
  for (let i = 0; i < 50; i++) {
    const [x, y] = random.insideCircle(insideCircleRadius);
    context.beginPath();
    context.arc(20 + x, 38 + y, 0.1, 0, Math.PI * 2);
    context.fill();
  }
  context.fillText("InsideCircle (r=2): Blue Dots", 1, 39);
};



const sketch = ({ width, height }) => {
  // Set a deterministic seed for reproducible randomness
  const seed = random.getRandomSeed(); // Generate a random seed
  random.setSeed(seed); // Set the seed for deterministic results
  console.log("Seed:", seed); // Log the seed for reproducibility

  return ({ context, width, height }) => {
    // Clear the canvas before drawing
    context.clearRect(0, 0, width, height);

    context.font = "0.01cm sans-serif"; // Set font size for text
    context.fillStyle = "black"; // Set text color

    sectionA(context);
    sectionB(context);
    sectionC(context);
    sectionD(context);
    sectionE(context);

    sectionF(context); // Include the new section for random utilities

    return context.canvas; // Return the canvas for rendering
  };
};

canvasSketch(sketch, settings);
