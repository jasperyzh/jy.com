let all_shapes = [];
let shapePositions = [];

let shapes = ["rect", "ellipse", "triangle", "polygon", "arc"];
let waveTypes = ["triangle", "sin", "square", "saw", "exp", "rmp", "random"];
let colors = ["goldenrod"];

// const canvas_width = Math.floor(2100 / 6);
// const canvas_height = Math.floor(2970 / 6);

const canvas_width = 800;
const canvas_height = 800;

const mosaic_size = canvas_width/50;//100;
const mosaic_spacing = mosaic_size * 2 ;
const mosaic_size_offset = 0;
const cols = Math.floor(canvas_width / mosaic_spacing);
const rows = Math.floor(canvas_height / mosaic_spacing);

const ff_spacing = mosaic_size * 2;
const ffRows = Math.floor(canvas_width / ff_spacing);
const ffCols = Math.floor(canvas_height / ff_spacing);

let settings = {
  noiseVal: 2,
  shape_size: mosaic_size + mosaic_size_offset,
  angle_offset: 0,
  spacing: 6,
  minAmplitude: 0.01,
  maxAmplitude: 5,
  minFrequency: 0.01,
  maxFrequency: 0.1,
  shape: "rect",
  waveType: "exp",
  select_color: "goldenrod",
  updateAll: function () {
    redraw();
  },
  regeneratePositions: function () {
    draw_shapes(shapePositions);
    redraw();
  },
  updateFlowField: function () {
  setupFlowField(ffRows, ffCols, settings.noiseVal);
    redraw();
  },
};

//mosaic
let img;
preload = () => {
  img = loadImage("starrynight.jpg");
};

function setup() {
  createCanvas(canvas_width, canvas_height, SVG);

  noFill();

  let gui = new dat.GUI();
  gui.add(settings, "noiseVal", 0.1, 10).onChange(settings.updateFlowField);
  gui.add(settings, "shape_size", 1, 200).onChange(settings.updateAll);
  gui.add(settings, "angle_offset", 0, 360).onChange(settings.updateAll);
  gui.add(settings, "spacing", 0.2, 50).onChange(settings.updateAll);
  gui.add(settings, "minAmplitude", 0, 50).onChange(settings.updateAll);
  gui.add(settings, "maxAmplitude", 0, 50).onChange(settings.updateAll);
  gui.add(settings, "minFrequency", 0.001, 0.5).onChange(settings.updateAll);
  gui.add(settings, "maxFrequency", 0.001, 0.5).onChange(settings.updateAll);
  gui.add(settings, "shape", shapes).onChange(settings.updateAll);
  gui.add(settings, "waveType", waveTypes).onChange(settings.updateAll);
  gui.add(settings, "select_color", "goldenrod").onChange(settings.updateAll);
  gui.add(settings, "regeneratePositions");

  setupFlowField(ffRows, ffCols, settings.noiseVal);

  noLoop();
}

function draw() {
  clear();
  background(255);

  // image(img, 20, 40);
  // image(img, 0, 0);
  // img.resize(640, 480);
  drawMosaic(mosaic_size, 0);

  // drawFlowField(ffRows, ffCols); // Add this line to visualize the flow field

  // push();
  // fill(255);
  // text(`hatchfilled_mosaics`, 50, 50);
  // pop();

  //   draw_shapes(shapePositions);
}

function drawMosaic(dotRadius = 5, jitterAmount = 3) {
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      const centerX = col * mosaic_spacing;
      const centerY = row * mosaic_spacing;

      // Add a small jitter if desired
      const shapeX = centerX + random(-jitterAmount, jitterAmount);
      const shapeY = centerY + random(-jitterAmount, jitterAmount);

      // Generate noise-based brightness
      let noiseVal = noise(centerX * 0.01, centerY * 0.01);
      let brightness = map(noiseVal, 0, 1, 0, 255);

      drawSingleShape(shapeX, shapeY, brightness);
    }
  }
}
function calculateAmplitudeAndFrequency(brightness) {
  // Map brightness (1-10) to an index in brightnessSettings
  let index = floor(map(brightness, 1, 10, 0, brightnessSettings.length - 1));
  let setting = brightnessSettings[index];

  // Calculate percentage based on brightness
  let percentage = map(brightness, 1, 10, 0, 1);

  // Lerp amplitude and frequency
  let amplitude = lerp(
    settings.minAmplitude,
    settings.maxAmplitude,
    percentage
  );
  let frequency = lerp(
    settings.minFrequency,
    settings.maxFrequency,
    percentage
  );

  // Adjust amplitude and frequency based on brightnessSettings
  amplitude = lerp(amplitude, setting.amplitude, 0.5); // 0.5 is a blend factor, adjust as needed
  frequency = lerp(frequency, setting.frequency, 0.5); // 0.5 is a blend factor, adjust as needed

  return {
    amplitude: Number(amplitude.toFixed(2)),
    frequency: Number(frequency.toFixed(3)),
    spacing: setting.spacing,
  };
}

