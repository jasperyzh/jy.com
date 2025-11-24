/**
 * Simple Grid Sketch - Grid-based noise pattern
 * @param {p5} p - p5 instance
 * @param {Object} config - Configuration object
 * @returns {Object} Sketch object with setup, draw, and exportSvg methods
 */
export function createSimpleGridSketch(p, config) {
  let zOff = 0;

  const sketch = {
    setup: () => {
      p.createCanvas(config.width, config.height);
      p.noStroke();
    },

    draw: () => {
      if (config.isPaused) return;

      p.background(255);
      p.fill(0);

      const cols = Math.floor(p.width / config.gridSize);
      const rows = Math.floor(p.height / config.gridSize);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * config.gridSize;
          const y = j * config.gridSize;

          // Noise based on position and time
          const n = p.noise(i * config.noiseScale, j * config.noiseScale, zOff);

          // Map noise to circle size
          const d = config.gridSize * config.dotSize * n;

          // Center the dot
          const cx = x + config.gridSize / 2;
          const cy = y + config.gridSize / 2;

          p.circle(cx, cy, d);
        }
      }

      zOff += config.animSpeed;
    },

    exportSvg: (exportSize = "current") => {
      const svgSketch = (p) => {
        p.setup = () => {
          let w, h;

          if (exportSize === "a4") {
            w = 794;
            h = 1123;
          } else {
            w = config.width;
            h = config.height;
          }

          p.createCanvas(w, h, p.SVG);
          p.noLoop();

          p.background(255);
          p.fill(0);
          p.noStroke();

          const cols = Math.floor(w / config.gridSize);
          const rows = Math.floor(h / config.gridSize);

          for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
              const x = i * config.gridSize;
              const y = j * config.gridSize;
              const n = p.noise(i * config.noiseScale, j * config.noiseScale, 0);
              const d = config.gridSize * config.dotSize * n;
              p.circle(x + config.gridSize / 2, y + config.gridSize / 2, d);
            }
          }

          p.save("daily_sketch.svg");

          // Cleanup: Remove the SVG element created by p5
          setTimeout(() => {
            p.remove();
          }, 100);
        };
      };

      new p5(svgSketch);
    },
  };

  return sketch;
}

