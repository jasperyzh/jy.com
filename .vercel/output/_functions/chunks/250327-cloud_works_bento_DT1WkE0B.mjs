import { a as createComponent, b as renderTemplate, g as renderHead } from './astro/server_BuftSjIy.mjs';
import 'kleur/colors';
import 'clsx';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$250327CloudWorksBento = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template([`<html> <head><meta charset="utf-8"><title>Cloud Type Sketches</title><script src="https://cdn.jsdelivr.net/npm/p5@1.9.0/lib/p5.js"><\/script><style>
    body {
      margin: 0;
      padding: 0;
      overflow: auto; /* allows scrolling when content overflows */
    }

    .grid-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr); /* Adjust for responsiveness */
      grid-gap: 10px;
      padding: 10px;
      box-sizing: border-box; /* Include padding in element's total width and height */
    }

    .sketch-container {
      position: relative;
      width: 100%;
      padding-bottom: 100%; /* Maintain 1:1 aspect ratio */
      overflow: hidden;
    }

    .sketch-container canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100% !important;
      height: 100% !important;
    }

    .button-container {
      text-align: center;
      margin-top: 10px;
      position: absolute;
      z-index: 1000;
    }
  </style>`, '</head> <body> <div class="grid-container" id="gridContainer"></div> <pre id="console">created with gemini flash 2.0</pre> <div class="button-container"> <button id="resetButton">Reset All</button> </div> <script>\n    const cloudTypes = [\n    { name: "Cirrus", drawFunction: drawCirrus },\n    { name: "Cirrostratus", drawFunction: drawCirrostratus },\n    { name: "Cirrocumulus", drawFunction: drawCirrocumulus },\n    { name: "Altostratus", drawFunction: drawAltostratus },\n    { name: "Altocumulus", drawFunction: drawAltocumulus },\n    { name: "Cumulonimbus", drawFunction: drawCumulonimbus },\n    { name: "Cumulus", drawFunction: drawCumulus },\n    { name: "Stratus", drawFunction: drawStratus },\n    { name: "Nimbostratus", drawFunction: drawNimbostratus }\n  ];\n\n  let sketchInstances = {};\n  let visibleSketches = {};\n\n  function createCloudSketch(cloudData) {\n    return function(p) {\n      let isVisible = true;\n      let randomSeed; // Local random seed for each sketch\n\n      p.setup = function() {\n        p.createCanvas(200, 200);\n        p.noLoop();\n        visibleSketches[cloudData.name] = true;\n        randomSeed = p.random(10000); // Initialize seed on setup\n        drawSketch();\n      };\n\n      function drawSketch() {\n        p.randomSeed(randomSeed); // Use the sketch\'s local seed\n        p.background(220);\n        if (visibleSketches[cloudData.name]) {\n          cloudData.drawFunction(p);\n        } else {\n          p.fill(0);\n          p.textAlign(p.CENTER, p.CENTER);\n          p.text("Sketch Hidden", p.width / 2, p.height / 2);\n        }\n      }\n\n      p.myCustomRedraw = function() {\n        randomSeed = p.random(10000); // Generate new seed on redraw\n        drawSketch();\n      };\n\n      p.toggleVisibility = function() {\n        isVisible = !isVisible;\n        visibleSketches[cloudData.name] = isVisible;\n        drawSketch();\n      };\n    };\n  }\n\n  function addSketchToGrid(cloudData) {\n    const gridContainer = document.getElementById("gridContainer");\n    const sketchContainer = document.createElement("div");\n    sketchContainer.classList.add("sketch-container");\n\n    const canvasId = `canvas-${cloudData.name.replace(/\\s+/g, \'\')}`;\n    sketchContainer.innerHTML = `<div id="${canvasId}"></div>`;\n\n    gridContainer.appendChild(sketchContainer);\n\n    const cloudSketch = createCloudSketch(cloudData);\n    sketchInstances[cloudData.name] = new p5(cloudSketch, canvasId);\n\n    const toggleButton = document.createElement("button");\n    toggleButton.textContent = `Toggle ${cloudData.name}`;\n    toggleButton.addEventListener("click", () => {\n      sketchInstances[cloudData.name].toggleVisibility();\n    });\n\n    const buttonContainer = document.createElement("div");\n    buttonContainer.classList.add("button-container");\n    buttonContainer.appendChild(toggleButton);\n    sketchContainer.appendChild(buttonContainer);\n  }\n\n  cloudTypes.forEach(addSketchToGrid);\n\n  document.getElementById("resetButton").addEventListener("click", () => {\n    for (const cloudName in sketchInstances) {\n      visibleSketches[cloudName] = true;\n      sketchInstances[cloudName].myCustomRedraw();\n    }\n  });\n\n  // Cloud Drawing Functions (Implement your artistic interpretations here)\n\n  function drawCirrus(p) {\n    p.background(230, 240, 255);  // Light blue background\n    p.stroke(150, 150, 255, 150); // Light blue, semi-transparent\n    p.strokeWeight(1 + p.random(1));\n    p.noFill();\n    for (let i = 0; i < 5; i++) {\n      p.beginShape();\n      for (let x = 0; x <= p.width; x += 5 + p.random(5)) {\n        let y = p.height / 2 + p.sin(x / (20 + p.random(10)) + i) * (20 + p.random(15));\n        p.vertex(x, y);\n      }\n      p.endShape();\n    }\n  }\n\n  function drawCirrostratus(p) {\n    let haloColor = p.color(255, 255, 240);\n    haloColor.setAlpha(50 + p.random(50));  // Vary alpha\n    p.background(200, 220, 255); // Light blue sky\n    p.noStroke();\n    p.fill(haloColor); // Very light yellow, semi-transparent\n    p.ellipse(p.width / 2, p.height / 2, 100 + p.random(50), 100 + p.random(50)); // Vary size\n  }\n\n  function drawCirrocumulus(p) {\n    p.background(220, 230, 255); // Lighter Blue\n    p.noStroke();\n    for (let i = 0; i < 40 + p.random(20); i++) {\n      let x = p.random(p.width);\n      let y = p.random(p.height);\n      let size = p.random(5, 15);\n      let cloudColor = p.color(255);\n      cloudColor.setAlpha(150 + p.random(100)); // Vary alpha for depth\n      p.fill(cloudColor);\n      p.ellipse(x, y, size, size);\n    }\n  }\n\n  function drawAltostratus(p) {\n    let baseColor = p.color(180, 180, 180);\n    baseColor.setAlpha(50 + p.random(50));\n\n    p.background(baseColor); // Translucent base\n\n    p.noStroke();\n    for (let i = 0; i < p.height / 10; i++) {\n      let rectColor = p.color(200);\n      rectColor.setAlpha(80 + p.random(40));\n      p.fill(rectColor);\n      p.rect(0, i * 10, p.width, 8 + p.random(4)); // Vary height\n    }\n  }\n\n  function drawAltocumulus(p) {\n    p.background(210, 230, 240); // Softer Blue Sky\n    p.noStroke();\n    for (let i = 0; i < 30 + p.random(15); i++) {\n      let x = p.random(p.width);\n      let y = p.random(p.height);\n      let size = p.random(10, 30);\n      let cloudColor = p.color(240, 240, 240);\n      cloudColor.setAlpha(100 + p.random(100));\n      p.fill(cloudColor);\n      p.ellipse(x, y, size, size);\n    }\n  }\n\n  function drawCumulonimbus(p) {\n    p.background(100); // Dark gray sky\n\n    let cloudColor = p.color(255);\n    cloudColor.setAlpha(150 + p.random(100));\n\n    p.fill(cloudColor);\n    p.beginShape();\n    p.vertex(50, p.height);\n    p.vertex(50, p.height / 2);\n    p.vertex(100, p.height / 4);\n    p.vertex(150, p.height / 2);\n    p.vertex(150, p.height);\n    p.endShape(p.CLOSE);\n\n    let shadowColor = p.color(80);\n    shadowColor.setAlpha(100 + p.random(50));\n    p.fill(shadowColor); //Darken\n    p.triangle(150, p.height, 50, p.height, 100, p.height*1.25);\n  }\n\n  function drawCumulus(p) {\n     let cloudColor = p.color(255);\n        cloudColor.setAlpha(150+p.random(100))\n      p.fill(cloudColor);\n\n      p.noStroke();\n      let baseHeight = 130 + p.random(40);\n\n      p.ellipse(50, baseHeight + (150 - baseHeight), 30 + p.random(20), 30 + p.random(20));\n      p.ellipse(100, baseHeight - 20 + (150 - baseHeight), 40 + p.random(25), 40 + p.random(25));\n      p.ellipse(150, baseHeight + (150 - baseHeight), 30 + p.random(20), 30 + p.random(20));\n      p.ellipse(100, baseHeight + 20 + (150 - baseHeight), 50 + p.random(30), 50 + p.random(30));\n  }\n\n  function drawStratus(p) {\n      let cloudColor = p.color(200);\n        cloudColor.setAlpha(50+p.random(100));\n\n      p.fill(cloudColor);\n    p.noStroke();\n    for (let y = 0; y < p.height; y += 15 + p.random(10)) {\n      p.rect(0, y, p.width, 10 + p.random(5));\n    }\n  }\n\n  function drawNimbostratus(p) {\n      let skyColor = p.color(70);\n      skyColor.setAlpha(50 + p.random(50)); // Add some variation to sky color\n\n      p.background(skyColor);\n\n    p.stroke(255);\n    p.strokeWeight(1);\n    for (let i = 0; i < 50 + p.random(20); i++) {\n      let x = p.random(p.width);\n      let y = p.random(p.height);\n      let rainLength = 5 + p.random(10); // Make rain length variable\n      p.line(x, y, x, y + rainLength);\n    }\n  }\n\n<\/script> </body> </html>'], [`<html> <head><meta charset="utf-8"><title>Cloud Type Sketches</title><script src="https://cdn.jsdelivr.net/npm/p5@1.9.0/lib/p5.js"><\/script><style>
    body {
      margin: 0;
      padding: 0;
      overflow: auto; /* allows scrolling when content overflows */
    }

    .grid-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr); /* Adjust for responsiveness */
      grid-gap: 10px;
      padding: 10px;
      box-sizing: border-box; /* Include padding in element's total width and height */
    }

    .sketch-container {
      position: relative;
      width: 100%;
      padding-bottom: 100%; /* Maintain 1:1 aspect ratio */
      overflow: hidden;
    }

    .sketch-container canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100% !important;
      height: 100% !important;
    }

    .button-container {
      text-align: center;
      margin-top: 10px;
      position: absolute;
      z-index: 1000;
    }
  </style>`, '</head> <body> <div class="grid-container" id="gridContainer"></div> <pre id="console">created with gemini flash 2.0</pre> <div class="button-container"> <button id="resetButton">Reset All</button> </div> <script>\n    const cloudTypes = [\n    { name: "Cirrus", drawFunction: drawCirrus },\n    { name: "Cirrostratus", drawFunction: drawCirrostratus },\n    { name: "Cirrocumulus", drawFunction: drawCirrocumulus },\n    { name: "Altostratus", drawFunction: drawAltostratus },\n    { name: "Altocumulus", drawFunction: drawAltocumulus },\n    { name: "Cumulonimbus", drawFunction: drawCumulonimbus },\n    { name: "Cumulus", drawFunction: drawCumulus },\n    { name: "Stratus", drawFunction: drawStratus },\n    { name: "Nimbostratus", drawFunction: drawNimbostratus }\n  ];\n\n  let sketchInstances = {};\n  let visibleSketches = {};\n\n  function createCloudSketch(cloudData) {\n    return function(p) {\n      let isVisible = true;\n      let randomSeed; // Local random seed for each sketch\n\n      p.setup = function() {\n        p.createCanvas(200, 200);\n        p.noLoop();\n        visibleSketches[cloudData.name] = true;\n        randomSeed = p.random(10000); // Initialize seed on setup\n        drawSketch();\n      };\n\n      function drawSketch() {\n        p.randomSeed(randomSeed); // Use the sketch\'s local seed\n        p.background(220);\n        if (visibleSketches[cloudData.name]) {\n          cloudData.drawFunction(p);\n        } else {\n          p.fill(0);\n          p.textAlign(p.CENTER, p.CENTER);\n          p.text("Sketch Hidden", p.width / 2, p.height / 2);\n        }\n      }\n\n      p.myCustomRedraw = function() {\n        randomSeed = p.random(10000); // Generate new seed on redraw\n        drawSketch();\n      };\n\n      p.toggleVisibility = function() {\n        isVisible = !isVisible;\n        visibleSketches[cloudData.name] = isVisible;\n        drawSketch();\n      };\n    };\n  }\n\n  function addSketchToGrid(cloudData) {\n    const gridContainer = document.getElementById("gridContainer");\n    const sketchContainer = document.createElement("div");\n    sketchContainer.classList.add("sketch-container");\n\n    const canvasId = \\`canvas-\\${cloudData.name.replace(/\\\\s+/g, \'\')}\\`;\n    sketchContainer.innerHTML = \\`<div id="\\${canvasId}"></div>\\`;\n\n    gridContainer.appendChild(sketchContainer);\n\n    const cloudSketch = createCloudSketch(cloudData);\n    sketchInstances[cloudData.name] = new p5(cloudSketch, canvasId);\n\n    const toggleButton = document.createElement("button");\n    toggleButton.textContent = \\`Toggle \\${cloudData.name}\\`;\n    toggleButton.addEventListener("click", () => {\n      sketchInstances[cloudData.name].toggleVisibility();\n    });\n\n    const buttonContainer = document.createElement("div");\n    buttonContainer.classList.add("button-container");\n    buttonContainer.appendChild(toggleButton);\n    sketchContainer.appendChild(buttonContainer);\n  }\n\n  cloudTypes.forEach(addSketchToGrid);\n\n  document.getElementById("resetButton").addEventListener("click", () => {\n    for (const cloudName in sketchInstances) {\n      visibleSketches[cloudName] = true;\n      sketchInstances[cloudName].myCustomRedraw();\n    }\n  });\n\n  // Cloud Drawing Functions (Implement your artistic interpretations here)\n\n  function drawCirrus(p) {\n    p.background(230, 240, 255);  // Light blue background\n    p.stroke(150, 150, 255, 150); // Light blue, semi-transparent\n    p.strokeWeight(1 + p.random(1));\n    p.noFill();\n    for (let i = 0; i < 5; i++) {\n      p.beginShape();\n      for (let x = 0; x <= p.width; x += 5 + p.random(5)) {\n        let y = p.height / 2 + p.sin(x / (20 + p.random(10)) + i) * (20 + p.random(15));\n        p.vertex(x, y);\n      }\n      p.endShape();\n    }\n  }\n\n  function drawCirrostratus(p) {\n    let haloColor = p.color(255, 255, 240);\n    haloColor.setAlpha(50 + p.random(50));  // Vary alpha\n    p.background(200, 220, 255); // Light blue sky\n    p.noStroke();\n    p.fill(haloColor); // Very light yellow, semi-transparent\n    p.ellipse(p.width / 2, p.height / 2, 100 + p.random(50), 100 + p.random(50)); // Vary size\n  }\n\n  function drawCirrocumulus(p) {\n    p.background(220, 230, 255); // Lighter Blue\n    p.noStroke();\n    for (let i = 0; i < 40 + p.random(20); i++) {\n      let x = p.random(p.width);\n      let y = p.random(p.height);\n      let size = p.random(5, 15);\n      let cloudColor = p.color(255);\n      cloudColor.setAlpha(150 + p.random(100)); // Vary alpha for depth\n      p.fill(cloudColor);\n      p.ellipse(x, y, size, size);\n    }\n  }\n\n  function drawAltostratus(p) {\n    let baseColor = p.color(180, 180, 180);\n    baseColor.setAlpha(50 + p.random(50));\n\n    p.background(baseColor); // Translucent base\n\n    p.noStroke();\n    for (let i = 0; i < p.height / 10; i++) {\n      let rectColor = p.color(200);\n      rectColor.setAlpha(80 + p.random(40));\n      p.fill(rectColor);\n      p.rect(0, i * 10, p.width, 8 + p.random(4)); // Vary height\n    }\n  }\n\n  function drawAltocumulus(p) {\n    p.background(210, 230, 240); // Softer Blue Sky\n    p.noStroke();\n    for (let i = 0; i < 30 + p.random(15); i++) {\n      let x = p.random(p.width);\n      let y = p.random(p.height);\n      let size = p.random(10, 30);\n      let cloudColor = p.color(240, 240, 240);\n      cloudColor.setAlpha(100 + p.random(100));\n      p.fill(cloudColor);\n      p.ellipse(x, y, size, size);\n    }\n  }\n\n  function drawCumulonimbus(p) {\n    p.background(100); // Dark gray sky\n\n    let cloudColor = p.color(255);\n    cloudColor.setAlpha(150 + p.random(100));\n\n    p.fill(cloudColor);\n    p.beginShape();\n    p.vertex(50, p.height);\n    p.vertex(50, p.height / 2);\n    p.vertex(100, p.height / 4);\n    p.vertex(150, p.height / 2);\n    p.vertex(150, p.height);\n    p.endShape(p.CLOSE);\n\n    let shadowColor = p.color(80);\n    shadowColor.setAlpha(100 + p.random(50));\n    p.fill(shadowColor); //Darken\n    p.triangle(150, p.height, 50, p.height, 100, p.height*1.25);\n  }\n\n  function drawCumulus(p) {\n     let cloudColor = p.color(255);\n        cloudColor.setAlpha(150+p.random(100))\n      p.fill(cloudColor);\n\n      p.noStroke();\n      let baseHeight = 130 + p.random(40);\n\n      p.ellipse(50, baseHeight + (150 - baseHeight), 30 + p.random(20), 30 + p.random(20));\n      p.ellipse(100, baseHeight - 20 + (150 - baseHeight), 40 + p.random(25), 40 + p.random(25));\n      p.ellipse(150, baseHeight + (150 - baseHeight), 30 + p.random(20), 30 + p.random(20));\n      p.ellipse(100, baseHeight + 20 + (150 - baseHeight), 50 + p.random(30), 50 + p.random(30));\n  }\n\n  function drawStratus(p) {\n      let cloudColor = p.color(200);\n        cloudColor.setAlpha(50+p.random(100));\n\n      p.fill(cloudColor);\n    p.noStroke();\n    for (let y = 0; y < p.height; y += 15 + p.random(10)) {\n      p.rect(0, y, p.width, 10 + p.random(5));\n    }\n  }\n\n  function drawNimbostratus(p) {\n      let skyColor = p.color(70);\n      skyColor.setAlpha(50 + p.random(50)); // Add some variation to sky color\n\n      p.background(skyColor);\n\n    p.stroke(255);\n    p.strokeWeight(1);\n    for (let i = 0; i < 50 + p.random(20); i++) {\n      let x = p.random(p.width);\n      let y = p.random(p.height);\n      let rainLength = 5 + p.random(10); // Make rain length variable\n      p.line(x, y, x, y + rainLength);\n    }\n  }\n\n<\/script> </body> </html>'])), renderHead());
}, "/home/matsu/Desktop/jy/src/pages/sketches/2025/250327-cloud_works_bento.astro", void 0);

const $$file = "/home/matsu/Desktop/jy/src/pages/sketches/2025/250327-cloud_works_bento.astro";
const $$url = "/sketches/2025/250327-cloud_works_bento";

const __vite_glob_0_20 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$250327CloudWorksBento,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { __vite_glob_0_20 as _ };
