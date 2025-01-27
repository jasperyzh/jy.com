/**
 * Example: Mesh Gradient in canvas-sketch
 * ---------------------------------------
 * This script subdivides between control points to create a smooth color mesh.
 */

const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");

// ----- Settings -----
const settings = {
  dimensions: [800, 800],
  // Optionally animate
  animate: true,
  duration: 4, // 4-second loop
  fps: 60,
  loop: true, // Optionally loop the animation
};

// Example: 2x2 control-point grid
// Each row is an array of { x, y, color: [r,g,b] }
/* const baseControlPoints = [
    [
        { x: 0.0, y: 0.0, color: [255, 0, 0] },
        { x: 1.0, y: 0.0, color: [0, 255, 0] }
    ],
    [
        { x: 0.0, y: 1.0, color: [0, 0, 255] },
        { x: 1.0, y: 1.0, color: [255, 255, 0] }
    ]
    ]; */

const baseControlPoints = [
  [
    { x: 0, y: 0, color: [255, 0, 0] },
    { x: 0.5, y: 0, color: [0, 255, 0] },
    { x: 1, y: 0, color: [0, 0, 255] },
  ],
  [
    { x: 0, y: 0.5, color: [255, 255, 0] },
    { x: 0.5, y: 0.5, color: [100, 0, 255] },
    { x: 1, y: 0.5, color: [0, 255, 255] },
  ],
  [
    { x: 0, y: 1, color: [255, 128, 0] },
    { x: 0.5, y: 1, color: [68, 0, 68] },
    { x: 1, y: 1, color: [0, 128, 128] },
  ],
];

// Subdivision steps along X and Y for interpolation
const stepsX = 5;
const stepsY = 5;

