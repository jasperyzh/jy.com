import { a as createComponent, b as renderTemplate, r as renderComponent, m as maybeRenderHead } from './astro/server_BuftSjIy.mjs';
import 'kleur/colors';
import { a as $$BaseLayout } from './BaseLayout_DEWwRiOq.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a, _b;
const $$250401Flowarrow = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_b || (_b = __template(["", ` <script>
  // --- Parameters ---
  let params = {
    numLines: 180, // Number of lines to draw
    minLineLength: 30, // Minimum length of a line
    maxLineLength: 250, // Maximum length of a line
    flowStrength: 60,  // How strongly the flow field pushes the curve (Increased default)
    randomCurvature: 5, // Max random deviation perpendicular to flow (Reduced default)
    noiseScale: 0.01, // Scale of the Perlin noise field
    driftFactor: 0.05, // How much lines tend to drift horizontally (Reduced default)
    strokeThickness: 1.2, // Line thickness
    arrowSize: 5, // Size of the arrowhead lines
    allowLeftDrift: 0.1, // Probability (0-1) a line drifts left instead of right (Less relevant now?)
    startYVariance: 0.4, // How much vertical variation in start points (0=bottom edge, 1=full canvas)
    startXPadding: 50, // Allow lines to start slightly off-screen horizontally
    startYPadding: 50, // Allow lines to start slightly off-screen vertically
    redraw: function () {
      noiseSeed(millis()); // Optional: Re-seed noise for variation on redraw
      redrawSketch();
    }, // Function to be called by GUI button
  };

  // --- Global Variables ---
  let gui;
  let lines = []; // Optional: Store line data if needed later
  let canvas;


  // --- Setup ---
  function setup() {
    canvas = createCanvas(800, 600, SVG); // Use SVG renderer for export

    // use parent id
    // let parent = document.getElementById("p5js-canvas");
    // parent.style.width = "800px";
    // parent.style.height = "600px";

    // set parent id to canvas
    canvas.parent("p5js-canvas");

    pixelDensity(1); // Ensure consistent scaling, especially for SVG

    // Create GUI - using p5.GUI
    gui = new dat.GUI({ name: "Line Controls" });
    // Add sliders for each parameter
    gui.add(params, "numLines", 10, 500).step(1).onChange(redrawSketch);
    gui.add(params, "minLineLength", 10, 200).step(1).onChange(redrawSketch);
    gui.add(params, "maxLineLength", 50, 600).step(10).onChange(redrawSketch);
    gui.add(params, "flowStrength", 0, 150).step(1).onChange(redrawSketch);
    gui.add(params, "randomCurvature", 0, 50).step(1).onChange(redrawSketch);
    gui.add(params, "noiseScale", 0.001, 0.1).step(0.001).onChange(redrawSketch);
    gui.add(params, "driftFactor", 0, 0.5).step(0.01).onChange(redrawSketch);
    gui.add(params, "strokeThickness", 0.1, 5).step(0.1).onChange(redrawSketch);
    gui.add(params, "arrowSize", 1, 20).step(0.5).onChange(redrawSketch);
    gui.add(params, "allowLeftDrift", 0, 1).step(0.05).onChange(redrawSketch);
    gui.add(params, "startYVariance", 0, 1).step(0.05).onChange(redrawSketch);
    gui.add(params, "startXPadding", 0, 200).step(5).onChange(redrawSketch);
    gui.add(params, "startYPadding", 0, 200).step(5).onChange(redrawSketch);
    // Add randomize function to params
    params.randomize = function() {
      params.numLines = random(10, 500);
      params.minLineLength = random(10, 200);
      params.maxLineLength = random(50, 600);
      params.flowStrength = random(0, 150);
      params.randomCurvature = random(0, 50);
      params.noiseScale = random(0.001, 0.1);
      params.driftFactor = random(0, 0.5);
      params.strokeThickness = random(0.1, 1);
      params.arrowSize = random(1, 20);
      params.allowLeftDrift = random(0, 1);
      params.startYVariance = random(0, 1);
      params.startXPadding = random(0, 200);
      params.startYPadding = random(0, 200);
      redrawSketch();
    };
    gui.add(params, "redraw");
    gui.add(params, "randomize").name("Randomize Values");

    // Add Export button using p5 native method
    let exportButton = createButton("Export SVG");
    exportButton.mousePressed(exportSVG);
    exportButton.position(10, height + 15); // Position below canvas

    noLoop(); // We only need to draw when requested
    noiseSeed(millis()); // Initial noise seed
    redrawSketch(); // Initial drawing
  }

  // --- Drawing ---
  // This function is called initially and when the 'Redraw' button is pressed
  function redrawSketch() {
    background(255); // White background
    stroke(0); // Black lines
    strokeWeight(params.strokeThickness);
    noFill(); // No fill for shapes (lines and arrowheads)

    lines = []; // Clear previous line data if you were storing it

    for (let i = 0; i < params.numLines; i++) {
      // --- Generate Line Properties ---
      let sx = random(-params.startXPadding, width + params.startXPadding);
      let sy = random(
        height * (1 - params.startYVariance),
        height + params.startYPadding
      );
      let lineLength = random(params.minLineLength, params.maxLineLength);

      // Calculate drift: mostly right, sometimes left
      let drift = random(0.05, params.driftFactor) * lineLength;
      if (random() < params.allowLeftDrift) {
        drift *= -1; // Make it drift left
      }

      // Introduce some randomness in the 'upward' direction too
      let angleVariation = random(-PI / 32, PI / 32);
      let verticalLength = lineLength * cos(angleVariation);
      let horizontalOffsetFromAngle = lineLength * sin(angleVariation);

      // End point based on length, drift and slight angle variation
      let ex = sx + drift + horizontalOffsetFromAngle;
      let ey = sy - verticalLength; // Y decreases upwards

      // --- Calculate Control Point using Flow Field ---
      // Midpoint between start and end
      let mx = (sx + ex) / 2;
      let my = (sy + ey) / 2;

      // Get flow direction from Perlin noise, mapped to a range around 'up'
      let noiseValue = noise(mx * params.noiseScale, my * params.noiseScale);
      // Map noise (0-1) to an angle range around -PI/2 (up), e.g., +/- 60 degrees (PI/3)
      let flowDeviation = map(noiseValue, 0, 1, -PI/3, PI/3);
      let flowAngle = -HALF_PI + flowDeviation; // Center angle around 'up'

      // Calculate the main offset based on the flow field direction and strength
      let flowOffsetX = cos(flowAngle) * params.flowStrength;
      let flowOffsetY = sin(flowAngle) * params.flowStrength;

      // Calculate the secondary random offset, perpendicular to the flow (Keep for subtle variation)
      let randomAngle = flowAngle + HALF_PI; // Perpendicular direction
      let randomOffsetMag = random(-params.randomCurvature, params.randomCurvature);
      let randomOffsetX = cos(randomAngle) * randomOffsetMag;
      let randomOffsetY = sin(randomAngle) * randomOffsetMag;

      // Final control point is midpoint + flow offset + random offset
      let cx = mx + flowOffsetX + randomOffsetX;
      let cy = my + flowOffsetY + randomOffsetY;

      // --- Draw the Curve ---
      beginShape();
      vertex(sx, sy); // Start point
      quadraticVertex(cx, cy, ex, ey); // Control point, end point
      endShape();

      // --- Draw the Arrowhead ---
      drawArrowhead(cx, cy, ex, ey, params.arrowSize);
    }
    console.log("Sketch redrawn.");
  }

  // Function to draw an arrowhead at the end of the curve
  // Uses the control point and end point to determine the curve's end direction
  function drawArrowhead(controlX, controlY, endX, endY, size) {
    // Calculate the angle of the curve's end tangent
    // This is approximated by the line from the control point to the end point
    let angle = atan2(endY - controlY, endX - controlX);

    push(); // Isolate transformations and style
    translate(endX, endY); // Move origin to the endpoint
    rotate(angle); // Rotate coordinate system to align with the tangent

    // Draw the two lines of the arrowhead
    // These point "backwards" along the tangent direction
    let arrowWingAngle = PI / 6; // Angle between tangent and arrowhead wing (30 degrees)
    line(0, 0, -size * cos(arrowWingAngle), -size * sin(arrowWingAngle));
    line(0, 0, -size * cos(arrowWingAngle), size * sin(arrowWingAngle));

    // Alternative arrowhead using triangle (can be filled)
    // fill(0); // Make arrowhead solid black
    // noStroke(); // Don't draw outline for triangle
    // triangle(0, 0, -size, -size / 2.5, -size, size / 2.5);

    pop(); // Restore previous drawing state
  }

  // --- Export ---
  function exportSVG() {
    save("flowing_lines.svg"); // p5.svg library provides this function
    console.log("SVG exported.");
  }

  // --- GUI Interaction ---
  // p5.gui automatically handles updating the params object.
  // The redrawSketch function reads directly from the params object.

  // Optional: If you want sliders to update the drawing live without pressing redraw
  // function draw() {
  //   // This would be called continuously
  //   // Might be slow with many lines and SVG renderer
  //   // redrawSketch();
  // }
  // If using draw(), remove noLoop() from setup()
<\/script> <!-- 


Since "v0" isn't defined in our sketch (there's no variable or function named v0 in our code), I'm assuming you're referring to the initial version of the sketch before we added the flow field with Perlin noise.

The initial version simply drew curved lines with arrows using random horizontal offsets via the \`curvature\` parameter to create the curve control points. It had a more uniform, less organic appearance compared to our current flow field version.

# Flow Field Arrow Visualization - p5.js Creative Coding

tags: #p5js #generativeArt #flowField #perlinNoise

source: [Personal Project - SVG Flow Arrows](https://github.com/yourname/flowfield-arrows)

> [!summary] **TLDR:** Interactive Flow Field Visualization with Curved Arrows
> A p5.js sketch that generates flowing arrow patterns using Perlin noise to create organic vector fields. Lines follow smoothly varying directional flows with controllable parameters, exportable as SVG for high-quality vector graphics.
^tldr

# Flow Arrow Field - Organic Vector Visualization

\u{1F506} Significance: This technique bridges computational fluid dynamics visualization with generative art, providing an intuitive way to understand directional flows through visual representation. It demonstrates how mathematical concepts like noise functions can create natural-looking patterns.

## \u{1F4A1} Key Takeaways - Perlin Noise Flow Fields

### Organic Direction Control
- Perlin noise creates smooth, coherent transitions between random values, perfect for natural-looking directional fields.
- Mapping noise values to angular ranges (e.g., \`-PI/3\` to \`PI/3\` around vertical) creates directional bias while maintaining organic variation.

### Multi-layered Randomness
- Primary directional flow from noise field provides the main structure.
- Secondary perpendicular randomness adds subtle detail variation for richer visuals.
- The balance between coherence and chaos is controlled through adjustable parameters.

### SVG Export Capabilities
- Vector format allows infinite scaling without quality loss.
- Perfect for print media, laser cutting, or further design work.

---

# \u{1F441}\uFE0F Meta Insights - Mathematics in Visual Art
- \u{1F517} Connections: Flow fields connect fluid dynamics, vector calculus, and visual art in a single interactive experience.
- \u{1F680} Actionable Insights: Adjusting noise scale offers an intuitive understanding of how granularity affects perceived patterns.

## Next Steps - Expanding the Visualization
- Add color variation based on flow direction or magnitude
- Implement particle systems that follow the same flow field
- Create interactive flow field manipulation via mouse/touch input

## \u{1F30D} Practical Examples
1. **Data Visualization**: Flow fields can represent wind patterns, ocean currents, or migration patterns with directional arrows.
2. **Generative Art**: The technique can create wall-worthy prints with subtle, organic patterns that appear hand-drawn yet maintain mathematical precision.

## \u{1F50D} Related Concepts
- [Foundational] **Vector Fields**: Mathematical constructs assigning vectors to points in space, forming the basis for flow visualization.
- [Adjacent] **Curl Noise**: An extension of Perlin noise that generates divergence-free vector fields, useful for more physically accurate flows.
- [Meta] **Emergence**: How simple rules at local scale (flow directions) create complex patterns at global scale.

## \u{1F9E0} Key Questions/Challenges
1. How might varying the noise function (e.g., using Simplex instead of Perlin) affect the aesthetic quality of the visualization?
2. What would happen if we applied additional forces like attraction points or repulsion zones to the flow field?
3. How could this visualization technique be extended to 3D space while maintaining visual clarity?

## Fun Insights
- The concept of flow fields has been used in games like "flOw" by Jenova Chen, where players navigate an aquatic organism through environmental currents.
- Perlin noise, developed by Ken Perlin in 1983 for the movie "Tron," won an Academy Award for Technical Achievement in 1997.
- Flow visualizations like these have been used in traditional East Asian art forms for centuries, particularly in depicting wind, water, and energy flows.

## Discussed Topics & Highlights
- **Flow Field Implementation**: Creating direction fields using Perlin noise to generate organic-looking flows [setup]
- **Curve Generation**: Using quadratic Bezier curves with control points influenced by the flow field [redrawSketch]
- **Parameter Tuning**: Balancing noise scale, flow strength, and random variation for optimal aesthetic results [GUI]

## Conclusion
This flow arrow visualization demonstrates how computational techniques can create organic-looking patterns that feel natural yet maintain mathematical precision. The balance between order (the flow field) and chaos (random variations) creates visually compelling results that can be endlessly tweaked and explored.



-->`], ["", ` <script>
  // --- Parameters ---
  let params = {
    numLines: 180, // Number of lines to draw
    minLineLength: 30, // Minimum length of a line
    maxLineLength: 250, // Maximum length of a line
    flowStrength: 60,  // How strongly the flow field pushes the curve (Increased default)
    randomCurvature: 5, // Max random deviation perpendicular to flow (Reduced default)
    noiseScale: 0.01, // Scale of the Perlin noise field
    driftFactor: 0.05, // How much lines tend to drift horizontally (Reduced default)
    strokeThickness: 1.2, // Line thickness
    arrowSize: 5, // Size of the arrowhead lines
    allowLeftDrift: 0.1, // Probability (0-1) a line drifts left instead of right (Less relevant now?)
    startYVariance: 0.4, // How much vertical variation in start points (0=bottom edge, 1=full canvas)
    startXPadding: 50, // Allow lines to start slightly off-screen horizontally
    startYPadding: 50, // Allow lines to start slightly off-screen vertically
    redraw: function () {
      noiseSeed(millis()); // Optional: Re-seed noise for variation on redraw
      redrawSketch();
    }, // Function to be called by GUI button
  };

  // --- Global Variables ---
  let gui;
  let lines = []; // Optional: Store line data if needed later
  let canvas;


  // --- Setup ---
  function setup() {
    canvas = createCanvas(800, 600, SVG); // Use SVG renderer for export

    // use parent id
    // let parent = document.getElementById("p5js-canvas");
    // parent.style.width = "800px";
    // parent.style.height = "600px";

    // set parent id to canvas
    canvas.parent("p5js-canvas");

    pixelDensity(1); // Ensure consistent scaling, especially for SVG

    // Create GUI - using p5.GUI
    gui = new dat.GUI({ name: "Line Controls" });
    // Add sliders for each parameter
    gui.add(params, "numLines", 10, 500).step(1).onChange(redrawSketch);
    gui.add(params, "minLineLength", 10, 200).step(1).onChange(redrawSketch);
    gui.add(params, "maxLineLength", 50, 600).step(10).onChange(redrawSketch);
    gui.add(params, "flowStrength", 0, 150).step(1).onChange(redrawSketch);
    gui.add(params, "randomCurvature", 0, 50).step(1).onChange(redrawSketch);
    gui.add(params, "noiseScale", 0.001, 0.1).step(0.001).onChange(redrawSketch);
    gui.add(params, "driftFactor", 0, 0.5).step(0.01).onChange(redrawSketch);
    gui.add(params, "strokeThickness", 0.1, 5).step(0.1).onChange(redrawSketch);
    gui.add(params, "arrowSize", 1, 20).step(0.5).onChange(redrawSketch);
    gui.add(params, "allowLeftDrift", 0, 1).step(0.05).onChange(redrawSketch);
    gui.add(params, "startYVariance", 0, 1).step(0.05).onChange(redrawSketch);
    gui.add(params, "startXPadding", 0, 200).step(5).onChange(redrawSketch);
    gui.add(params, "startYPadding", 0, 200).step(5).onChange(redrawSketch);
    // Add randomize function to params
    params.randomize = function() {
      params.numLines = random(10, 500);
      params.minLineLength = random(10, 200);
      params.maxLineLength = random(50, 600);
      params.flowStrength = random(0, 150);
      params.randomCurvature = random(0, 50);
      params.noiseScale = random(0.001, 0.1);
      params.driftFactor = random(0, 0.5);
      params.strokeThickness = random(0.1, 1);
      params.arrowSize = random(1, 20);
      params.allowLeftDrift = random(0, 1);
      params.startYVariance = random(0, 1);
      params.startXPadding = random(0, 200);
      params.startYPadding = random(0, 200);
      redrawSketch();
    };
    gui.add(params, "redraw");
    gui.add(params, "randomize").name("Randomize Values");

    // Add Export button using p5 native method
    let exportButton = createButton("Export SVG");
    exportButton.mousePressed(exportSVG);
    exportButton.position(10, height + 15); // Position below canvas

    noLoop(); // We only need to draw when requested
    noiseSeed(millis()); // Initial noise seed
    redrawSketch(); // Initial drawing
  }

  // --- Drawing ---
  // This function is called initially and when the 'Redraw' button is pressed
  function redrawSketch() {
    background(255); // White background
    stroke(0); // Black lines
    strokeWeight(params.strokeThickness);
    noFill(); // No fill for shapes (lines and arrowheads)

    lines = []; // Clear previous line data if you were storing it

    for (let i = 0; i < params.numLines; i++) {
      // --- Generate Line Properties ---
      let sx = random(-params.startXPadding, width + params.startXPadding);
      let sy = random(
        height * (1 - params.startYVariance),
        height + params.startYPadding
      );
      let lineLength = random(params.minLineLength, params.maxLineLength);

      // Calculate drift: mostly right, sometimes left
      let drift = random(0.05, params.driftFactor) * lineLength;
      if (random() < params.allowLeftDrift) {
        drift *= -1; // Make it drift left
      }

      // Introduce some randomness in the 'upward' direction too
      let angleVariation = random(-PI / 32, PI / 32);
      let verticalLength = lineLength * cos(angleVariation);
      let horizontalOffsetFromAngle = lineLength * sin(angleVariation);

      // End point based on length, drift and slight angle variation
      let ex = sx + drift + horizontalOffsetFromAngle;
      let ey = sy - verticalLength; // Y decreases upwards

      // --- Calculate Control Point using Flow Field ---
      // Midpoint between start and end
      let mx = (sx + ex) / 2;
      let my = (sy + ey) / 2;

      // Get flow direction from Perlin noise, mapped to a range around 'up'
      let noiseValue = noise(mx * params.noiseScale, my * params.noiseScale);
      // Map noise (0-1) to an angle range around -PI/2 (up), e.g., +/- 60 degrees (PI/3)
      let flowDeviation = map(noiseValue, 0, 1, -PI/3, PI/3);
      let flowAngle = -HALF_PI + flowDeviation; // Center angle around 'up'

      // Calculate the main offset based on the flow field direction and strength
      let flowOffsetX = cos(flowAngle) * params.flowStrength;
      let flowOffsetY = sin(flowAngle) * params.flowStrength;

      // Calculate the secondary random offset, perpendicular to the flow (Keep for subtle variation)
      let randomAngle = flowAngle + HALF_PI; // Perpendicular direction
      let randomOffsetMag = random(-params.randomCurvature, params.randomCurvature);
      let randomOffsetX = cos(randomAngle) * randomOffsetMag;
      let randomOffsetY = sin(randomAngle) * randomOffsetMag;

      // Final control point is midpoint + flow offset + random offset
      let cx = mx + flowOffsetX + randomOffsetX;
      let cy = my + flowOffsetY + randomOffsetY;

      // --- Draw the Curve ---
      beginShape();
      vertex(sx, sy); // Start point
      quadraticVertex(cx, cy, ex, ey); // Control point, end point
      endShape();

      // --- Draw the Arrowhead ---
      drawArrowhead(cx, cy, ex, ey, params.arrowSize);
    }
    console.log("Sketch redrawn.");
  }

  // Function to draw an arrowhead at the end of the curve
  // Uses the control point and end point to determine the curve's end direction
  function drawArrowhead(controlX, controlY, endX, endY, size) {
    // Calculate the angle of the curve's end tangent
    // This is approximated by the line from the control point to the end point
    let angle = atan2(endY - controlY, endX - controlX);

    push(); // Isolate transformations and style
    translate(endX, endY); // Move origin to the endpoint
    rotate(angle); // Rotate coordinate system to align with the tangent

    // Draw the two lines of the arrowhead
    // These point "backwards" along the tangent direction
    let arrowWingAngle = PI / 6; // Angle between tangent and arrowhead wing (30 degrees)
    line(0, 0, -size * cos(arrowWingAngle), -size * sin(arrowWingAngle));
    line(0, 0, -size * cos(arrowWingAngle), size * sin(arrowWingAngle));

    // Alternative arrowhead using triangle (can be filled)
    // fill(0); // Make arrowhead solid black
    // noStroke(); // Don't draw outline for triangle
    // triangle(0, 0, -size, -size / 2.5, -size, size / 2.5);

    pop(); // Restore previous drawing state
  }

  // --- Export ---
  function exportSVG() {
    save("flowing_lines.svg"); // p5.svg library provides this function
    console.log("SVG exported.");
  }

  // --- GUI Interaction ---
  // p5.gui automatically handles updating the params object.
  // The redrawSketch function reads directly from the params object.

  // Optional: If you want sliders to update the drawing live without pressing redraw
  // function draw() {
  //   // This would be called continuously
  //   // Might be slow with many lines and SVG renderer
  //   // redrawSketch();
  // }
  // If using draw(), remove noLoop() from setup()
<\/script> <!-- 


Since "v0" isn't defined in our sketch (there's no variable or function named v0 in our code), I'm assuming you're referring to the initial version of the sketch before we added the flow field with Perlin noise.

The initial version simply drew curved lines with arrows using random horizontal offsets via the \\\`curvature\\\` parameter to create the curve control points. It had a more uniform, less organic appearance compared to our current flow field version.

# Flow Field Arrow Visualization - p5.js Creative Coding

tags: #p5js #generativeArt #flowField #perlinNoise

source: [Personal Project - SVG Flow Arrows](https://github.com/yourname/flowfield-arrows)

> [!summary] **TLDR:** Interactive Flow Field Visualization with Curved Arrows
> A p5.js sketch that generates flowing arrow patterns using Perlin noise to create organic vector fields. Lines follow smoothly varying directional flows with controllable parameters, exportable as SVG for high-quality vector graphics.
^tldr

# Flow Arrow Field - Organic Vector Visualization

\u{1F506} Significance: This technique bridges computational fluid dynamics visualization with generative art, providing an intuitive way to understand directional flows through visual representation. It demonstrates how mathematical concepts like noise functions can create natural-looking patterns.

## \u{1F4A1} Key Takeaways - Perlin Noise Flow Fields

### Organic Direction Control
- Perlin noise creates smooth, coherent transitions between random values, perfect for natural-looking directional fields.
- Mapping noise values to angular ranges (e.g., \\\`-PI/3\\\` to \\\`PI/3\\\` around vertical) creates directional bias while maintaining organic variation.

### Multi-layered Randomness
- Primary directional flow from noise field provides the main structure.
- Secondary perpendicular randomness adds subtle detail variation for richer visuals.
- The balance between coherence and chaos is controlled through adjustable parameters.

### SVG Export Capabilities
- Vector format allows infinite scaling without quality loss.
- Perfect for print media, laser cutting, or further design work.

---

# \u{1F441}\uFE0F Meta Insights - Mathematics in Visual Art
- \u{1F517} Connections: Flow fields connect fluid dynamics, vector calculus, and visual art in a single interactive experience.
- \u{1F680} Actionable Insights: Adjusting noise scale offers an intuitive understanding of how granularity affects perceived patterns.

## Next Steps - Expanding the Visualization
- Add color variation based on flow direction or magnitude
- Implement particle systems that follow the same flow field
- Create interactive flow field manipulation via mouse/touch input

## \u{1F30D} Practical Examples
1. **Data Visualization**: Flow fields can represent wind patterns, ocean currents, or migration patterns with directional arrows.
2. **Generative Art**: The technique can create wall-worthy prints with subtle, organic patterns that appear hand-drawn yet maintain mathematical precision.

## \u{1F50D} Related Concepts
- [Foundational] **Vector Fields**: Mathematical constructs assigning vectors to points in space, forming the basis for flow visualization.
- [Adjacent] **Curl Noise**: An extension of Perlin noise that generates divergence-free vector fields, useful for more physically accurate flows.
- [Meta] **Emergence**: How simple rules at local scale (flow directions) create complex patterns at global scale.

## \u{1F9E0} Key Questions/Challenges
1. How might varying the noise function (e.g., using Simplex instead of Perlin) affect the aesthetic quality of the visualization?
2. What would happen if we applied additional forces like attraction points or repulsion zones to the flow field?
3. How could this visualization technique be extended to 3D space while maintaining visual clarity?

## Fun Insights
- The concept of flow fields has been used in games like "flOw" by Jenova Chen, where players navigate an aquatic organism through environmental currents.
- Perlin noise, developed by Ken Perlin in 1983 for the movie "Tron," won an Academy Award for Technical Achievement in 1997.
- Flow visualizations like these have been used in traditional East Asian art forms for centuries, particularly in depicting wind, water, and energy flows.

## Discussed Topics & Highlights
- **Flow Field Implementation**: Creating direction fields using Perlin noise to generate organic-looking flows [setup]
- **Curve Generation**: Using quadratic Bezier curves with control points influenced by the flow field [redrawSketch]
- **Parameter Tuning**: Balancing noise scale, flow strength, and random variation for optimal aesthetic results [GUI]

## Conclusion
This flow arrow visualization demonstrates how computational techniques can create organic-looking patterns that feel natural yet maintain mathematical precision. The balance between order (the flow field) and chaos (random variations) creates visually compelling results that can be endlessly tweaked and explored.



-->`])), renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result2) => renderTemplate(_a || (_a = __template([" ", '<main class="container mx-auto"> <h1>Flow Arrow</h1> <!-- p5.js core library --> <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.js"><\/script> <!-- p5.js DOM library (for createButton, etc.) --> <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/addons/p5.dom.min.js"><\/script> <!-- dat.GUI library --> <script src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.9/dat.gui.min.js"><\/script> <!-- p5.svg library --> <script src="https://cdn.jsdelivr.net/npm/p5.js-svg@1.5.1/dist/p5.svg.min.js"><\/script> <!-- Your sketch file --> <div id="p5js-canvas"></div> </main> '])), maybeRenderHead()) }));
}, "/home/matsu/Desktop/jy/src/pages/sketches/250401-flowarrow.astro", void 0);

const $$file = "/home/matsu/Desktop/jy/src/pages/sketches/250401-flowarrow.astro";
const $$url = "/sketches/250401-flowarrow";

const __vite_glob_0_24 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$250401Flowarrow,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { __vite_glob_0_24 as _ };
