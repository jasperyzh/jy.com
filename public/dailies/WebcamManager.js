/**
 * @fileoverview P5WebcamManager - Manages webcam input for p5.js sketches
 * @description Provides a comprehensive interface for webcam capture with image processing,
 * transformations, and settings management. Designed for use with p5.js in global mode.
 * 
 * @author jy
 * @date 2025-11-25
 * 
 * @example
 * // Basic usage:
 * const manager = new P5WebcamManager(640, 480);
 * manager.init();
 * // In p5.js draw loop:
 * manager.draw();
 * 
 * @example
 * // With configuration:
 * const config = {
 *   resolution: { width: 1280, height: 720 },
 *   frameRate: 30,
 *   flipHorizontal: true,
 *   brightness: 1.2
 * };
 * const manager = new P5WebcamManager(640, 480, config);
 * manager.init();
 */

/**
 * P5WebcamManager class for managing webcam capture and processing
 * 
 * @class P5WebcamManager
 */
export class P5WebcamManager {
    /**
     * Creates an instance of P5WebcamManager
     * 
     * @param {number} canvasWidth - Width of the canvas element
     * @param {number} canvasHeight - Height of the canvas element
     * @param {Object} [config={}] - Configuration object
     * @param {Object} [config.resolution] - Webcam resolution {width, height}
     * @param {number} [config.frameRate=30] - Target frame rate
     * @param {boolean} [config.flipHorizontal=false] - Flip horizontally
     * @param {boolean} [config.flipVertical=false] - Flip vertically
     * @param {boolean} [config.mirror=false] - Mirror effect (horizontal flip)
     * @param {number} [config.brightness=1.0] - Brightness multiplier (0.0-2.0)
     * @param {number} [config.contrast=1.0] - Contrast multiplier (0.0-2.0)
     * @param {number} [config.saturation=1.0] - Saturation multiplier (0.0-2.0)
     * @param {number} [config.hue=0] - Hue shift in degrees (0-360)
     * @param {number} [config.zoom=1.0] - Zoom level (0.1-5.0)
     * @param {number} [config.rotate=0] - Rotation in degrees (0-360)
     */
    constructor(canvasWidth, canvasHeight, config = {}) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        
        // Settings
        this.settings = {
            resolution: config.resolution || null, // null = use default
            frameRate: config.frameRate || 30,
            flipHorizontal: config.flipHorizontal || false,
            flipVertical: config.flipVertical || false,
            mirror: config.mirror || false,
            brightness: config.brightness !== undefined ? config.brightness : 1.0,
            contrast: config.contrast !== undefined ? config.contrast : 1.0,
            saturation: config.saturation !== undefined ? config.saturation : 1.0,
            hue: config.hue || 0,
            zoom: config.zoom !== undefined ? config.zoom : 1.0,
            rotate: config.rotate || 0,
        };
        
        // p5.js objects (will be set in init)
        this.capture = null;
        this.canvas = null;
        this.graphics = null; // Off-screen buffer for processing
        
        // State
        this.isInitialized = false;
        this.isReady = false;
        