const brightnessSettings = [
  {
    /* brightness */
  }, // got_color: color(255, 0, 0)  },
  {
    /* brightness */
  },
  {
    /* brightness */
  },
  {
    /* brightness */
  },
  {
    /* brightness */
  },
  {
    /* brightness */
  },
  {
    /* brightness */
  },
  {
    /* brightness */
  },
  // { spacing: 6, amplitude: 4, frequency: 0.25 },
  // { spacing: 7, amplitude: 4, frequency: 0.3 },
  // { spacing: 8, amplitude: 4, frequency: 0.35 },
];
function drawSingleShape(x, y, pixelColor) {
  // Calculate the flow field index based on shape position
  let col = floor(x / ff_spacing);
  let row = floor(y / ff_spacing);
  
  print(col, row)

  // Ensure we're within the flowfield bounds
  col = constrain(col, 0, ffCols - 1);
  row = constrain(row, 0, ffRows - 1);

  let flowAngle = flowField[row][col].heading();
  let flowAngleDegrees = degrees(flowAngle);

  let brightness = getBrightness(pixelColor);

  // Convert to grayscale; pixelColor will retain the original colours (RGB)
  let grayscale = color(brightness * 50); //255

  let mono = color(13);

  // Define arrays for different brightness levels

  // Map brightness to an index in the brightnessSettings array
  let index = floor(map(brightness, 1, 10, 0, brightnessSettings.length));
  let setting = brightnessSettings[index];

  // white out (brightest)
  if (index <= 0.2) return; // FIRST IN ARRAY IS THE BRIGHTEST

  // Calculate percentage based on brightness
  let percentage = map(brightness, 1, 10, 0, 1);

  let getAmp = lerp(settings.minAmplitude, settings.maxAmplitude, percentage);

  // let col = floor(x / spacing);
  // let row = floor(y / spacing);

  // Get angle from flow field, making sure it's within bounds
  //   let flowAngle = flowField[constrain(row, 0, rows - 1)][
  //     constrain(col, 0, cols - 1)
  //   ].heading();

  //   let flowAngleDegrees = radiansToDegrees(flowAngle);

  let hatchFill = new HatchFill(
    "wave",
    //random(120 * 1.618),//
    flowAngleDegrees + settings.angle_offset,
    settings.spacing,
    // lerp(4, 35, percentage),

    1,
    mono, // grayscale, //pixelColor,
    settings.waveType,

    // replace with these, percentage according to brightness
    getAmp,
    Number(
      lerp(settings.minFrequency, settings.maxFrequency, percentage).toFixed(2)
    )
  );

  drawShapeWithHatchFill(
    hatchFill,
    settings.shape,
    x,
    y,
    settings.shape_size,
    settings.shape_size
  );
}

function radiansToDegrees(radians) {
  let degrees = ((radians * 180) / Math.PI) % 360;
  return degrees < 0 ? degrees + 360 : degrees;
}

function getBrightness(_color) {
  // Extract RGB components
  let r = red(color(_color));
  let g = green(color(_color));
  let b = blue(color(_color));

  // Calculate perceived brightness
  let brightness = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

  // Normalize to a scale of 1-10
  return map(brightness, 0, 1, 10, 1); // HACKED FOR INVERTING BRIGHTNESS
}

