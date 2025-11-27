/**
 * @fileoverview Dot Matrix Sketch with Hatch Fill Support
 * @description Creates a flexible dot matrix display sketch using p5.js in global mode.
 * The sketch simulates an OLED-style dot matrix display (based on 128x64 OLED resolution)
 * with Perlin noise animation and optional hatch fill rendering.
 * 
 * @author jy
 * @date 2025-11-25
 * 
 * @example
 * // Basic usage:
 * const config = {
 *   width: 1024,
 *   height: 768,
 *   matrixPreset: "64x64",
 *   theme: "milk_transparent",
 *   noiseScale: 0.05,
 *   animationSpeed: 0.002
 * };
 * const sketch = createDotMatrixSketch(config);
 * sketch.init(PixelDisplay, HatchFill);
 * sketch.setup();
 * 
 * @example
 * // Using custom matrix dimensions:
 * const config = {
 *   width: 1024,
 *   height: 768,
 *   matrixWidth: 48,
 *   matrixHeight: 32,
 *   theme: "amber"
 * };
 * const sketch = createDotMatrixSketch(config);
 */

/**
 * Matrix presets based on 128x64 OLED resolution
 * These presets represent common OLED display resolutions and their common divisors
 */
const MATRIX_PRESETS = {
    "128x64": { width: 128, height: 64 },
    "64x64": { width: 64, height: 64 },
    "48x48": { width: 48, height: 48 },
    "32x32": { width: 32, height: 32 },
    "16x16": { width: 16, height: 16 },
    "8x8": { width: 8, height: 8 },
    "4x4": { width: 4, height: 4 },
    "2x2": { width: 2, height: 2 },
};

/**
 * Maximum matrix dimensions (128x128 constraint)
 */
const MAX_MATRIX_WIDTH = 128;
const MAX_MATRIX_HEIGHT = 128;

/**
 * Creates a simplified dot matrix sketch (Global Mode)
 * 
 * @param {Object} config - Configuration object
 * @param {string} config.title - Title of the sketch
 * @param {number} config.width - Canvas width in pixels
 * @param {number} config.height - Canvas height in pixels
 * @param {string|number} [config.matrixPreset] - Matrix preset name (e.g., "64x64", "128x64") or legacy matrixSize number for square matrices
 * @param {number} [config.matrixWidth] - Custom matrix width (overrides preset, max 128)
 * @param {number} [config.matrixHeight] - Custom matrix height (overrides preset, max 128)
 * @param {string} [config.theme="milk_transparent"] - Color theme name
 * @param {number} [config.noiseScale=0.05] - Base noise scale (0.01-0.8)
 * @param {number} [config.dotScaleFactor=2.0] - Base dot scale factor (0.5-3.0)
 * @param {number} [config.animationSpeed=0.002] - Base animation speed (0.001-0.1)
 * @param {number} [config.dotNoiseInfluence=1.0] - Influence of noise on dot size (0.0-3.0)
 * @param {boolean} [config.useColorThemeShading=false] - Enable color theme shading
 * @param {number} [config.shadeSteps=2] - Number of shade steps for color theme shading
 * @param {boolean} [config.isPaused=false] - Pause animation
 * @param {boolean} [config.useHatchFill=false] - Use hatch fill rendering instead of solid fill
 * @param {boolean} [config.hatchUseGlobalDensity=true] - Use global density for hatch fill
 * @param {number} [config.hatchDensity=0.05] - Hatch fill density (0.01-1.0)
 * @param {number} [config.hatchGlobalSpacing=3] - Global spacing for hatch fill in pixels
 * @param {number} [config.hatchAngle=45] - Hatch fill angle in degrees (0-180)
 * @param {boolean} [config.hatchCrossHatch=false] - Enable cross hatch pattern
 * 
 * @returns {Object} Sketch object with setup, init, draw, resize, exportSvg, getDotDisplay, and updateColorTheme methods
 */
