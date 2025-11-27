/**
 * @fileoverview Webcam Demo Sketch - Demonstrates P5WebcamManager usage
 * @description Creates a demo sketch with multiple webcam instances in a CSS grid layout.
 * Each instance can have independent settings and canvas sizes.
 * 
 * @author jy
 * @date 2025-11-25
 * 
 * @example
 * // Basic usage in dailies.astro:
 * import { createWebcamDemoSketch } from "/dailies/webcam-demo.js";
 * 
 * window.setup = function() {
 *   const sketch = createWebcamDemoSketch({ width: 800, height: 600 });
 *   sketch.setup();
 * };
 * 
 * window.draw = function() {
 *   sketch.draw();
 * };
 */

import { P5WebcamManager } from "./WebcamManager.js";

/**
 * Creates a webcam demo sketch with multiple instances
 * 
 * @param {Object} config - Configuration object
 * @param {number} config.width - Main container width
 * @param {number} config.height - Main container height
 * @param {boolean} [config.debug=false] - Enable debug mode
 * 
 * @returns {Object} Sketch object with setup, draw, and control methods
 */
export function createWebcamDemoSketch(config) {
    const managers = [];
    let isInitialized = false;
    let gui = null;

    // Default configuration
    const defaultConfig = {
        width: config.width || 1200,
        height: config.height || 800,
        debug: config.debug || true,
    };

    // Calculate layout dimensions
    // Left column: 60% width, 2 rows (50% each)
    // Right column: 40% width, 1 row (100%)
    const leftColWidth = Math.floor(defaultConfig.width * 0.6);
    const rightColWidth = defaultConfig.width - leftColWidth;
    const rowHeight = Math.floor(defaultConfig.height / 2);

    /**
     * Initialize the sketch
     * Creates multiple P5WebcamManager instances
     */
    async function setup() {
        // Instance 1: Main webcam canvas (left column, top row)
        const manager1 = new P5WebcamManager(leftColWidth, rowHeight, {
            flipHorizontal: true, // Mirror for natural feel
            brightness: 1.0,
            contrast: 1.0,
            saturation: 1.0,
        });

        // Instance 2: Smaller preview (optional, can be added later)
        // For now, we'll use just one instance as specified

        managers.push(manager1);


        // const manager3 = new P5WebcamManager(leftColWidth, rowHeight, {
        //     flipHorizontal: true, // Mirror for natural feel
        //     brightness: 1.0,
        //     contrast: 1.0,
        //     saturation: 1.0,
        // });

        // managers.push(manager3);

        // Initialize all managers
        const initPromises = managers.map(manager => manager.init());
        await Promise.all(initPromises);

        // Position canvases for CSS grid layout
        managers.forEach((manager, index) => {
            const canvas = manager.getCanvas();
            if (canvas && canvas.elt) {
                canvas.elt.id = `webcam-canvas-${index}`;
                canvas.elt.style.gridColumn = index === 0 ? '1' : '2';
                canvas.elt.style.gridRow = index === 0 ? '1' : '2';
            }
        });

        isInitialized = true;

        if (defaultConfig.debug) {
            console.log('WebcamDemo: Initialized', managers.length, 'manager(s)');
        }
    }

    /**
     * Draw loop - renders all webcam managers
     */
    function draw() {
        if (!isInitialized) return;

        clear()

        managers.forEach(manager => {
            if (manager.isWebcamReady()) {
                manager.draw();
            }
        });
    }

    /**
     * Setup GUI controls using lil-gui (if available)
     * 
     * @param {Object} guiInstance - lil-gui instance
     */
    function setupGUI(guiInstance) {
        if (!guiInstance || managers.length === 0) return;

        gui = guiInstance;

        // Create folder for each manager
        managers.forEach((manager, index) => {
            const folder = gui.addFolder(`Webcam ${index + 1}`);
            const settings = manager.getSettings();

            // Basic Settings
            const basicFolder = folder.addFolder('Basic Settings');
            basicFolder.add(settings, 'flipHorizontal').name('Flip Horizontal').onChange(() => {
                manager.setFlipHorizontal(settings.flipHorizontal);
            });
            basicFolder.add(settings, 'flipVertical').name('Flip Vertical').onChange(() => {
                manager.setFlipVertical(settings.flipVertical);
            });
            basicFolder.add(settings, 'mirror').name('Mirror').onChange(() => {
                manager.setMirror(settings.mirror);
            });

            // Image Processing
            const imageFolder = folder.addFolder('Image Processing');
            imageFolder.add(settings, 'brightness', 0, 2, 0.1).name('Brightness').onChange(() => {
                manager.setBrightness(settings.brightness);
            });
            imageFolder.add(settings, 'contrast', 0, 2, 0.1).name('Contrast').onChange(() => {
                manager.setContrast(settings.contrast);
            });
            imageFolder.add(settings, 'saturation', 0, 2, 0.1).name('Saturation').onChange(() => {
                manager.setSaturation(settings.saturation);
            });
            imageFolder.add(settings, 'hue', 0, 360, 1).name('Hue Shift').onChange(() => {
                manager.setHue(settings.hue);
            });

            // Transformations
            const transformFolder = folder.addFolder('Transformations');
            transformFolder.add(settings, 'zoom', 0.1, 5, 0.1).name('Zoom').onChange(() => {
                manager.setZoom(settings.zoom);
            });
            transformFolder.add(settings, 'rotate', 0, 360, 1).name('Rotate').onChange(() => {
                manager.setRotate(settings.rotate);
            });
        });
    }

    /**
     * Create HTML control panels
     * Alternative to GUI library - creates native HTML controls
     */
    function createHTMLControls(containerId) {
        const container = document.getElementById(containerId);
        if (!container || managers.length === 0) return;

        managers.forEach((manager, index) => {
            const panel = document.createElement('div');
            panel.className = 'webcam-controls';
            panel.id = `webcam-controls-${index}`;
            panel.style.gridColumn = '2';
            panel.style.gridRow = '1 / -1';
            panel.style.padding = '1rem';
            panel.style.background = 'rgba(0, 0, 0, 0.8)';
            panel.style.color = 'white';
            panel.style.overflowY = 'auto';

            const title = document.createElement('h3');
            title.textContent = `Webcam ${index + 1} Controls`;
            panel.appendChild(title);

            // Basic Settings
            const basicSection = createControlSection('Basic Settings', panel);
            createToggleControl(basicSection, 'Flip Horizontal', manager.getSettings().flipHorizontal, (val) => {
                manager.setFlipHorizontal(val);
            });
            createToggleControl(basicSection, 'Flip Vertical', manager.getSettings().flipVertical, (val) => {
                manager.setFlipVertical(val);
            });
            createToggleControl(basicSection, 'Mirror', manager.getSettings().mirror, (val) => {
                manager.setMirror(val);
            });

            // Image Processing
            const imageSection = createControlSection('Image Processing', panel);
            createSliderControl(imageSection, 'Brightness', 0, 2, 0.1, manager.getSettings().brightness, (val) => {
                manager.setBrightness(val);
            });
            createSliderControl(imageSection, 'Contrast', 0, 2, 0.1, manager.getSettings().contrast, (val) => {
                manager.setContrast(val);
            });
            createSliderControl(imageSection, 'Saturation', 0, 2, 0.1, manager.getSettings().saturation, (val) => {
                manager.setSaturation(val);
            });
            createSliderControl(imageSection, 'Hue', 0, 360, 1, manager.getSettings().hue, (val) => {
                manager.setHue(val);
            });

            // Transformations
            const transformSection = createControlSection('Transformations', panel);
            createSliderControl(transformSection, 'Zoom', 0.1, 5, 0.1, manager.getSettings().zoom, (val) => {
                manager.setZoom(val);
            });
            createSliderControl(transformSection, 'Rotate', 0, 360, 1, manager.getSettings().rotate, (val) => {
                manager.setRotate(val);
            });

            container.appendChild(panel);
        });
    }

    /**
     * Helper: Create a control section
     */
    function createControlSection(title, parent) {
        const section = document.createElement('div');
        section.style.marginBottom = '1.5rem';

        const heading = document.createElement('h4');
        heading.textContent = title;
        heading.style.marginBottom = '0.5rem';
        heading.style.fontSize = '0.9rem';
        heading.style.textTransform = 'uppercase';
        heading.style.opacity = '0.7';

        section.appendChild(heading);
        parent.appendChild(section);

        return section;
    }

    /**
     * Helper: Create a toggle control
     */
    function createToggleControl(parent, label, initialValue, onChange) {
        const wrapper = document.createElement('div');
        wrapper.style.marginBottom = '0.75rem';
        wrapper.style.display = 'flex';
        wrapper.style.justifyContent = 'space-between';
        wrapper.style.alignItems = 'center';

        const labelEl = document.createElement('label');
        labelEl.textContent = label;
        labelEl.style.fontSize = '0.85rem';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = initialValue;
        checkbox.addEventListener('change', (e) => {
            onChange(e.target.checked);
        });

        wrapper.appendChild(labelEl);
        wrapper.appendChild(checkbox);
        parent.appendChild(wrapper);
    }

    /**
     * Helper: Create a slider control
     */
    function createSliderControl(parent, label, min, max, step, initialValue, onChange) {
        const wrapper = document.createElement('div');
        wrapper.style.marginBottom = '0.75rem';

        const labelWrapper = document.createElement('div');
        labelWrapper.style.display = 'flex';
        labelWrapper.style.justifyContent = 'space-between';
        labelWrapper.style.marginBottom = '0.25rem';

        const labelEl = document.createElement('label');
        labelEl.textContent = label;
        labelEl.style.fontSize = '0.85rem';

        const valueEl = document.createElement('span');
        valueEl.textContent = initialValue.toFixed(step < 1 ? 1 : 0);
        valueEl.style.fontSize = '0.85rem';
        valueEl.style.opacity = '0.8';

        labelWrapper.appendChild(labelEl);
        labelWrapper.appendChild(valueEl);

        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = min;
        slider.max = max;
        slider.step = step;
        slider.value = initialValue;
        slider.style.width = '100%';

        slider.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            valueEl.textContent = value.toFixed(step < 1 ? 1 : 0);
            onChange(value);
        });

        wrapper.appendChild(labelWrapper);
        wrapper.appendChild(slider);
        parent.appendChild(wrapper);
    }

    /**
     * Resize all managers
     */
    function resize(width, height) {
        defaultConfig.width = width;
        defaultConfig.height = height;

        const leftColWidth = Math.floor(width * 0.6);
        const rowHeight = Math.floor(height / 2);

        if (managers.length > 0) {
            managers[0].resize(leftColWidth, rowHeight);
        }
    }

    /**
     * Clean up resources
     */
    function dispose() {
        managers.forEach(manager => manager.dispose());
        managers.length = 0;
        isInitialized = false;
    }

    /**
     * Get all managers
     */
    function getManagers() {
        return [...managers];
    }

    // Return public API
    return {
        setup,
        draw,
        setupGUI,
        createHTMLControls,
        resize,
        dispose,
        getManagers,
        isInitialized: () => isInitialized,
    };
}