function draw_shapes(_shapePositions) {
  for (let pos of _shapePositions) {
    let hatchFill = new HatchFill(
      "wave",
      // settings.angle,

      random(1.618 * 360),
      settings.spacing,
      1,
      settings.color,
      settings.waveType,
      Number(
        lerp(settings.minAmplitude, settings.maxAmplitude, random()).toFixed(1)
      ),
      Number(
        lerp(settings.minFrequency, settings.maxFrequency, random()).toFixed(2)
      )
    );

    drawShapeWithHatchFill(
      hatchFill,
      settings.shape,
      pos.x,
      pos.y,
      settings.shape_size,
      settings.shape_size
    );
  }

  return;
}

function keyPressed() {
  if (key === "s" || key === "S") {
    save("hatchfill_mosaic.svg");
  }
}

function drawShapeWithHatchFill(hatchFill, shape, x, y, w, h, padding = 0) {
  push();
  translate(x, y);
  switch (shape) {
    case "rect":
      hatchFill.applyToRect(padding, padding, w - padding * 2, h - padding * 2);
      break;
    case "ellipse":
      hatchFill.applyToEllipse(0, 0, w - padding * 2, h - padding * 2);
      break;
    case "triangle":
      hatchFill.applyToTriangle(
        w / 2,
        padding,
        padding,
        h - padding,
        w - padding,
        h - padding
      );
      break;
    case "polygon":
      let vertices = [
        { x: w / 2, y: padding },
        { x: w - padding, y: h / 3 },
        { x: (3 * w) / 4, y: h - padding },
        { x: w / 4, y: h - padding },
        { x: padding, y: h / 3 },
      ];
      hatchFill.applyToPolygon(vertices);
      break;
    case "arc":
      hatchFill.applyToArc(
        padding,
        padding,
        w - padding * 2,
        h - padding * 2,
        0,
        (PI * 3) / 2
      );
      break;
  }
  pop();
}


class HatchFill {
  constructor(
    patternType = "wave",
    angle = 45,
    spacing = 5,
    strokeWeight = 1,
    color = "black",
    waveType = "sin",
    amplitude = 10,
    frequency = 0.05
  ) {
    this.ENABLE_OUTLINE = false;
    this.patternType = patternType;
    this.angle = angle;
    this.spacing = spacing;
    this.strokeWeight = strokeWeight;
    this.color = color;
    this.waveType = waveType;
    this.amplitude = amplitude;
    this.frequency = frequency;
  }

  applyToRect(x, y, w, h) {
    let isInside = (px, py) => px >= 0 && px <= w && py >= 0 && py <= h;
    this._drawHatchPattern(isInside, x, y, w, h);
    this._drawOutline(() => rect(x, y, w, h));
  }

  applyToEllipse(x, y, w, h) {
    let rx = w / 2,
      ry = h / 2;
    let isInside = (px, py) => sq(px - rx) / sq(rx) + sq(py - ry) / sq(ry) <= 1;
    this._drawHatchPattern(isInside, x, y, w, h);
    this._drawOutline(() => ellipse(x + rx, y + ry, w, h));
  }

  applyToTriangle(x1, y1, x2, y2, x3, y3) {
    let isInside = (px, py) => {
      let a =
        ((y2 - y3) * (px - x3) + (x3 - x2) * (py - y3)) /
        ((y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3));
      let b =
        ((y3 - y1) * (px - x3) + (x1 - x3) * (py - y3)) /
        ((y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3));
      let c = 1 - a - b;
      return 0 <= a && a <= 1 && 0 <= b && b <= 1 && 0 <= c && c <= 1;
    };
    let minX = min(x1, x2, x3),
      minY = min(y1, y2, y3);
    let maxX = max(x1, x2, x3),
      maxY = max(y1, y2, y3);
    this._drawHatchPattern(isInside, 0, 0, maxX, maxY);
    this._drawOutline(() => triangle(x1, y1, x2, y2, x3, y3));
  }