export function createDotMatrixSketch(config) {
    const GR__ = 1.618; // Golden ratio constant

    let PixelDisplay, HatchFill;
    let PIXEL_SCALE_X;
    let PIXEL_SCALE_Y;
    let PIXEL_GAP;
    let MATRIX_WIDTH;
    let MATRIX_HEIGHT;
    let dotDisplay;
    let zOffset = 0;

    const colorThemes = {
        "2a": { off: [13, 13, 13], on: [204, 165, 69], stroke: [13, 13, 13] },
        milk_transparent: {
            off: "transparent" /* 227, 237, 239] */,
            on: [13, 13, 13],
            stroke: [13, 13, 13],
        },
        green: {
            off: [13, 13, 13],
            on: [100, 255, 100],
            stroke: [150, 255, 150],
        },
        amber: { off: [40, 20, 0], on: [255, 180, 0], stroke: [255, 200, 100] },
        white: {
            off: [40, 40, 40],
            on: [220, 220, 220],
            stroke: [255, 255, 255],
        },
        blue: { off: [10, 20, 40], on: [80, 160, 255], stroke: [120, 180, 255] },
    };

    /**
     * Calculate matrix dimensions from config
     * Supports presets, custom dimensions, or legacy matrixSize
     * 
     * @returns {{width: number, height: number}} Matrix dimensions
     */
    function calculateMatrixDimensions() {
        // Priority 1: Custom matrixWidth and matrixHeight (0 means "not set", use preset)
        if (
            config.matrixWidth !== undefined &&
            config.matrixHeight !== undefined &&
            config.matrixWidth > 0 &&
            config.matrixHeight > 0
        ) {
            return {
                width: Math.min(Math.max(2, Math.floor(config.matrixWidth)), MAX_MATRIX_WIDTH),
                height: Math.min(Math.max(2, Math.floor(config.matrixHeight)), MAX_MATRIX_HEIGHT),
            };
        }

        // Priority 2: Matrix preset
        if (config.matrixPreset && MATRIX_PRESETS[config.matrixPreset]) {
            return MATRIX_PRESETS[config.matrixPreset];
        }

        // Priority 3: Legacy matrixSize (square matrix)
        if (config.matrixSize !== undefined) {
            const size = Math.min(Math.max(2, Math.floor(config.matrixSize)), MAX_MATRIX_WIDTH);
            return { width: size, height: size };
        }

        // Priority 4: Calculate from canvas dimensions (responsive)
        // Calculate appropriate matrix size based on canvas dimensions
        // Aim for a reasonable pixel scale (not too small, not too large)
        const targetPixelScale = 8; // Target 8 pixels per matrix cell
        let calcWidth = Math.floor(config.width / targetPixelScale);
        let calcHeight = Math.floor(config.height / targetPixelScale);

        // Clamp to max dimensions
        calcWidth = Math.min(Math.max(2, calcWidth), MAX_MATRIX_WIDTH);
        calcHeight = Math.min(Math.max(2, calcHeight), MAX_MATRIX_HEIGHT);

        // Round to nearest power of 2 for cleaner look (optional, but common for matrix displays)
        const roundToPowerOf2 = (n) => {
            if (n <= 2) return 2;
            if (n <= 4) return 4;
            if (n <= 8) return 8;
            if (n <= 16) return 16;
            if (n <= 32) return 32;
            if (n <= 64) return 64;
            return 128;
        };

        return {
            width: roundToPowerOf2(calcWidth),
            height: roundToPowerOf2(calcHeight),
        };
    }

    /**
     * Reset and recalculate sketch dimensions
     * Called when canvas size or matrix dimensions change
     */
    function resetSketch() {
        const matrixDims = calculateMatrixDimensions();
        MATRIX_WIDTH = matrixDims.width;
        MATRIX_HEIGHT = matrixDims.height;

        // Calculate pixel scales for both dimensions
        PIXEL_SCALE_X = config.width / MATRIX_WIDTH;
        PIXEL_SCALE_Y = config.height / MATRIX_HEIGHT;

        // Use the smaller scale to maintain aspect ratio, or use separate scales
        // For now, use separate scales to fill the canvas
        // PIXEL_SCALE is used for the gap calculation (using average)
        const avgPixelScale = (PIXEL_SCALE_X + PIXEL_SCALE_Y) / 2;
        PIXEL_GAP = avgPixelScale - avgPixelScale / Math.pow(GR__, 1);

        // Resize canvas to match config dimensions
        resizeCanvas(config.width, config.height);

        if (typeof PixelDisplay !== "undefined") {
            // PixelDisplay uses a single pixelScale, so we use the average
            dotDisplay = new PixelDisplay(
                MATRIX_WIDTH,
                MATRIX_HEIGHT,
                avgPixelScale,
                PIXEL_GAP
            );
            updateColorTheme();
        }
    }

    /**
     * Update color theme from config
     */
    function updateColorTheme() {
        if (!dotDisplay) return;
        const theme = colorThemes[config.theme];
        // Use global p5 functions for color (they're available globally)
        dotDisplay.setColors(
            Array.isArray(theme.off) ? color(...theme.off) : theme.off,
            Array.isArray(theme.on) ? color(...theme.on) : theme.on,
            Array.isArray(theme.stroke) ? color(...theme.stroke) : theme.stroke
        );
    }

    /**
     * Render hatch fill pattern
     * Uses the same calculation logic as PixelDisplay.render() but draws hatch lines instead
     */
    function renderHatchFill() {
        if (typeof HatchFill === "undefined" || !dotDisplay) return;

        // Create hatch fill instance
        const hatchFill = new HatchFill({
            density: config.hatchDensity,
            angle: config.hatchAngle,
            crossHatch: config.hatchCrossHatch,
            useGlobalDensity: config.hatchUseGlobalDensity,
            globalSpacing: config.hatchGlobalSpacing,
        });

        // Set stroke color and no fill (using global p5 functions)
        stroke(dotDisplay.colorOn);
        strokeWeight(1);
        noFill();

        // Use average pixel scale for calculations (matching PixelDisplay)
        const avgPixelScale = (PIXEL_SCALE_X + PIXEL_SCALE_Y) / 2;

        // Render each pixel with hatch fill
        for (let x = 0; x < dotDisplay.matrixWidth; x++) {
            for (let y = 0; y < dotDisplay.matrixHeight; y++) {
                const noiseVal = dotDisplay.pixelMatrix[x][y];
                if (noiseVal === 0) continue;

                // Calculate dot position and size (matching dotDisplay.render logic)
                const baseDotSize = avgPixelScale - dotDisplay.pixelGap;
                const maxDotSize = baseDotSize * config.dotScaleFactor;
                const minDotSize = lerp(maxDotSize, 0, config.dotNoiseInfluence);
                const scaledDotSize = map(noiseVal, 0, 1, minDotSize, maxDotSize);
                const offset = (avgPixelScale - scaledDotSize) / 2;

                // Calculate center position using actual pixel scales for positioning
                const cx = x * PIXEL_SCALE_X + offset + scaledDotSize / 2;
                const cy = y * PIXEL_SCALE_Y + offset + scaledDotSize / 2;
                const radius = scaledDotSize / 2;

                // Skip if radius is too small
                if (radius < 0.5) continue;

                // Generate hatch lines for this circle
                const hatchLines = hatchFill.fillCircle(cx, cy, radius);

                // Draw hatch lines
                if (hatchLines && hatchLines.length > 0) {
                    for (const lineSeg of hatchLines) {
                        if (
                            lineSeg &&
                            lineSeg.x1 !== undefined &&
                            lineSeg.y1 !== undefined &&
                            lineSeg.x2 !== undefined &&
                            lineSeg.y2 !== undefined
                        ) {
                            line(lineSeg.x1, lineSeg.y1, lineSeg.x2, lineSeg.y2);
                        }
                    }
                }
            }
        }
    }

    const sketch = {
        /**
         * Setup function - creates the canvas
         * Should be called after dependencies are loaded
         */
        setup: () => {
            if (typeof window !== "undefined") {
                const matrixDims = calculateMatrixDimensions();
                MATRIX_WIDTH = matrixDims.width;
                MATRIX_HEIGHT = matrixDims.height;

                // Calculate pixel scales
                PIXEL_SCALE_X = config.width / MATRIX_WIDTH;
                PIXEL_SCALE_Y = config.height / MATRIX_HEIGHT;
                const avgPixelScale = (PIXEL_SCALE_X + PIXEL_SCALE_Y) / 2;
                PIXEL_GAP = avgPixelScale - avgPixelScale / Math.pow(GR__, 0);

                // Create canvas with config dimensions
                createCanvas(config.width, config.height);
            }
        },

        /**
         * Initialize function - sets up dependencies and creates PixelDisplay
         * @param {Class} PixelDisplayClass - PixelDisplay class constructor
         * @param {Class} HatchFillClass - HatchFill class constructor
         */
        init: (PixelDisplayClass, HatchFillClass) => {
            // Initialize dependencies
            PixelDisplay = PixelDisplayClass;
            HatchFill = HatchFillClass;

            // Calculate matrix dimensions
            const matrixDims = calculateMatrixDimensions();
            MATRIX_WIDTH = matrixDims.width;
            MATRIX_HEIGHT = matrixDims.height;

            // Calculate pixel scales
            PIXEL_SCALE_X = config.width / MATRIX_WIDTH;
            PIXEL_SCALE_Y = config.height / MATRIX_HEIGHT;
            const avgPixelScale = (PIXEL_SCALE_X + PIXEL_SCALE_Y) / 2;
            PIXEL_GAP = avgPixelScale - avgPixelScale / Math.pow(GR__, 0);

            // Create PixelDisplay instance
            dotDisplay = new PixelDisplay(
                MATRIX_WIDTH,
                MATRIX_HEIGHT,
                avgPixelScale,
                PIXEL_GAP
            );
            updateColorTheme();
        },

        /**
         * Draw function - called every frame by p5.js
         * Updates noise values and renders the display
         */
        draw: () => {
            if (config.isPaused || !dotDisplay) return;

            clear();
            push();
            dotDisplay.clear();

            // Update noise values for each pixel
            for (let y = 0; y < dotDisplay.matrixHeight; y++) {
                for (let x = 0; x < dotDisplay.matrixWidth; x++) {
                    const noiseVal = noise(
                        x * config.noiseScale,
                        y * config.noiseScale,
                        zOffset
                    );
                    dotDisplay.setPixel(x, y, noiseVal);
                }
            }

            // Advance animation
            zOffset += config.animationSpeed || 0.002;

            // Render based on mode
            if (config.useHatchFill) {
                // Render with hatch fill
                renderHatchFill();
            } else {
                // Render with solid fill
                dotDisplay.render(0, 0, config);
            }
            pop();
        },

        /**
         * Resize the sketch canvas and recalculate matrix dimensions
         * @param {number} newWidth - New canvas width
         * @param {number} newHeight - New canvas height
         */
        resize: (newWidth, newHeight) => {
            config.width = newWidth;
            config.height = newHeight;
            resetSketch();
        },

        /**
         * Export the current sketch as SVG
         * @param {string} [exportSize="current"] - Export size (currently unused, reserved for future use)
         */
        exportSvg: (exportSize = "current") => {
            if (!dotDisplay) return;

            const avgPixelScale = (PIXEL_SCALE_X + PIXEL_SCALE_Y) / 2;

            const svgRenderer = (p) => {
                p.setup = () => {
                    // Use config dimensions for export
                    let w = config.width;
                    let h = config.height;

                    p.createCanvas(w, h, p.SVG);
                    p.noLoop();

                    p.background(200, 0);

                    if (config.useHatchFill && typeof HatchFill !== "undefined") {
                        // Export with hatch fill
                        const hatchFill = new HatchFill({
                            density: config.hatchDensity,
                            angle: config.hatchAngle,
                            crossHatch: config.hatchCrossHatch,
                            useGlobalDensity: config.hatchUseGlobalDensity,
                            globalSpacing: config.hatchGlobalSpacing,
                        });

                        p.stroke(dotDisplay.colorOn);
                        p.strokeWeight(1);
                        p.noFill();

                        const avgPixelScale = (PIXEL_SCALE_X + PIXEL_SCALE_Y) / 2;

                        for (let x = 0; x < dotDisplay.matrixWidth; x++) {
                            for (let y = 0; y < dotDisplay.matrixHeight; y++) {
                                const noiseVal = dotDisplay.pixelMatrix[x][y];
                                if (noiseVal === 0) continue;

                                // Calculate dot position and size
                                const baseDotSize = avgPixelScale - dotDisplay.pixelGap;
                                const maxDotSize = baseDotSize * config.dotScaleFactor;
                                const minDotSize = p.lerp(
                                    maxDotSize,
                                    0,
                                    config.dotNoiseInfluence
                                );
                                const scaledDotSize = p.map(
                                    noiseVal,
                                    0,
                                    1,
                                    minDotSize,
                                    maxDotSize
                                );
                                const offset = (avgPixelScale - scaledDotSize) / 2;

                                const cx = x * PIXEL_SCALE_X + offset + scaledDotSize / 2;
                                const cy = y * PIXEL_SCALE_Y + offset + scaledDotSize / 2;
                                const radius = scaledDotSize / 2;

                                // Generate hatch lines for this circle
                                const hatchLines = hatchFill.fillCircle(cx, cy, radius);

                                // Draw hatch lines as SVG
                                for (const lineSeg of hatchLines) {
                                    if (
                                        lineSeg &&
                                        lineSeg.x1 !== undefined &&
                                        lineSeg.y1 !== undefined &&
                                        lineSeg.x2 !== undefined &&
                                        lineSeg.y2 !== undefined
                                    ) {
                                        p.line(lineSeg.x1, lineSeg.y1, lineSeg.x2, lineSeg.y2);
                                    }
                                }
                            }
                        }
                    } else {
                        // Export with solid fill
                        p.noStroke();

                        for (let x = 0; x < dotDisplay.matrixWidth; x++) {
                            for (let y = 0; y < dotDisplay.matrixHeight; y++) {
                                const noiseVal = dotDisplay.pixelMatrix[x][y];
                                if (noiseVal === 0) continue;

                                let pixelColor;
                                if (!config.useColorThemeShading) {
                                    pixelColor = dotDisplay.colorOn;
                                } else {
                                    const shadeValue = p.floor(
                                        p.map(noiseVal, 0, 1, 0, config.shadeSteps)
                                    );
                                    if (shadeValue === 0) continue;
                                    const amount = shadeValue / (config.shadeSteps - 1);
                                    pixelColor = p.lerpColor(
                                        dotDisplay.colorOff,
                                        dotDisplay.colorOn,
                                        amount
                                    );
                                }

                                p.fill(pixelColor);

                                const avgPixelScale = (PIXEL_SCALE_X + PIXEL_SCALE_Y) / 2;
                                const baseDotSize = avgPixelScale - dotDisplay.pixelGap;
                                const maxDotSize = baseDotSize * config.dotScaleFactor;
                                const minDotSize = p.lerp(
                                    maxDotSize,
                                    0,
                                    config.dotNoiseInfluence
                                );
                                const scaledDotSize = p.map(
                                    noiseVal,
                                    0,
                                    1,
                                    minDotSize,
                                    maxDotSize
                                );
                                const offset = (avgPixelScale - scaledDotSize) / 2;

                                p.ellipseMode(p.CORNER);
                                p.ellipse(
                                    x * PIXEL_SCALE_X + offset,
                                    y * PIXEL_SCALE_Y + offset,
                                    scaledDotSize,
                                    scaledDotSize
                                );
                            }
                        }
                    }
                    p.save(config.title + ".svg");
                };
            };
            new p5(svgRenderer);
        },

        /**
         * Get the PixelDisplay instance
         * @returns {PixelDisplay|null} The PixelDisplay instance or null if not initialized
         */
        getDotDisplay: () => dotDisplay,

        /**
         * Update the color theme from config
         * Call this when config.theme changes
         */
        updateColorTheme: () => updateColorTheme(),

        /**
         * Get current matrix dimensions
         * @returns {{width: number, height: number}} Current matrix dimensions
         */
        getMatrixDimensions: () => ({
            width: MATRIX_WIDTH,
            height: MATRIX_HEIGHT,
        }),
    };

    return sketch;
}