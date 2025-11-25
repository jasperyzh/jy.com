/**
 * @fileoverview AudioVisualizer - Simple audio visualization for canvas
 * @author jy
 * @date 2025-01-25
 * 
 * Provides simple oscillator waveform and bar chart visualizations for audio data.
 * Modular and reusable for future projects.
 * 
 * ## How to Use
 * 
 * ```javascript
 * import AudioVisualizer from "/dailies/AudioVisualizer.js";
 * 
 * const canvas = document.getElementById("audio-canvas");
 * const visualizer = new AudioVisualizer(canvas, {
 *   showOscillator: true,
 *   showBars: true,
 *   barCount: 4
 * });
 * 
 * // In your animation loop:
 * const audioData = controller.getAudioData();
 * visualizer.update(audioData);
 * visualizer.draw();
 * ```
 */

export default class AudioVisualizer {
  /**
   * Creates an instance of AudioVisualizer
   * @param {HTMLCanvasElement} canvas - Canvas element to draw on
   * @param {Object} options - Configuration options
   * @param {boolean} options.showOscillator - Show oscillator waveform (default: true)
   * @param {boolean} options.showBars - Show bar charts (default: true)
   * @param {number} options.barCount - Number of bars to display (default: 4)
   * @param {string} options.oscillatorColor - Oscillator line color (default: "#000")
   * @param {string} options.barColor - Bar color (default: "#000")
   * @param {string} options.backgroundColor - Background color (default: "transparent")
   */
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    
    this.config = {
      showOscillator: options.showOscillator !== false,
      showBars: options.showBars !== false,
      barCount: options.barCount || 4,
      oscillatorColor: options.oscillatorColor || "#000",
      barColor: options.barColor || "#000",
      backgroundColor: options.backgroundColor || "transparent",
    };

    // Audio data
    this.audioData = {
      volume: 0,
      bass: 0,
      mid: 0,
      treble: 0,
    };

    // Oscillator waveform history (for smooth animation)
    this.waveformHistory = [];
    this.maxHistoryLength = 200;

    // Resize canvas to match display size
    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  /**
   * Resize canvas to match display size
   */
  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    
    this.ctx.scale(dpr, dpr);
    
    this.canvas.style.width = rect.width + "px";
    this.canvas.style.height = rect.height + "px";
  }

  /**
   * Update audio data
   * @param {Object} audioData - Audio data from AudioMIDIController
   */
  update(audioData) {
    this.audioData = { ...audioData };

    // Add volume to waveform history for oscillator
    if (this.config.showOscillator) {
      this.waveformHistory.push(this.audioData.volume);
      if (this.waveformHistory.length > this.maxHistoryLength) {
        this.waveformHistory.shift();
      }
    }
  }

  /**
   * Draw visualizations
   */
  draw() {
    const displayWidth = this.canvas.offsetWidth;
    const displayHeight = this.canvas.offsetHeight;

    // Clear entire canvas (accounting for device pixel ratio)
    // Save context state, reset transform, clear, then restore
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Fill background if not transparent
    if (this.config.backgroundColor !== "transparent") {
      this.ctx.fillStyle = this.config.backgroundColor;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.ctx.restore();

    if (this.config.showOscillator) {
      this._drawOscillator(displayWidth, displayHeight);
    }

    if (this.config.showBars) {
      this._drawBars(displayWidth, displayHeight);
    }
  }

  /**
   * Draw oscillator waveform
   * @private
   */
  _drawOscillator(width, height) {
    if (this.waveformHistory.length < 2) return;

    const centerY = height / 2;
    const stepX = width / this.waveformHistory.length;

    this.ctx.strokeStyle = this.config.oscillatorColor;
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();

    this.waveformHistory.forEach((value, index) => {
      const x = index * stepX;
      const y = centerY - (value * centerY * 0.8); // Scale to 80% of height
      
      if (index === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    });

    this.ctx.stroke();
  }

  /**
   * Draw bar charts for frequency bands
   * @private
   */
  _drawBars(width, height) {
    const barWidth = width / this.config.barCount;
    const barSpacing = barWidth * 0.1;
    const actualBarWidth = barWidth - barSpacing;
    const maxBarHeight = height * 0.8;

    const bars = [
      { label: "Volume", value: this.audioData.volume },
      { label: "Bass", value: this.audioData.bass },
      { label: "Mid", value: this.audioData.mid },
      { label: "Treble", value: this.audioData.treble },
    ];

    bars.forEach((bar, index) => {
      const x = index * barWidth + barSpacing / 2;
      const barHeight = bar.value * maxBarHeight;
      const y = height - barHeight;

      // Draw bar
      this.ctx.fillStyle = this.config.barColor;
      this.ctx.fillRect(x, y, actualBarWidth, barHeight);

      // Draw label
      this.ctx.fillStyle = this.config.barColor;
      this.ctx.font = "10px monospace";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "top";
      this.ctx.fillText(
        bar.label,
        x + actualBarWidth / 2,
        height - maxBarHeight - 15
      );
    });
  }
}

