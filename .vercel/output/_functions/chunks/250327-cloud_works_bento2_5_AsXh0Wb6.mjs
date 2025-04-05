import { a as createComponent, b as renderTemplate, g as renderHead } from './astro/server_BuftSjIy.mjs';
import 'kleur/colors';
import 'clsx';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$250327CloudWorksBento25 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(['<html> <head><meta charset="utf-8"><title>Enhanced Generative Cloud Sketches</title><script src="https://cdn.jsdelivr.net/npm/p5@1.9.0/lib/p5.js"><\/script><style>\n    body {\n      margin: 0;\n      padding: 0;\n      overflow: auto;\n      font-family: sans-serif;\n      background-color: #f0f0f0; /* Light background for the page */\n    }\n\n    .grid-container {\n      display: grid;\n      /* Responsive grid: 3 columns on larger screens, 2 on medium, 1 on small */\n      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n      grid-gap: 20px; /* Increased gap */\n      padding: 20px; /* Increased padding */\n      box-sizing: border-box;\n    }\n\n    .sketch-cell {\n        background-color: #fff; /* White background for each cell */\n        border-radius: 8px; /* Rounded corners */\n        box-shadow: 0 2px 5px rgba(0,0,0,0.1); /* Subtle shadow */\n        overflow: hidden; /* Keep content within rounded corners */\n        display: flex;\n        flex-direction: column; /* Stack canvas and button */\n    }\n\n    .sketch-container {\n      position: relative;\n      width: 100%;\n      padding-bottom: 100%; /* Keep it square */\n      overflow: hidden;\n    }\n\n    .sketch-container canvas {\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100% !important;\n      height: 100% !important;\n      display: block; /* Remove potential extra space below canvas */\n    }\n\n    .button-container {\n      text-align: center;\n      padding: 10px;\n      border-top: 1px solid #eee; /* Separator line */\n    }\n\n    .controls-container {\n        text-align: center;\n        padding: 20px;\n    }\n\n    button {\n        padding: 8px 15px;\n        font-size: 14px;\n        cursor: pointer;\n        border: 1px solid #ccc;\n        border-radius: 4px;\n        background-color: #fff;\n        transition: background-color 0.2s;\n    }\n\n    button:hover {\n        background-color: #eee;\n    }\n\n    #resetButton {\n        background-color: #007bff;\n        color: white;\n        border-color: #007bff;\n    }\n     #resetButton:hover {\n        background-color: #0056b3;\n    }\n\n  </style>', `</head> <body> <div class="controls-container"> <button id="resetButton">Regenerate All</button> </div> <div class="grid-container" id="gridContainer"> <!-- Sketch cells will be added here by JavaScript --> </div> <script>
  // --- Color Palettes ---
  const palettes = {
    daytime: [
      ['#87CEEB', '#ADD8E6', '#FFFFFF', '#F5F5F5', '#E0FFFF'], // Sky blues, whites
      ['#B0E0E6', '#AFEEEE', '#F0FFFF', '#FFFFFF', '#E6E6FA']  // Powder blues, azure, whites
    ],
    sunset: [
      ['#FF7F50', '#FF6347', '#FFA07A', '#FFDAB9', '#FFFFE0'], // Corals, oranges, yellows
      ['#FFB6C1', '#FF69B4', '#DB7093', '#DA70D6', '#FFF0F5']  // Pinks, purples
    ],
    stormy: [
      ['#708090', '#778899', '#B0C4DE', '#696969', '#A9A9A9'], // Slates, grays
      ['#4682B4', '#5F9EA0', '#A9A9A9', '#808080', '#D3D3D3']  // Steel blue, cadet blue, grays
    ],
    pastel: [
       ['#FFFACD', '#FAFAD2', '#FFFFE0', '#F5FFFA', '#F0FFF0'], // Lemon chiffon, mint cream
       ['#FFE4E1', '#FFF0F5', '#F0FFFF', '#E6E6FA', '#FFF5EE'] // Misty rose, lavender blush
    ]
  };

  function getRandomPalette() {
    const themes = Object.keys(palettes);
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    const variations = palettes[randomTheme];
    return variations[Math.floor(Math.random() * variations.length)].map(hex => p5.instance.color(hex)); // Return p5 color objects
  }
  // --- End Color Palettes ---

  const cloudTypes = [
    { name: "Cirrus", drawFunction: drawCirrus },
    { name: "Cirrostratus", drawFunction: drawCirrostratus },
    { name: "Cirrocumulus", drawFunction: drawCirrocumulus },
    { name: "Altostratus", drawFunction: drawAltostratus },
    { name: "Altocumulus", drawFunction: drawAltocumulus },
    { name: "Cumulonimbus", drawFunction: drawCumulonimbus },
    { name: "Cumulus", drawFunction: drawCumulus },
    { name: "Stratus", drawFunction: drawStratus },
    { name: "Nimbostratus", drawFunction: drawNimbostratus }
  ];

  let sketchInstances = {};
  let visibleSketches = {};

  function createCloudSketch(cloudData) {
    return function(p) {
      let isVisible = true;
      let randomSeed;
      let noiseSeed;
      let currentPalette;
      let noiseOffsetX, noiseOffsetY; // For Perlin noise movement simulation

      p.setup = function() {
        p.createCanvas(200, 200);
        p.noLoop(); // Draw only once unless toggled or reset
        regenerateParameters(); // Initial setup
        visibleSketches[cloudData.name] = true;
        drawSketch();
      };

      function regenerateParameters() {
        randomSeed = p.random(100000);
        noiseSeed = p.random(100000);
        currentPalette = getRandomPalette();
        // Add small offsets for noise to simulate subtle shifts on regeneration
        noiseOffsetX = p.random(100);
        noiseOffsetY = p.random(100);
      }

      function drawSketch() {
        p.randomSeed(randomSeed);
        p.noiseSeed(noiseSeed);
        // Use the first color as a base background, slightly transparent
        let bgColor = p.color(currentPalette[0]);
        bgColor.setAlpha(230); // Make background slightly opaque
        p.background(bgColor);

        if (visibleSketches[cloudData.name]) {
          // Pass palette and noise offsets to the drawing function
          cloudData.drawFunction(p, currentPalette, noiseOffsetX, noiseOffsetY);
        } else {
          p.background(100); // Darker background when hidden
          p.fill(255);
          p.noStroke();
          p.textAlign(p.CENTER, p.CENTER);
          p.textSize(14);
          p.text("Sketch Hidden", p.width / 2, p.height / 2);
        }
      }

      p.myCustomRedraw = function() {
        regenerateParameters(); // Get new seeds and palette
        drawSketch(); // Redraw with new parameters
      };

      p.toggleVisibility = function() {
        isVisible = !isVisible;
        visibleSketches[cloudData.name] = isVisible;
        drawSketch(); // Redraw to show/hide
      };
    };
  }

  function addSketchToGrid(cloudData) {
    const gridContainer = document.getElementById("gridContainer");

    // Create the cell structure
    const sketchCell = document.createElement("div");
    sketchCell.classList.add("sketch-cell");

    const sketchContainer = document.createElement("div");
    sketchContainer.classList.add("sketch-container");
    const canvasId = \`canvas-\${cloudData.name.replace(/\\s+/g, '-')}\`; // Ensure valid ID
    sketchContainer.innerHTML = \`<div id="\${canvasId}"></div>\`; // Div for p5 to attach to

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    const toggleButton = document.createElement("button");
    toggleButton.textContent = \`\${cloudData.name}\`; // Just the name on the button
    toggleButton.title = \`Toggle \${cloudData.name} visibility\`; // Tooltip
    toggleButton.addEventListener("click", () => {
      sketchInstances[cloudData.name].toggleVisibility();
    });
    buttonContainer.appendChild(toggleButton);

    // Assemble the cell
    sketchCell.appendChild(sketchContainer);
    sketchCell.appendChild(buttonContainer);
    gridContainer.appendChild(sketchCell);

    // Create the p5 instance
    const cloudSketch = createCloudSketch(cloudData);
    // Use a global reference for color conversion in getRandomPalette
    if (!p5.instance) p5.instance = new p5();
    sketchInstances[cloudData.name] = new p5(cloudSketch, canvasId);
  }

  // Initialize
  cloudTypes.forEach(addSketchToGrid);

  document.getElementById("resetButton").addEventListener("click", () => {
    for (const cloudName in sketchInstances) {
      visibleSketches[cloudName] = true; // Ensure all are visible on reset
      sketchInstances[cloudName].myCustomRedraw();
    }
  });

  // --- Enhanced Cloud Drawing Functions ---

  function drawCirrus(p, palette, noiseX, noiseY) {
    p.noFill();
    let baseStroke = palette[1]; // Use a palette color for stroke
    for (let i = 0; i < 5 + p.random(5); i++) {
      let strokeCol = p.lerpColor(palette[1], palette[2], p.random(0.5)); // Vary color slightly
      strokeCol.setAlpha(p.random(80, 180));
      p.stroke(strokeCol);
      p.strokeWeight(p.random(0.5, 2));
      p.beginShape();
      let yOffset = p.random(p.height * 0.2, p.height * 0.8);
      let noiseFreq = p.random(0.01, 0.05);
      let amplitude = p.random(20, 50);
      for (let x = -10; x <= p.width + 10; x += 5) {
        let noiseVal = p.noise(x * noiseFreq + noiseX, i * 0.1 + noiseY);
        let y = yOffset + p.map(noiseVal, 0, 1, -amplitude, amplitude);
        p.curveVertex(x, y); // Use curveVertex for smoother lines
      }
      p.endShape();
    }
  }

  function drawCirrostratus(p, palette, noiseX, noiseY) {
    // Faint, uniform layer
    let layerColor = p.color(palette[2]); // Use a light palette color
    layerColor.setAlpha(p.random(30, 70));
    p.noStroke();
    p.fill(layerColor);
    p.rect(0, 0, p.width, p.height);

    // Optional: Subtle sun/moon halo
    if (p.random() > 0.5) {
        let haloColor = p.color(palette[3]);
        haloColor.setAlpha(p.random(40, 80));
        p.fill(haloColor);
        let haloSize = p.width * p.random(0.4, 0.7);
        let sunX = p.width * p.random(0.3, 0.7);
        let sunY = p.height * p.random(0.3, 0.7);
        p.ellipse(sunX, sunY, haloSize, haloSize);
    }
  }

 function drawCirrocumulus(p, palette, noiseX, noiseY) {
    p.noStroke();
    let numClouds = 30 + p.random(40);
    let baseSize = 5;
    let sizeVariation = 10;
    let noiseScale = 0.05; // Controls the clustering

    for (let i = 0; i < numClouds; i++) {
        // Use noise to cluster the dots more organically
        let x = p.width * p.noise(i * 0.1 + noiseX, noiseY);
        let y = p.height * p.noise(noiseX, i * 0.1 + noiseY);

        let size = baseSize + p.random(sizeVariation);
        let cloudColor = p.lerpColor(palette[2], palette[3], p.random(0.6)); // Mix light colors
        cloudColor.setAlpha(p.random(100, 220));
        p.fill(cloudColor);
        p.ellipse(x, y, size, size * p.random(0.8, 1.2)); // Slightly irregular shapes
    }
 }

 function drawAltostratus(p, palette, noiseX, noiseY) {
    p.noStroke();
    // Draw multiple translucent layers
    for(let i = 0; i < 5; i++) {
        let layerColor = p.lerpColor(palette[1], palette[4], p.random(1)); // Mix mid-range colors
        layerColor.setAlpha(p.random(20, 50));
        p.fill(layerColor);
        // Use noise to create uneven layering
        p.beginShape();
        for(let x = 0; x <= p.width; x+= 20) {
             let yNoise = p.noise(x * 0.01 + noiseX, i * 0.2 + noiseY);
             let y = p.map(yNoise, 0, 1, -p.height * 0.3, p.height * 1.3);
             p.vertex(x, y);
        }
        p.vertex(p.width, p.height);
        p.vertex(0, p.height);
        p.endShape(p.CLOSE);
    }
     // Dim sun/moon effect (optional)
    if (p.random() > 0.7) {
        let sunColor = p.color(palette[3]);
        sunColor.setAlpha(p.random(30, 60));
        p.fill(sunColor);
        let sunSize = p.width * p.random(0.1, 0.2);
        p.ellipse(p.width / 2 + p.random(-30, 30), p.height / 2 + p.random(-30, 30), sunSize, sunSize);
    }
 }


function drawAltocumulus(p, palette, noiseX, noiseY) {
    p.noStroke();
    let numPuffs = 15 + p.random(15);
    let noiseScale = 0.03;
    let puffBaseSize = 20;
    let puffVar = 15;

    for (let i = 0; i < numPuffs; i++) {
        let puffX = p.width * p.noise(i * 0.15 + noiseX, noiseY + 10);
        let puffY = p.height * p.noise(noiseX + 10, i * 0.15 + noiseY);

        let puffSize = puffBaseSize + p.random(-puffVar/2, puffVar);

        // Draw multiple ellipses per puff for texture
        for (let j = 0; j < 5; j++) {
            let offsetX = p.random(-puffSize * 0.3, puffSize * 0.3);
            let offsetY = p.random(-puffSize * 0.3, puffSize * 0.3);
            let detailSize = puffSize * p.random(0.5, 0.8);

            let puffColor = p.lerpColor(palette[2], palette[3], p.random(0.8));
            let shadowColor = p.lerpColor(palette[1], palette[4], p.random(0.5)); // Cooler/darker shadow

            // Base puff color
            puffColor.setAlpha(p.random(150, 230));
            p.fill(puffColor);
            p.ellipse(puffX + offsetX, puffY + offsetY, detailSize, detailSize * p.random(0.8, 1.2));

            // Subtle shadow underneath
            if (j < 2) { // Fewer shadows
                 shadowColor.setAlpha(p.random(30, 80));
                 p.fill(shadowColor);
                 p.ellipse(puffX + offsetX + 2, puffY + offsetY + 3, detailSize * 0.9, detailSize * 0.9);
            }
        }
    }
}

function drawCumulonimbus(p, palette, noiseX, noiseY) {
    let baseColor = p.lerpColor(palette[1], palette[4], 0.7); // Darker base from palette
    let highlightColor = p.lerpColor(palette[2], palette[3], 0.5);

    p.noStroke();

    // Dark base
    baseColor.setAlpha(p.random(180, 240));
    p.fill(baseColor);
    let baseY = p.height * p.random(0.6, 0.8);
    p.rect(0, baseY, p.width, p.height - baseY);

    // Main towering shape using noise
    let noiseScale = 0.02;
    let amplitude = p.width * 0.4;
    highlightColor.setAlpha(255);
    p.fill(highlightColor);

    p.beginShape();
    let topY = p.height * p.random(0.1, 0.3);
    // Left edge
    for (let y = baseY; y > topY; y -= 5) {
        let xNoise = p.noise(y * noiseScale + noiseX, noiseY);
        let x = p.width * 0.5 - amplitude * p.map(y, baseY, topY, 0.2, 1) * p.map(xNoise, 0, 1, 0.5, 1.5);
        p.vertex(x, y);
    }
    // Top anvil shape (wider)
    let anvilWidth = amplitude * p.random(1.2, 1.8);
    for (let x = p.width * 0.5 - anvilWidth/2; x < p.width * 0.5 + anvilWidth/2; x += 10) {
         let yNoise = p.noise(x * noiseScale * 2 + noiseX + 20, noiseY + 30);
         let y = topY + p.map(yNoise, 0, 1, -15, 15);
         p.vertex(x, y);
    }
    // Right edge
    for (let y = topY; y < baseY; y += 5) {
        let xNoise = p.noise(y * noiseScale + noiseX + 10, noiseY + 10);
        let x = p.width * 0.5 + amplitude * p.map(y, topY, baseY, 1, 0.2) * p.map(xNoise, 0, 1, 0.5, 1.5);
        p.vertex(x, y);
    }
    p.endShape(p.CLOSE);

    // Optional lightning
    if (p.random() < 0.15) {
        p.stroke(255, 255, 0, 200); // Yellowish
        p.strokeWeight(p.random(1, 3));
        let startX = p.random(p.width * 0.3, p.width * 0.7);
        let startY = p.random(baseY, p.height * 0.9);
        let endX = startX + p.random(-20, 20);
        let endY = p.height + 10;
        p.line(startX, startY, endX, endY);
        // Add jaggedness
        for(let k=0; k < 3; k++) {
             let midX = p.lerp(startX, endX, p.random(0.3, 0.7));
             let midY = p.lerp(startY, endY, p.random(0.3, 0.7));
             p.line(startX, startY, midX + p.random(-15, 15), midY);
             startX = midX + p.random(-15, 15);
             startY = midY;
        }
         p.line(startX, startY, endX, endY);

    }
}

function drawCumulus(p, palette, noiseX, noiseY) {
    p.noStroke();
    let numPuffs = 5 + p.random(4);
    let clusterCenterX = p.width / 2 + p.random(-p.width * 0.2, p.width * 0.2);
    let clusterCenterY = p.height * 0.6 + p.random(-p.height * 0.1, p.height * 0.1);
    let baseSize = 30 + p.random(20);

    let baseColor = p.lerpColor(palette[2], palette[3], 0.3); // Light, bright base
    let shadowColor = p.lerpColor(palette[1], palette[0], 0.5); // Cooler shadow

    for (let i = 0; i < numPuffs; i++) {
        let angle = p.random(p.TWO_PI);
        let radius = p.random(baseSize * 0.5);
        let puffX = clusterCenterX + p.cos(angle) * radius;
        let puffY = clusterCenterY + p.sin(angle) * radius * 0.8 - i * 5; // Stack slightly
        let puffSize = baseSize * p.random(0.7, 1.3);

        // Draw shadow first
        shadowColor.setAlpha(p.random(40, 90));
        p.fill(shadowColor);
        p.ellipse(puffX + 3, puffY + 4, puffSize, puffSize * 0.9); // Offset shadow

        // Draw main puff
        baseColor.setAlpha(p.random(200, 255));
        p.fill(baseColor);
        p.ellipse(puffX, puffY, puffSize, puffSize);
    }
}

function drawStratus(p, palette, noiseX, noiseY) {
    p.noStroke();
    let numLayers = 5 + p.random(5);
    let baseColor = p.lerpColor(palette[1], palette[4], 0.5); // Grayish mid-tone

    for (let i = 0; i < numLayers; i++) {
        let layerColor = p.lerpColor(baseColor, palette[2], p.random(0.5)); // Vary brightness
        layerColor.setAlpha(p.random(50, 100));
        p.fill(layerColor);

        let yPos = p.map(i, 0, numLayers, p.height * 0.2, p.height * 0.9);
        let noiseFreq = 0.005 + p.random(0.005);
        let amplitude = 10 + p.random(15);

        p.beginShape();
        for (let x = -10; x <= p.width + 10; x += 10) {
            let noiseVal = p.noise(x * noiseFreq + noiseX + i * 10, noiseY + i * 5);
            let y = yPos + p.map(noiseVal, 0, 1, -amplitude, amplitude);
            p.vertex(x, y);
        }
         // Create a thick band
        p.vertex(p.width + 10, yPos + amplitude + 20);
        p.vertex(-10, yPos + amplitude + 20);
        p.endShape(p.CLOSE);
    }
}

function drawNimbostratus(p, palette, noiseX, noiseY) {
    // Dark, uniform background layers
    let baseColor = p.lerpColor(palette[0], palette[4], 0.8); // Very dark base
    for(let i=0; i< 3; i++) {
        let layerCol = p.lerpColor(baseColor, palette[1], p.random(0.4));
        layerCol.setAlpha(p.random(100, 180));
        p.fill(layerCol);
        p.rect(0, i * p.height/3, p.width, p.height/3 + 5); // Overlapping rects
    }


    // Rain streaks
    let rainColor = p.color(palette[2]); // Lighter color for contrast
    rainColor.setAlpha(p.random(70, 150));
    p.stroke(rainColor);
    p.strokeWeight(p.random(0.5, 1.5));
    let numStreaks = 100 + p.random(100);
    let angle = p.random(-0.1, 0.1); // Slight slant to rain

    for (let i = 0; i < numStreaks; i++) {
        let x = p.random(-10, p.width + 10);
        let y = p.random(-10, p.height * 0.8); // Start rain higher up
        let len = p.random(10, 30);
        p.line(x, y, x + len * angle, y + len);
    }
}


<\/script> </body> </html>`], ['<html> <head><meta charset="utf-8"><title>Enhanced Generative Cloud Sketches</title><script src="https://cdn.jsdelivr.net/npm/p5@1.9.0/lib/p5.js"><\/script><style>\n    body {\n      margin: 0;\n      padding: 0;\n      overflow: auto;\n      font-family: sans-serif;\n      background-color: #f0f0f0; /* Light background for the page */\n    }\n\n    .grid-container {\n      display: grid;\n      /* Responsive grid: 3 columns on larger screens, 2 on medium, 1 on small */\n      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n      grid-gap: 20px; /* Increased gap */\n      padding: 20px; /* Increased padding */\n      box-sizing: border-box;\n    }\n\n    .sketch-cell {\n        background-color: #fff; /* White background for each cell */\n        border-radius: 8px; /* Rounded corners */\n        box-shadow: 0 2px 5px rgba(0,0,0,0.1); /* Subtle shadow */\n        overflow: hidden; /* Keep content within rounded corners */\n        display: flex;\n        flex-direction: column; /* Stack canvas and button */\n    }\n\n    .sketch-container {\n      position: relative;\n      width: 100%;\n      padding-bottom: 100%; /* Keep it square */\n      overflow: hidden;\n    }\n\n    .sketch-container canvas {\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100% !important;\n      height: 100% !important;\n      display: block; /* Remove potential extra space below canvas */\n    }\n\n    .button-container {\n      text-align: center;\n      padding: 10px;\n      border-top: 1px solid #eee; /* Separator line */\n    }\n\n    .controls-container {\n        text-align: center;\n        padding: 20px;\n    }\n\n    button {\n        padding: 8px 15px;\n        font-size: 14px;\n        cursor: pointer;\n        border: 1px solid #ccc;\n        border-radius: 4px;\n        background-color: #fff;\n        transition: background-color 0.2s;\n    }\n\n    button:hover {\n        background-color: #eee;\n    }\n\n    #resetButton {\n        background-color: #007bff;\n        color: white;\n        border-color: #007bff;\n    }\n     #resetButton:hover {\n        background-color: #0056b3;\n    }\n\n  </style>', `</head> <body> <div class="controls-container"> <button id="resetButton">Regenerate All</button> </div> <div class="grid-container" id="gridContainer"> <!-- Sketch cells will be added here by JavaScript --> </div> <script>
  // --- Color Palettes ---
  const palettes = {
    daytime: [
      ['#87CEEB', '#ADD8E6', '#FFFFFF', '#F5F5F5', '#E0FFFF'], // Sky blues, whites
      ['#B0E0E6', '#AFEEEE', '#F0FFFF', '#FFFFFF', '#E6E6FA']  // Powder blues, azure, whites
    ],
    sunset: [
      ['#FF7F50', '#FF6347', '#FFA07A', '#FFDAB9', '#FFFFE0'], // Corals, oranges, yellows
      ['#FFB6C1', '#FF69B4', '#DB7093', '#DA70D6', '#FFF0F5']  // Pinks, purples
    ],
    stormy: [
      ['#708090', '#778899', '#B0C4DE', '#696969', '#A9A9A9'], // Slates, grays
      ['#4682B4', '#5F9EA0', '#A9A9A9', '#808080', '#D3D3D3']  // Steel blue, cadet blue, grays
    ],
    pastel: [
       ['#FFFACD', '#FAFAD2', '#FFFFE0', '#F5FFFA', '#F0FFF0'], // Lemon chiffon, mint cream
       ['#FFE4E1', '#FFF0F5', '#F0FFFF', '#E6E6FA', '#FFF5EE'] // Misty rose, lavender blush
    ]
  };

  function getRandomPalette() {
    const themes = Object.keys(palettes);
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    const variations = palettes[randomTheme];
    return variations[Math.floor(Math.random() * variations.length)].map(hex => p5.instance.color(hex)); // Return p5 color objects
  }
  // --- End Color Palettes ---

  const cloudTypes = [
    { name: "Cirrus", drawFunction: drawCirrus },
    { name: "Cirrostratus", drawFunction: drawCirrostratus },
    { name: "Cirrocumulus", drawFunction: drawCirrocumulus },
    { name: "Altostratus", drawFunction: drawAltostratus },
    { name: "Altocumulus", drawFunction: drawAltocumulus },
    { name: "Cumulonimbus", drawFunction: drawCumulonimbus },
    { name: "Cumulus", drawFunction: drawCumulus },
    { name: "Stratus", drawFunction: drawStratus },
    { name: "Nimbostratus", drawFunction: drawNimbostratus }
  ];

  let sketchInstances = {};
  let visibleSketches = {};

  function createCloudSketch(cloudData) {
    return function(p) {
      let isVisible = true;
      let randomSeed;
      let noiseSeed;
      let currentPalette;
      let noiseOffsetX, noiseOffsetY; // For Perlin noise movement simulation

      p.setup = function() {
        p.createCanvas(200, 200);
        p.noLoop(); // Draw only once unless toggled or reset
        regenerateParameters(); // Initial setup
        visibleSketches[cloudData.name] = true;
        drawSketch();
      };

      function regenerateParameters() {
        randomSeed = p.random(100000);
        noiseSeed = p.random(100000);
        currentPalette = getRandomPalette();
        // Add small offsets for noise to simulate subtle shifts on regeneration
        noiseOffsetX = p.random(100);
        noiseOffsetY = p.random(100);
      }

      function drawSketch() {
        p.randomSeed(randomSeed);
        p.noiseSeed(noiseSeed);
        // Use the first color as a base background, slightly transparent
        let bgColor = p.color(currentPalette[0]);
        bgColor.setAlpha(230); // Make background slightly opaque
        p.background(bgColor);

        if (visibleSketches[cloudData.name]) {
          // Pass palette and noise offsets to the drawing function
          cloudData.drawFunction(p, currentPalette, noiseOffsetX, noiseOffsetY);
        } else {
          p.background(100); // Darker background when hidden
          p.fill(255);
          p.noStroke();
          p.textAlign(p.CENTER, p.CENTER);
          p.textSize(14);
          p.text("Sketch Hidden", p.width / 2, p.height / 2);
        }
      }

      p.myCustomRedraw = function() {
        regenerateParameters(); // Get new seeds and palette
        drawSketch(); // Redraw with new parameters
      };

      p.toggleVisibility = function() {
        isVisible = !isVisible;
        visibleSketches[cloudData.name] = isVisible;
        drawSketch(); // Redraw to show/hide
      };
    };
  }

  function addSketchToGrid(cloudData) {
    const gridContainer = document.getElementById("gridContainer");

    // Create the cell structure
    const sketchCell = document.createElement("div");
    sketchCell.classList.add("sketch-cell");

    const sketchContainer = document.createElement("div");
    sketchContainer.classList.add("sketch-container");
    const canvasId = \\\`canvas-\\\${cloudData.name.replace(/\\\\s+/g, '-')}\\\`; // Ensure valid ID
    sketchContainer.innerHTML = \\\`<div id="\\\${canvasId}"></div>\\\`; // Div for p5 to attach to

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    const toggleButton = document.createElement("button");
    toggleButton.textContent = \\\`\\\${cloudData.name}\\\`; // Just the name on the button
    toggleButton.title = \\\`Toggle \\\${cloudData.name} visibility\\\`; // Tooltip
    toggleButton.addEventListener("click", () => {
      sketchInstances[cloudData.name].toggleVisibility();
    });
    buttonContainer.appendChild(toggleButton);

    // Assemble the cell
    sketchCell.appendChild(sketchContainer);
    sketchCell.appendChild(buttonContainer);
    gridContainer.appendChild(sketchCell);

    // Create the p5 instance
    const cloudSketch = createCloudSketch(cloudData);
    // Use a global reference for color conversion in getRandomPalette
    if (!p5.instance) p5.instance = new p5();
    sketchInstances[cloudData.name] = new p5(cloudSketch, canvasId);
  }

  // Initialize
  cloudTypes.forEach(addSketchToGrid);

  document.getElementById("resetButton").addEventListener("click", () => {
    for (const cloudName in sketchInstances) {
      visibleSketches[cloudName] = true; // Ensure all are visible on reset
      sketchInstances[cloudName].myCustomRedraw();
    }
  });

  // --- Enhanced Cloud Drawing Functions ---

  function drawCirrus(p, palette, noiseX, noiseY) {
    p.noFill();
    let baseStroke = palette[1]; // Use a palette color for stroke
    for (let i = 0; i < 5 + p.random(5); i++) {
      let strokeCol = p.lerpColor(palette[1], palette[2], p.random(0.5)); // Vary color slightly
      strokeCol.setAlpha(p.random(80, 180));
      p.stroke(strokeCol);
      p.strokeWeight(p.random(0.5, 2));
      p.beginShape();
      let yOffset = p.random(p.height * 0.2, p.height * 0.8);
      let noiseFreq = p.random(0.01, 0.05);
      let amplitude = p.random(20, 50);
      for (let x = -10; x <= p.width + 10; x += 5) {
        let noiseVal = p.noise(x * noiseFreq + noiseX, i * 0.1 + noiseY);
        let y = yOffset + p.map(noiseVal, 0, 1, -amplitude, amplitude);
        p.curveVertex(x, y); // Use curveVertex for smoother lines
      }
      p.endShape();
    }
  }

  function drawCirrostratus(p, palette, noiseX, noiseY) {
    // Faint, uniform layer
    let layerColor = p.color(palette[2]); // Use a light palette color
    layerColor.setAlpha(p.random(30, 70));
    p.noStroke();
    p.fill(layerColor);
    p.rect(0, 0, p.width, p.height);

    // Optional: Subtle sun/moon halo
    if (p.random() > 0.5) {
        let haloColor = p.color(palette[3]);
        haloColor.setAlpha(p.random(40, 80));
        p.fill(haloColor);
        let haloSize = p.width * p.random(0.4, 0.7);
        let sunX = p.width * p.random(0.3, 0.7);
        let sunY = p.height * p.random(0.3, 0.7);
        p.ellipse(sunX, sunY, haloSize, haloSize);
    }
  }

 function drawCirrocumulus(p, palette, noiseX, noiseY) {
    p.noStroke();
    let numClouds = 30 + p.random(40);
    let baseSize = 5;
    let sizeVariation = 10;
    let noiseScale = 0.05; // Controls the clustering

    for (let i = 0; i < numClouds; i++) {
        // Use noise to cluster the dots more organically
        let x = p.width * p.noise(i * 0.1 + noiseX, noiseY);
        let y = p.height * p.noise(noiseX, i * 0.1 + noiseY);

        let size = baseSize + p.random(sizeVariation);
        let cloudColor = p.lerpColor(palette[2], palette[3], p.random(0.6)); // Mix light colors
        cloudColor.setAlpha(p.random(100, 220));
        p.fill(cloudColor);
        p.ellipse(x, y, size, size * p.random(0.8, 1.2)); // Slightly irregular shapes
    }
 }

 function drawAltostratus(p, palette, noiseX, noiseY) {
    p.noStroke();
    // Draw multiple translucent layers
    for(let i = 0; i < 5; i++) {
        let layerColor = p.lerpColor(palette[1], palette[4], p.random(1)); // Mix mid-range colors
        layerColor.setAlpha(p.random(20, 50));
        p.fill(layerColor);
        // Use noise to create uneven layering
        p.beginShape();
        for(let x = 0; x <= p.width; x+= 20) {
             let yNoise = p.noise(x * 0.01 + noiseX, i * 0.2 + noiseY);
             let y = p.map(yNoise, 0, 1, -p.height * 0.3, p.height * 1.3);
             p.vertex(x, y);
        }
        p.vertex(p.width, p.height);
        p.vertex(0, p.height);
        p.endShape(p.CLOSE);
    }
     // Dim sun/moon effect (optional)
    if (p.random() > 0.7) {
        let sunColor = p.color(palette[3]);
        sunColor.setAlpha(p.random(30, 60));
        p.fill(sunColor);
        let sunSize = p.width * p.random(0.1, 0.2);
        p.ellipse(p.width / 2 + p.random(-30, 30), p.height / 2 + p.random(-30, 30), sunSize, sunSize);
    }
 }


function drawAltocumulus(p, palette, noiseX, noiseY) {
    p.noStroke();
    let numPuffs = 15 + p.random(15);
    let noiseScale = 0.03;
    let puffBaseSize = 20;
    let puffVar = 15;

    for (let i = 0; i < numPuffs; i++) {
        let puffX = p.width * p.noise(i * 0.15 + noiseX, noiseY + 10);
        let puffY = p.height * p.noise(noiseX + 10, i * 0.15 + noiseY);

        let puffSize = puffBaseSize + p.random(-puffVar/2, puffVar);

        // Draw multiple ellipses per puff for texture
        for (let j = 0; j < 5; j++) {
            let offsetX = p.random(-puffSize * 0.3, puffSize * 0.3);
            let offsetY = p.random(-puffSize * 0.3, puffSize * 0.3);
            let detailSize = puffSize * p.random(0.5, 0.8);

            let puffColor = p.lerpColor(palette[2], palette[3], p.random(0.8));
            let shadowColor = p.lerpColor(palette[1], palette[4], p.random(0.5)); // Cooler/darker shadow

            // Base puff color
            puffColor.setAlpha(p.random(150, 230));
            p.fill(puffColor);
            p.ellipse(puffX + offsetX, puffY + offsetY, detailSize, detailSize * p.random(0.8, 1.2));

            // Subtle shadow underneath
            if (j < 2) { // Fewer shadows
                 shadowColor.setAlpha(p.random(30, 80));
                 p.fill(shadowColor);
                 p.ellipse(puffX + offsetX + 2, puffY + offsetY + 3, detailSize * 0.9, detailSize * 0.9);
            }
        }
    }
}

function drawCumulonimbus(p, palette, noiseX, noiseY) {
    let baseColor = p.lerpColor(palette[1], palette[4], 0.7); // Darker base from palette
    let highlightColor = p.lerpColor(palette[2], palette[3], 0.5);

    p.noStroke();

    // Dark base
    baseColor.setAlpha(p.random(180, 240));
    p.fill(baseColor);
    let baseY = p.height * p.random(0.6, 0.8);
    p.rect(0, baseY, p.width, p.height - baseY);

    // Main towering shape using noise
    let noiseScale = 0.02;
    let amplitude = p.width * 0.4;
    highlightColor.setAlpha(255);
    p.fill(highlightColor);

    p.beginShape();
    let topY = p.height * p.random(0.1, 0.3);
    // Left edge
    for (let y = baseY; y > topY; y -= 5) {
        let xNoise = p.noise(y * noiseScale + noiseX, noiseY);
        let x = p.width * 0.5 - amplitude * p.map(y, baseY, topY, 0.2, 1) * p.map(xNoise, 0, 1, 0.5, 1.5);
        p.vertex(x, y);
    }
    // Top anvil shape (wider)
    let anvilWidth = amplitude * p.random(1.2, 1.8);
    for (let x = p.width * 0.5 - anvilWidth/2; x < p.width * 0.5 + anvilWidth/2; x += 10) {
         let yNoise = p.noise(x * noiseScale * 2 + noiseX + 20, noiseY + 30);
         let y = topY + p.map(yNoise, 0, 1, -15, 15);
         p.vertex(x, y);
    }
    // Right edge
    for (let y = topY; y < baseY; y += 5) {
        let xNoise = p.noise(y * noiseScale + noiseX + 10, noiseY + 10);
        let x = p.width * 0.5 + amplitude * p.map(y, topY, baseY, 1, 0.2) * p.map(xNoise, 0, 1, 0.5, 1.5);
        p.vertex(x, y);
    }
    p.endShape(p.CLOSE);

    // Optional lightning
    if (p.random() < 0.15) {
        p.stroke(255, 255, 0, 200); // Yellowish
        p.strokeWeight(p.random(1, 3));
        let startX = p.random(p.width * 0.3, p.width * 0.7);
        let startY = p.random(baseY, p.height * 0.9);
        let endX = startX + p.random(-20, 20);
        let endY = p.height + 10;
        p.line(startX, startY, endX, endY);
        // Add jaggedness
        for(let k=0; k < 3; k++) {
             let midX = p.lerp(startX, endX, p.random(0.3, 0.7));
             let midY = p.lerp(startY, endY, p.random(0.3, 0.7));
             p.line(startX, startY, midX + p.random(-15, 15), midY);
             startX = midX + p.random(-15, 15);
             startY = midY;
        }
         p.line(startX, startY, endX, endY);

    }
}

function drawCumulus(p, palette, noiseX, noiseY) {
    p.noStroke();
    let numPuffs = 5 + p.random(4);
    let clusterCenterX = p.width / 2 + p.random(-p.width * 0.2, p.width * 0.2);
    let clusterCenterY = p.height * 0.6 + p.random(-p.height * 0.1, p.height * 0.1);
    let baseSize = 30 + p.random(20);

    let baseColor = p.lerpColor(palette[2], palette[3], 0.3); // Light, bright base
    let shadowColor = p.lerpColor(palette[1], palette[0], 0.5); // Cooler shadow

    for (let i = 0; i < numPuffs; i++) {
        let angle = p.random(p.TWO_PI);
        let radius = p.random(baseSize * 0.5);
        let puffX = clusterCenterX + p.cos(angle) * radius;
        let puffY = clusterCenterY + p.sin(angle) * radius * 0.8 - i * 5; // Stack slightly
        let puffSize = baseSize * p.random(0.7, 1.3);

        // Draw shadow first
        shadowColor.setAlpha(p.random(40, 90));
        p.fill(shadowColor);
        p.ellipse(puffX + 3, puffY + 4, puffSize, puffSize * 0.9); // Offset shadow

        // Draw main puff
        baseColor.setAlpha(p.random(200, 255));
        p.fill(baseColor);
        p.ellipse(puffX, puffY, puffSize, puffSize);
    }
}

function drawStratus(p, palette, noiseX, noiseY) {
    p.noStroke();
    let numLayers = 5 + p.random(5);
    let baseColor = p.lerpColor(palette[1], palette[4], 0.5); // Grayish mid-tone

    for (let i = 0; i < numLayers; i++) {
        let layerColor = p.lerpColor(baseColor, palette[2], p.random(0.5)); // Vary brightness
        layerColor.setAlpha(p.random(50, 100));
        p.fill(layerColor);

        let yPos = p.map(i, 0, numLayers, p.height * 0.2, p.height * 0.9);
        let noiseFreq = 0.005 + p.random(0.005);
        let amplitude = 10 + p.random(15);

        p.beginShape();
        for (let x = -10; x <= p.width + 10; x += 10) {
            let noiseVal = p.noise(x * noiseFreq + noiseX + i * 10, noiseY + i * 5);
            let y = yPos + p.map(noiseVal, 0, 1, -amplitude, amplitude);
            p.vertex(x, y);
        }
         // Create a thick band
        p.vertex(p.width + 10, yPos + amplitude + 20);
        p.vertex(-10, yPos + amplitude + 20);
        p.endShape(p.CLOSE);
    }
}

function drawNimbostratus(p, palette, noiseX, noiseY) {
    // Dark, uniform background layers
    let baseColor = p.lerpColor(palette[0], palette[4], 0.8); // Very dark base
    for(let i=0; i< 3; i++) {
        let layerCol = p.lerpColor(baseColor, palette[1], p.random(0.4));
        layerCol.setAlpha(p.random(100, 180));
        p.fill(layerCol);
        p.rect(0, i * p.height/3, p.width, p.height/3 + 5); // Overlapping rects
    }


    // Rain streaks
    let rainColor = p.color(palette[2]); // Lighter color for contrast
    rainColor.setAlpha(p.random(70, 150));
    p.stroke(rainColor);
    p.strokeWeight(p.random(0.5, 1.5));
    let numStreaks = 100 + p.random(100);
    let angle = p.random(-0.1, 0.1); // Slight slant to rain

    for (let i = 0; i < numStreaks; i++) {
        let x = p.random(-10, p.width + 10);
        let y = p.random(-10, p.height * 0.8); // Start rain higher up
        let len = p.random(10, 30);
        p.line(x, y, x + len * angle, y + len);
    }
}


<\/script> </body> </html>`])), renderHead());
}, "/home/matsu/Desktop/jy/src/pages/sketches/2025/250327-cloud_works_bento2_5.astro", void 0);

const $$file = "/home/matsu/Desktop/jy/src/pages/sketches/2025/250327-cloud_works_bento2_5.astro";
const $$url = "/sketches/2025/250327-cloud_works_bento2_5";

const __vite_glob_0_21 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$250327CloudWorksBento25,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { __vite_glob_0_21 as _ };