const sketch = () => {
  return ({ context, width, height, playhead, time }) => {
    // Create a *fresh* copy of your control points each frame
    // and apply some animated offset in y using Math.sin()
    const animatedPoints = animatePoints(baseControlPoints, playhead);

    // Interpolate the updated grid
    const mesh = interpolateGrid(animatedPoints, stepsX, stepsY);

    // Clear the canvas
    context.clearRect(0, 0, width, height);

    // Determine cell size for drawing
    const cellW = width / (mesh[0].length - 1);
    const cellH = height / (mesh.length - 1);

    // Render each cell
    for (let row = 0; row < mesh.length - 1; row++) {
      for (let col = 0; col < mesh[row].length - 1; col++) {
        const { color: c } = mesh[row][col];
        context.fillStyle = `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
        context.fillRect(
          col * cellW,
          row * cellH,
          cellW + 1,
          cellH + 1,
        );
      }
    }
  };
};

/**
 * Animate control points with a sine wave in the y direction.
 * You could also modulate colors here for more effects.
 */
function animatePoints(basePoints, playhead) {
  const amplitude = 0.03;
  const frequency = 2;
  const animated = JSON.parse(JSON.stringify(basePoints));

  animated.forEach((row, r) => {
    row.forEach((pt, c) => {
      const bx = basePoints[r][c].x;
      const by = basePoints[r][c].y;
      const baseColor = basePoints[r][c].color;

      // Map playhead (0..1) to 0..2π for smooth loops
      // Offsetting with r + c can add variety if you want
      const phase = 2 * Math.PI * playhead + (r + c);

      // Vertical sine wave offset
      const offsetY = amplitude * Math.sin(phase);
      pt.x = bx;
      pt.y = by + offsetY;

      // If you want to animate color, e.g. shift red channel
      const colorShift = 50 * Math.sin(phase);
      const shiftedR = baseColor[0] + colorShift;
      pt.color = [
        shiftedR,
        baseColor[1],
        baseColor[2],
      ];
    });
  });

  return animated;
}

/**
 * Interpolates a grid of control points into smaller subdivided cells.
 * Each point is { x, y, color }, with x,y in [0..1].
 */
function interpolateGrid(controlPoints, stepsX, stepsY) {
  const rowCount = controlPoints.length;
  const colCount = controlPoints[0].length;

  const subdivided = [];

  for (let row = 0; row < (rowCount - 1) * stepsY + 1; row++) {
    const tRow = row / (stepsY * (rowCount - 1));
    const rowIndex = Math.floor(tRow * (rowCount - 1));
    const rowFrac = (tRow * (rowCount - 1)) - rowIndex;
    subdivided[row] = [];

    for (let col = 0; col < (colCount - 1) * stepsX + 1; col++) {
      const tCol = col / (stepsX * (colCount - 1));
      const colIndex = Math.floor(tCol * (colCount - 1));
      const colFrac = (tCol * (colCount - 1)) - colIndex;

      // Guard for final boundary (avoid out-of-bounds)
      if (rowIndex >= rowCount - 1 || colIndex >= colCount - 1) {
        continue; // skip
      }

      const topLeft = controlPoints[rowIndex][colIndex];
      const topRight = controlPoints[rowIndex][colIndex + 1];
      const botLeft = controlPoints[rowIndex + 1][colIndex];
      const botRight = controlPoints[rowIndex + 1][colIndex + 1];
      if (!topLeft || !topRight || !botLeft || !botRight) {
        continue;
      }

      // Interpolate top edge
      const topX = lerp(topLeft.x, topRight.x, colFrac);
      const topY = lerp(topLeft.y, topRight.y, colFrac);
      const topColor = lerpColor(topLeft.color, topRight.color, colFrac);

      // Interpolate bottom edge
      const botX = lerp(botLeft.x, botRight.x, colFrac);
      const botY = lerp(botLeft.y, botRight.y, colFrac);
      const botColor = lerpColor(botLeft.color, botRight.color, colFrac);

      // Interpolate between top and bottom edge
      const finalX = lerp(topX, botX, rowFrac);
      const finalY = lerp(topY, botY, rowFrac);
      const finalColor = lerpColor(topColor, botColor, rowFrac);

      subdivided[row][col] = {
        x: finalX,
        y: finalY,
        color: finalColor,
      };
    }
  }
  return subdivided;
}

function lerpColor(c1, c2, t) {
  return [
    lerp(c1[0], c2[0], t),
    lerp(c1[1], c2[1], t),
    lerp(c1[2], c2[2], t),
  ];
}

canvasSketch(sketch, settings);



/* 
> [!summary] **TLDR: ** Smoothly Looping Mesh Gradient in canvas-sketch  
> We create a looping mesh gradient effect by defining control points in a grid, interpolating subdivisions for a smoother result, and animating both positions and colors using the `playhead` parameter in canvas-sketch. This ensures the animation loops seamlessly, with the final frame matching the initial state.  
^tldr

# Smoothly Looping Mesh Gradient in canvas-sketch

tags: #canvasSketch #creativeCoding #animation #meshGradient

🔆 **Significance**:  
This technique merges concepts of interpolation, sine-wave animation, and seamless looping. It’s particularly useful in generative art, motion graphics, and immersive UI design, giving artists and developers the power to craft organic, continuously flowing color fields that don’t “jump” at the loop boundary.

---

## 💡 Key Takeaways - Sketch Concepts

### 1. Mesh Grid & Interpolation
- Define a 2D grid of control points, each with `(x, y, color)`.  
- Use linear interpolation (`lerp`) between adjacent points to produce a finely subdivided mesh.  
- Higher subdivisions yield smoother gradients.

### 2. Animation via `playhead`
- `playhead` in canvas-sketch goes from 0 to 1 over the animation duration, resetting at loop end.  
- Mapping `playhead` → sine wave (e.g., `sin(2π * playhead)`) ensures a perfect loop.

### 3. Color Modulation
- By applying a sine-based offset to a color channel, you create pulsating color shifts that synchronize with the mesh’s movement.  
- Because `playhead` cycles predictably, your final frame will match the first frame.

### 4. Seamless Loop
- In looping animations, use `playhead` instead of raw `time`, ensuring no visual jump between last and first frames.  
- For added variety, offset each point’s phase by row/column index.

---

# 👁️ Meta Insights - Implementation

- 🔗 **Connections**: Combines creative coding, geometry, color theory, and animation principles.  
- 🚀 **Actionable Insights**:  
  - Tweak amplitude/frequency for more dramatic wave-like distortion.  
  - Animate color channels (RGB) differently for multi-hued transitions.

---

## Next Steps
1. **Increase Complexity**: Expand the control grid or blend multiple sine waves for more complex motion.  
2. **Integrate Perlin Noise**: Swap the sine function for noise-based motion or color transitions to get more organic patterns.  
3. **Export GIF/Video**: Use canvas-sketch to export loops for presentations or social media.

---

## 🌍 Practical Examples
1. **Generative Branding Background**  
   - A smooth looping gradient used as an animated brand identity background on a website.  
2. **Art Installations**  
   - Large-scale projection loops that subtly shift colors, providing a mesmerizing ambient display.

---

## 🔍 Related Concepts
- [Foundational] **Sine Wave Basics**: Understanding `sin(2π * t)` for cyclical motion.  
- [Adjacent] **Color Spaces**: Interpolating in HSL or LAB might yield more “natural” blending than RGB.  
- [Integrative] **Noise Functions**: Instead of a single sine wave, noise-based transformations add fluid, unpredictable motion.

---

## 🧠 Key Questions/Challenges
1. **How can we layer multiple oscillations to create complex, multi-frequency waves?**  
2. **What if we want the gradient to seamlessly transition from one color palette to another?**  
3. **Could we adapt the mesh approach to 3D or WebGL for real-time interactive art?**

---

## Fun Insights
- **Book**: *Generative Design* or *Generative Art* offers more sophisticated color-mesh techniques.  
- **Joke**: “Sine waves are so smooth, they always come back around in the end.”  
- **Zen Mundo**: “A perfect loop is like a circle—no beginning, no end, just continuous flow.”

---

## Discussed Topics & Highlights
- **Mesh Interpolation**: [Timestamp]  
  - Subdividing control points to create smooth color transitions.  
- **Looping Animation**: [Timestamp]  
  - Using `playhead` for time-based sine wave, ensuring the start and end frames align.  
- **Color Shifts**: [Timestamp]  
  - Adding a sine-based offset to the red channel for a pulsing effect.  

---

*/