  applyToPolygon(vertices) {
    let isInside = (px, py) => {
      let inside = false;
      for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
        let xi = vertices[i].x,
          yi = vertices[i].y;
        let xj = vertices[j].x,
          yj = vertices[j].y;
        let intersect =
          yi > py != yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;
        if (intersect) inside = !inside;
      }
      return inside;
    };
    let minX = min(vertices.map((v) => v.x)),
      minY = min(vertices.map((v) => v.y));
    let maxX = max(vertices.map((v) => v.x)),
      maxY = max(vertices.map((v) => v.y));
    this._drawHatchPattern(isInside, 0, 0, maxX, maxY);
    this._drawOutline(() => {
      beginShape();
      for (let v of vertices) vertex(v.x, v.y);
      endShape(CLOSE);
    });
  }

  applyToArc(x, y, w, h, start, stop) {
    let rx = w / 2,
      ry = h / 2;
    let cx = x + rx,
      cy = y + ry;
    let isInside = (px, py) => {
      let dx = px - cx;
      let dy = py - cy;
      let angle = atan2(dy, dx);
      if (angle < 0) angle += TWO_PI;
      let normalizedAngle = (angle - start + TWO_PI) % TWO_PI;
      return (
        sq(dx / rx) + sq(dy / ry) <= 1 &&
        normalizedAngle <= (stop - start + TWO_PI) % TWO_PI
      );
    };
    this._drawHatchPattern(isInside, 0, 0, w, h);
    this._drawOutline(() => arc(cx, cy, w, h, start, stop));
  }

  _drawHatchPattern(isInside, x, y, w, h) {
    push();
    translate(x, y);
    stroke(this.color);
    strokeWeight(this.strokeWeight);
    let diagonal = sqrt(w * w + h * h);
    let angleRad = radians(this.angle);
    let cosAngle = cos(angleRad);
    let sinAngle = sin(angleRad);
    let scale = min(w, h) / 50;
    let adjustedSpacing = this.spacing * scale;

    this._drawWavePattern(
      isInside,
      w,
      h,
      diagonal,
      cosAngle,
      sinAngle,
      adjustedSpacing
    );
    pop();
  }

  _drawWavePattern(
    isInside,
    w,
    h,
    diagonal,
    cosAngle,
    sinAngle,
    adjustedSpacing
  ) {
    let centerX = 0;
    let centerY = 0;
    for (let i = -diagonal; i <= diagonal; i += adjustedSpacing) {
      let points = [];
      for (let x = -diagonal; x <= diagonal; x += 1) {
        let baseX = i * cosAngle - x * sinAngle;
        let baseY = i * sinAngle + x * cosAngle;
        let waveY = this._getWaveY(x) * this.amplitude;
        let finalX = centerX + baseX;
        let finalY = centerY + baseY + waveY;
        if (isInside(finalX, finalY)) {
          points.push({ x: finalX, y: finalY });
        }
      }
      if (points.length > 1) {
        beginShape();
        for (let point of points) {
          vertex(point.x, point.y);
        }
        endShape();
      }
    }
  }

  _getWaveY(x) {
    let scaledX = x * this.frequency;
    switch (this.waveType) {
      case "triangle":
        return 2 * Math.abs((scaledX % 1) - 0.5) - 0.5;
      case "sin":
        return Math.sin(scaledX);
      case "square":
        return Math.sign(Math.sin(scaledX));
      case "saw":
        return (scaledX % 1) - 0.5;
      case "exp":
        return Math.exp(-(scaledX % 1)) - 1;
      case "rmp":
        return scaledX % 1;
      case "random":
        return noise(scaledX) * 2 - 1;
      default:
        return 0;
    }
  }

  _drawOutline(shapeFunction) {
    if (!this.ENABLE_OUTLINE) return;
    push();
    noFill();
    stroke(0);
    shapeFunction();
    pop();
  }
}

// flowfield
let flowField = [];

function setupFlowField(_rows, _cols, _noiseVal = 2) {
  flowField = [];
  for (let y = 0; y < _rows; y++) {
    flowField[y] = [];
    for (let x = 0; x < _cols; x++) {
      let angle = noise(x * 0.1, y * 0.1) * TWO_PI * _noiseVal;
      flowField[y][x] = p5.Vector.fromAngle(angle);
    }
  }
}

function drawFlowField(_rows, _cols) {
  for (let y = 0; y < _rows; y++) {
    for (let x = 0; x < _cols; x++) {
      let v = flowField[y][x];
      let startX = x * ff_spacing;
      let startY = y * ff_spacing;

      push();
      translate(startX, startY);
      rotate(v.heading());
      stroke(255, 0, 0, 180);
      strokeWeight(2);
      line(0, 0, 0, ff_spacing * 0.5);
      triangle(0, 0, 2, 4, -2, 4);
      pop();
    }
  }
}

