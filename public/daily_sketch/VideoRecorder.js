/**
 * VideoRecorder - Handles layered video recording with p5 canvas, HTML overlay, and dynamic text
 * 
 * @overview
 * This class records a composite video from multiple layers:
 * 1. Background color (from the container element)
 * 2. Static and dynamic elements from .back layer
 * 3. p5.js canvas (animated sketch)
 * 4. Static and dynamic elements from .front layer
 * 
 * @how-it-works
 * 
 * LAYER STRUCTURE:
 * The recorder expects a container (#sketch-frame) with three layers:
 * - Layer 1 (Top): .front - Contains static & dynamic elements (dynamic element to be marked with class .animated--)
 * - Layer 2 (Middle): .middle - Contains #canvas-container with p5.js canvas
 * - Layer 3 (Bottom): .back - Contains static & dynamic elements (dynamic element to be marked with class .animated--)
 * 
 * RECORDING PROCESS:
 * 
 * 1. PREPARATION:
 *    - Hides dynamic text elements (.animated--) to capture static layout (.front and .back separately)
 *    - Hides p5 canvas to avoid double-rendering in overlay capture
 *    - Temporarily sets container background to transparent for clean capture
 *    - Captures static overlay using html2canvas (separate .front and .back layers)
 *    - Restores all visibility and styling
 *    - Stores positions of dynamic text elements for later drawing
 * 
 * 2. COMPOSITING LOOP (runs at specified FPS):
 *    For each frame:
 *    a. Clears composite canvas
 *    b. Draws background color (restored from container)
 *    c. Draws static overlay and dynamic text .back layers
 *    d. Draws p5 canvas (live animation from .middle layer)
 *    e. Draws static overlay and dynamic text .front layers
 * 
 * 3. RECORDING:
 *    - Uses MediaRecorder API to capture the composite canvas stream
 *    - Records as WebM video format
 *    - Downloads video file when recording stops
 * 
 * @compositing-order
 * The final video maintains the visual layer order:
 * Background → .back (static + dynamic) → p5 canvas → .front (static + dynamic)
 * 
 * This matches the CSS z-index: .back (1) < canvas (5) < .front (10)
 * 
 * @example
 * ```javascript
 * const recorder = new VideoRecorder({
 *   canvasContainerId: "canvas-container",
 *   overlayId: "sketch-frame",
 *   frameId: "sketch-frame",
 *   width: 800,
 *   height: 800,
 *   fps: 30
 * });
 * 
 * await recorder.startRecording();
 * // ... later
 * recorder.stopRecording();
 * ```
 */
export class VideoRecorder {
  constructor(options = {}) {
    this.config = {
      canvasContainerId: options.canvasContainerId || "canvas-container",
      overlayId: options.overlayId || "sketch-frame",
      frameId: options.frameId || "sketch-frame",
      width: options.width || 800,
      height: options.height || 800,
      fps: options.fps || 30,
    };

    this.mediaRecorder = null;
    this.chunks = [];
    this.isRecording = false;
    this.compositeInterval = null;
    this.compositeCanvas = null;
    this.backOverlayCanvas = null;
    this.frontOverlayCanvas = null;
    this.backAnimatedElements = [];
    this.frontAnimatedElements = [];
    this.textPositions = {};
  }

  /**
   * Start recording video
   * @returns {Promise<void>}
   */
  async startRecording() {
    if (this.isRecording) {
      console.warn("Recording already in progress");
      return;
    }

    const p5Canvas = document
      .getElementById(this.config.canvasContainerId)
      ?.querySelector("canvas");
    
    if (!p5Canvas) {
      console.error("p5 canvas not found");
      return;
    }

    // 1. Find animated elements in .back and .front layers
    const frameEl = document.getElementById(this.config.frameId);
    if (!frameEl) {
      console.error("Frame element not found");
      return;
    }

    const backLayer = frameEl.querySelector(".back");
    const frontLayer = frameEl.querySelector(".front");
    
    if (!backLayer || !frontLayer) {
      console.error(".back or .front layer not found");
      return;
    }

    // Find all elements with .animated-- class in each layer
    this.backAnimatedElements = Array.from(backLayer.querySelectorAll(".animated--"));
    this.frontAnimatedElements = Array.from(frontLayer.querySelectorAll(".animated--"));

    // Store original opacities for animated elements
    const originalOpacities = new Map();
    [...this.backAnimatedElements, ...this.frontAnimatedElements].forEach(el => {
      originalOpacities.set(el, el.style.opacity);
      el.style.opacity = "0";
    });

    // 2. Hide p5 canvas for overlay capture to avoid double-rendering
    const originalCanvasVisibility = p5Canvas.style.visibility;
    p5Canvas.style.visibility = "hidden";

    // 3. Temporarily make container transparent to capture layering
    const overlayEl = document.getElementById(this.config.overlayId);
    if (!overlayEl) {
      console.error("Overlay element not found");
      // Restore visibility
      originalOpacities.forEach((opacity, el) => {
        el.style.opacity = opacity || "1";
      });
      p5Canvas.style.visibility = originalCanvasVisibility;
      return;
    }

    const overlayStyle = window.getComputedStyle(overlayEl);
    const originalBgColor = overlayStyle.backgroundColor;
    overlayEl.style.backgroundColor = "transparent";

    // Import html2canvas dynamically if available
    let html2canvas;
    if (typeof window !== 'undefined' && window.html2canvas) {
      html2canvas = window.html2canvas;
    } else {
      console.error("html2canvas not available");
      // Restore visibility
      originalOpacities.forEach((opacity, el) => {
        el.style.opacity = opacity || "1";
      });
      p5Canvas.style.visibility = originalCanvasVisibility;
      overlayEl.style.backgroundColor = originalBgColor;
      return;
    }

    // 4. Capture .back and .front layers separately
    this.backOverlayCanvas = await html2canvas(backLayer, {
      backgroundColor: null,
      scale: 1,
      width: this.config.width,
      height: this.config.height,
    });

    this.frontOverlayCanvas = await html2canvas(frontLayer, {
      backgroundColor: null,
      scale: 1,
      width: this.config.width,
      height: this.config.height,
    });

    // Restore visibility
    p5Canvas.style.visibility = originalCanvasVisibility;
    overlayEl.style.backgroundColor = originalBgColor;
    originalOpacities.forEach((opacity, el) => {
      el.style.opacity = opacity || "1";
    });

    // 5. Prepare for dynamic text drawing
    // Get positions relative to the frame for animated elements
    const getPos = (el) => {
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const frameRect = frameEl.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        x: rect.left - frameRect.left,
        y: rect.top - frameRect.top,
        width: rect.width,
        height: rect.height,
        font: `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`,
        color: style.color,
        align: style.textAlign || "left",
        baseline: "top",
      };
    };