        // Performance optimization: cache processed frame
        this.lastProcessedFrame = null;
        this.frameCacheTime = 0;
        this.cacheTimeout = 16; // ~60fps cache refresh
    }
    
    /**
     * Initialize the webcam capture and canvas
     * Must be called after p5.js is loaded and in setup() or after
     * 
     * @param {p5} [p] - p5 instance (optional, uses global p5 if not provided)
     * @returns {Promise<boolean>} Promise that resolves when webcam is ready
     */
    async init(p = null) {
        const p5 = p || window;
        
        try {
            // Create canvas
            this.canvas = p5.createCanvas(this.canvasWidth, this.canvasHeight);
            
            // Create off-screen graphics buffer for processing
            this.graphics = p5.createGraphics(this.canvasWidth, this.canvasHeight);
            
            // Create webcam capture
            const constraints = {
                video: {
                    width: this.settings.resolution?.width || { ideal: 1280 },
                    height: this.settings.resolution?.height || { ideal: 720 },
                    frameRate: { ideal: this.settings.frameRate }
                }
            };
            
            this.capture = p5.createCapture(p5.VIDEO, constraints);
            this.capture.elt.setAttribute('crossorigin', 'anonymous');
            this.capture.hide(); // Hide the default video element
            
            // Wait for video to be ready
            return new Promise((resolve) => {
                this.capture.elt.addEventListener('loadedmetadata', () => {
                    this.isReady = true;
                    this.isInitialized = true;
                    resolve(true);
                }, { once: true });
            });
        } catch (error) {
            console.error('P5WebcamManager: Failed to initialize webcam', error);
            this.isInitialized = false;
            return false;
        }
    }
    
    /**
     * Draw the processed webcam feed to the canvas
     * Call this in the p5.js draw() function
     * 
     * @param {p5} [p] - p5 instance (optional, uses global p5 if not provided)
     */
    draw(p = null) {
        if (!this.isReady || !this.capture || !this.canvas) return;
        
        const p5 = p || window;
        
        // Get current time for cache management
        const now = Date.now();
        const useCache = (now - this.frameCacheTime) < this.cacheTimeout && this.lastProcessedFrame;
        
        if (!useCache) {
            // Process frame in graphics buffer
            this.graphics.clear();
            this.graphics.push();
            
            // Apply transformations
            this.graphics.translate(this.canvasWidth / 2, this.canvasHeight / 2);
            
            // Apply rotation
            if (this.settings.rotate !== 0) {
                this.graphics.rotate(p5.radians(this.settings.rotate));
            }
            
            // Apply zoom
            if (this.settings.zoom !== 1.0) {
                this.graphics.scale(this.settings.zoom);
            }
            
            // Calculate aspect ratio and draw dimensions
            const videoRatio = this.capture.width / this.capture.height;
            const canvasRatio = this.canvasWidth / this.canvasHeight;
            
            let drawWidth = this.canvasWidth;
            let drawHeight = this.canvasHeight;
            
            if (videoRatio > canvasRatio) {
                drawWidth = this.canvasHeight * videoRatio;
            } else {
                drawHeight = this.canvasWidth / videoRatio;
            }
            
            // Apply flips before drawing
            let scaleX = 1;
            let scaleY = 1;
            
            if (this.settings.flipHorizontal || this.settings.mirror) {
                scaleX = -1;
            }
            if (this.settings.flipVertical) {
                scaleY = -1;
            }
            
            this.graphics.scale(scaleX, scaleY);
            
            // Draw video to graphics buffer
            this.graphics.image(
                this.capture,
                -drawWidth / 2,
                -drawHeight / 2,
                drawWidth,
                drawHeight
            );
            
            this.graphics.pop();
            
            // Apply color filters
            this.applyColorFilters(p5);
            
            // Cache the processed frame
            this.lastProcessedFrame = this.graphics.get();
            this.frameCacheTime = now;
        }
        
        // Draw cached or fresh frame to main canvas
        p5.image(this.lastProcessedFrame || this.graphics, 0, 0);
    }
    
    /**
     * Apply color filters (brightness, contrast, saturation, hue) to graphics buffer
     * Uses pixel manipulation for compatibility with both regular p5.js and SVG renderer
     * 
     * @param {p5} p5 - p5 instance
     * @private
     */
    applyColorFilters(p5) {
        // Check if any filters need to be applied
        const needsProcessing = 
            this.settings.brightness !== 1.0 ||
            this.settings.contrast !== 1.0 ||
            this.settings.saturation !== 1.0 ||
            this.settings.hue !== 0;
        
        if (!needsProcessing) return;
        
        // Use pixel manipulation for all filters (works with both regular and SVG renderer)
        this.graphics.loadPixels();
        const pixels = this.graphics.pixels;
        
        for (let i = 0; i < pixels.length; i += 4) {
            let r = pixels[i];
            let g = pixels[i + 1];
            let b = pixels[i + 2];
            
            // Apply brightness
            if (this.settings.brightness !== 1.0) {
                r = Math.max(0, Math.min(255, r * this.settings.brightness));
                g = Math.max(0, Math.min(255, g * this.settings.brightness));
                b = Math.max(0, Math.min(255, b * this.settings.brightness));
            }
            
            // Apply contrast
            if (this.settings.contrast !== 1.0) {
                // Contrast adjustment: multiply the difference from 128 (midpoint) by contrast factor
                // Then add back 128 to maintain the midpoint
                const contrastFactor = this.settings.contrast;
                r = Math.max(0, Math.min(255, (r - 128) * contrastFactor + 128));
                g = Math.max(0, Math.min(255, (g - 128) * contrastFactor + 128));
                b = Math.max(0, Math.min(255, (b - 128) * contrastFactor + 128));
            }
            
            // Apply saturation and hue (requires HSL conversion)
            if (this.settings.saturation !== 1.0 || this.settings.hue !== 0) {
                // Convert RGB to HSL for hue and saturation manipulation
                let hsl = this.rgbToHsl(r, g, b);
                
                // Apply hue shift
                if (this.settings.hue !== 0) {
                    hsl.h = (hsl.h + this.settings.hue) % 360;
                }
                
                // Apply saturation
                if (this.settings.saturation !== 1.0) {
                    hsl.s = Math.max(0, Math.min(100, hsl.s * this.settings.saturation));
                }
                
                // Convert back to RGB
                const rgb = this.hslToRgb(hsl.h, hsl.s, hsl.l);
                r = rgb.r;
                g = rgb.g;
                b = rgb.b;
            }
            
            // Update pixels
            pixels[i] = r;
            pixels[i + 1] = g;
            pixels[i + 2] = b;
        }
        
        this.graphics.updatePixels();
    }
    
    /**
     * Convert RGB to HSL
     * 
     * @param {number} r - Red (0-255)
     * @param {number} g - Green (0-255)
     * @param {number} b - Blue (0-255)
     * @returns {{h: number, s: number, l: number}} HSL values
     * @private
     */
    rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
        }
        
        return { h: h * 360, s: s * 100, l: l * 100 };
    }
    
    /**
     * Convert HSL to RGB
     * 
     * @param {number} h - Hue (0-360)
     * @param {number} s - Saturation (0-100)
     * @param {number} l - Lightness (0-100)
     * @returns {{r: number, g: number, b: number}} RGB values
     * @private
     */
    hslToRgb(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        
        let r, g, b;
        
        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };
            
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    }
    
    // ========== SETTER METHODS ==========
    
    /**
     * Set webcam resolution
     * Note: This may require reinitializing the capture
     * 
     * @param {number} width - Width in pixels
     * @param {number} height - Height in pixels
     */
    setResolution(width, height) {
        this.settings.resolution = { width, height };
        // Note: Actual resolution change would require recreating capture
        // For now, we just update the setting
    }
    
    /**
     * Set frame rate
     * 
     * @param {number} frameRate - Target frame rate
     */
    setFrameRate(frameRate) {
        this.settings.frameRate = frameRate;
        if (this.capture) {
            // Note: Changing frame rate on existing capture may not work
            // This is a limitation of the MediaStream API
        }
    }
    
    /**
     * Set flip horizontal
     * 
     * @param {boolean} flip - Flip horizontally
     */
    setFlipHorizontal(flip) {
        this.settings.flipHorizontal = flip;
        this.invalidateCache();
    }
    
    /**
     * Set flip vertical
     * 
     * @param {boolean} flip - Flip vertically
     */
    setFlipVertical(flip) {
        this.settings.flipVertical = flip;
        this.invalidateCache();
    }
    
    /**
     * Set mirror effect (same as flip horizontal)
     * 
     * @param {boolean} mirror - Enable mirror
     */
    setMirror(mirror) {
        this.settings.mirror = mirror;
        this.invalidateCache();
    }
    
    /**
     * Set brightness
     * 
     * @param {number} brightness - Brightness (0.0-2.0)
     */
    setBrightness(brightness) {
        this.settings.brightness = Math.max(0, Math.min(2.0, brightness));
        this.invalidateCache();
    }
    
    /**
     * Set contrast
     * 
     * @param {number} contrast - Contrast (0.0-2.0)
     */
    setContrast(contrast) {
        this.settings.contrast = Math.max(0, Math.min(2.0, contrast));
        this.invalidateCache();
    }
    
    /**
     * Set saturation
     * 
     * @param {number} saturation - Saturation (0.0-2.0)
     */
    setSaturation(saturation) {
        this.settings.saturation = Math.max(0, Math.min(2.0, saturation));
        this.invalidateCache();
    }
    
    /**
     * Set hue shift
     * 
     * @param {number} hue - Hue shift in degrees (0-360)
     */
    setHue(hue) {
        this.settings.hue = ((hue % 360) + 360) % 360;
        this.invalidateCache();
    }
    
    /**
     * Set zoom level
     * 
     * @param {number} zoom - Zoom (0.1-5.0)
     */
    setZoom(zoom) {
        this.settings.zoom = Math.max(0.1, Math.min(5.0, zoom));
        this.invalidateCache();
    }
    
    /**
     * Set rotation
     * 
     * @param {number} rotate - Rotation in degrees (0-360)
     */
    setRotate(rotate) {
        this.settings.rotate = ((rotate % 360) + 360) % 360;
        this.invalidateCache();
    }
    
    // ========== GETTER METHODS ==========
    
    /**
     * Get the p5.js capture object
     * 
     * @returns {p5.Element|null} Capture element
     */
    getCapture() {
        return this.capture;
    }
    
    /**
     * Get the p5.js canvas
     * 
     * @returns {p5.Renderer|null} Canvas element
     */
    getCanvas() {
        return this.canvas;
    }
    
    /**
     * Get current settings
     * 
     * @returns {Object} Settings object
     */
    getSettings() {
        return { ...this.settings };
    }
    
    /**
     * Get processed frame as p5.Image
     * 
     * @returns {p5.Image|null} Processed image
     */
    getProcessedFrame() {
        return this.lastProcessedFrame || this.graphics;
    }
    
    /**
     * Check if webcam is ready
     * 
     * @returns {boolean} True if ready
     */
    isWebcamReady() {
        return this.isReady;
    }
    
    /**
     * Invalidate frame cache (force reprocessing on next draw)
     * 
     * @private
     */
    invalidateCache() {
        this.lastProcessedFrame = null;
        this.frameCacheTime = 0;
    }
    
    /**
     * Resize the canvas
     * 
     * @param {number} width - New width
     * @param {number} height - New height
     */
    resize(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
        
        if (this.canvas) {
            this.canvas.resize(width, height);
        }
        if (this.graphics) {
            this.graphics.resizeCanvas(width, height);
        }
        
        this.invalidateCache();
    }
    
    /**
     * Clean up resources
     */
    dispose() {
        if (this.capture) {
            this.capture.stop();
            this.capture = null;
        }
        if (this.canvas) {
            this.canvas.remove();
            this.canvas = null;
        }
        if (this.graphics) {
            this.graphics.remove();
            this.graphics = null;
        }
        this.isReady = false;
        this.isInitialized = false;
    }
}