    // Store positions for animated elements
    this.textPositions = new Map();
    [...this.backAnimatedElements, ...this.frontAnimatedElements].forEach(el => {
      this.textPositions.set(el, getPos(el));
    });

    // 6. Create composite canvas
    this.compositeCanvas = document.createElement("canvas");
    this.compositeCanvas.width = this.config.width;
    this.compositeCanvas.height = this.config.height;
    const ctx = this.compositeCanvas.getContext("2d");

    // 7. Start Loop
    const drawComposite = () => {
      ctx.clearRect(0, 0, this.compositeCanvas.width, this.compositeCanvas.height);

      // Draw Background Color
      ctx.fillStyle = originalBgColor;
      ctx.fillRect(0, 0, this.compositeCanvas.width, this.compositeCanvas.height);

      // Draw .back layer (static overlay)
      ctx.drawImage(this.backOverlayCanvas, 0, 0);

      // Draw dynamic text from .back layer
      this.backAnimatedElements.forEach(el => {
        const pos = this.textPositions.get(el);
        if (!pos) return;
        
        const style = window.getComputedStyle(el);
        ctx.font = pos.font;
        ctx.fillStyle = style.color;
        ctx.textAlign = pos.align === "right" ? "right" : "left";
        
        const x = pos.align === "right" ? pos.x + pos.width : pos.x;
        ctx.fillText(el.textContent, x, pos.y + pos.height * 0.8);
      });

      // Draw p5 canvas (Middle Layer)
      ctx.drawImage(p5Canvas, 0, 0);

      // Draw .front layer (static overlay)
      ctx.drawImage(this.frontOverlayCanvas, 0, 0);

      // Draw dynamic text from .front layer
      this.frontAnimatedElements.forEach(el => {
        const pos = this.textPositions.get(el);
        if (!pos) return;
        
        const style = window.getComputedStyle(el);
        ctx.font = pos.font;
        ctx.fillStyle = style.color;
        ctx.textAlign = pos.align === "right" ? "right" : "left";
        
        const x = pos.align === "right" ? pos.x + pos.width : pos.x;
        ctx.fillText(el.textContent, x, pos.y + pos.height * 0.8);
      });
    };

    this.compositeInterval = setInterval(drawComposite, 1000 / this.config.fps);

    // 8. Record
    const stream = this.compositeCanvas.captureStream(this.config.fps);
    this.mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });

    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) this.chunks.push(e.data);
    };

    this.mediaRecorder.onstop = () => {
      this._handleStop();
    };

    this.mediaRecorder.start();
    this.isRecording = true;
  }

  /**
   * Stop recording video
   */
  stopRecording() {
    if (!this.isRecording || !this.mediaRecorder) {
      console.warn("No recording in progress");
      return;
    }

    this.mediaRecorder.stop();
  }

  /**
   * Handle recording stop and download
   * @private
   */
  _handleStop() {
    if (this.compositeInterval) {
      clearInterval(this.compositeInterval);
      this.compositeInterval = null;
    }

    const blob = new Blob(this.chunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "daily_sketch.webm";
    a.click();
    
    // Cleanup
    this.chunks = [];
    this.isRecording = false;
    URL.revokeObjectURL(url);
  }

  /**
   * Get current recording state
   * @returns {boolean}
   */
  getRecordingState() {
    return this.isRecording;
  }

  /**
   * Update dimensions (for responsive layouts)
   * @param {number} width
   * @param {number} height
   */
  updateDimensions(width, height) {
    this.config.width = width;
    this.config.height = height;
  }
}

