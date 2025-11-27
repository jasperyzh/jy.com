/**
 * @fileoverview AudioMIDIController - Manages audio and MIDI input for p5.js sketches
 * @author jy
 * @date 2025-01-25
 * 
 * Provides simple interface to receive audio and MIDI data from various sources
 * (microphone, line-in, MIDI devices like Elektron Digitakt) and manipulate sketch parameters.
 * 
 * ## How to Use
 * 
 * ### Basic Setup
 * ```javascript
 * import AudioMIDIController from "/dailies/AudioMIDIController.js";
 * 
 * // Create controller
 * const controller = new AudioMIDIController({
 *   enableAudio: true,
 *   enableMIDI: true,
 *   smoothing: 0.8,  // Smoothing factor (0-1, higher = smoother)
 * });
 * 
 * // Initialize (requests permissions)
 * await controller.init();
 * 
 * // Start processing
 * controller.start();
 * 
 * // In your draw loop, get data:
 * const audioData = controller.getAudioData();
 * const midiData = controller.getMIDIData();
 * ```
 * 
 * ### Audio Data Structure
 * ```javascript
 * {
 *   volume: 0-1,    // Overall amplitude (RMS)
 *   bass: 0-1,      // Low frequencies (0-250Hz)
 *   mid: 0-1,       // Mid frequencies (250-4000Hz)
 *   treble: 0-1     // High frequencies (4000Hz+)
 * }
 * ```
 * 
 * ### MIDI Data Structure
 * ```javascript
 * {
 *   activeNotes: [60, 64, 67],  // Array of currently pressed note numbers
 *   velocity: 127,               // Last note velocity (0-127)
 *   cc: {                        // Control Change values
 *     1: 64,                     // CC 1 = 64
 *     2: 32                       // CC 2 = 32
 *   },
 *   pitchBend: 0                 // Pitch bend value (-1 to 1)
 * }
 * ```
 * 
 * ### Example: Reacting to Audio
 * ```javascript
 * function draw() {
 *   if (controller.isAudioReady()) {
 *     const audio = controller.getAudioData();
 *     
 *     // Map volume to sketch parameter
 *     sketchConfig.noiseScale = 0.05 + (audio.volume * 0.5);
 *     
 *     // Map bass to dot size
 *     sketchConfig.dotSize = 1.0 + (audio.bass * 2.0);
 *   }
 * }
 * ```
 * 
 * ### Example: Reacting to MIDI
 * ```javascript
 * function draw() {
 *   if (controller.isMIDIReady()) {
 *     const midi = controller.getMIDIData();
 *     
 *     // Change matrix size based on note count
 *     if (midi.activeNotes.length > 0) {
 *       const sizes = [4, 8, 16, 32, 64];
 *       sketchConfig.matrixSize = sizes[midi.activeNotes.length - 1] || 4;
 *     }
 *     
 *     // Use velocity for animation speed
 *     sketchConfig.speed = 0.002 + (midi.velocity / 127) * 0.05;
 *     
 *     // Use CC values
 *     if (midi.cc[1] !== undefined) {
 *       sketchConfig.brightness = midi.cc[1] / 127;
 *     }
 *   }
 * }
 * ```
 * 
 * ### Callbacks (Optional)
 * ```javascript
 * const controller = new AudioMIDIController({
 *   onAudioUpdate: (audioData) => {
 *     console.log("Audio updated:", audioData);
 *   },
 *   onMIDINote: (event) => {
 *     console.log("MIDI note:", event.type, event.note, event.velocity);
 *   },
 *   onMIDICC: (event) => {
 *     console.log("MIDI CC:", event.cc, "=", event.value);
 *   }
 * });
 * ```
 * 
 * ### Browser Compatibility
 * - **Web Audio API**: Supported in all modern browsers
 * - **Web MIDI API**: Chrome, Edge, Opera (Firefox requires user script)
 * 
 * ### Troubleshooting
 * - If audio doesn't work: Check browser permissions, ensure microphone is connected
 * - If MIDI doesn't work: Check browser support, ensure MIDI device is connected
 * - Use `controller.isAudioReady()` and `controller.isMIDIReady()` to check status
 * - Enable debug mode in sketch to see console logs of data
 */

export default class AudioMIDIController {
  /**
   * Creates an instance of AudioMIDIController
   * @param {Object} options - Configuration options
   * @param {boolean} options.enableAudio - Enable audio input (default: true)
   * @param {boolean} options.enableMIDI - Enable MIDI input (default: true)
   * @param {number} options.smoothing - Smoothing factor for audio data (0-1, default: 0.8)
   * @param {number} options.fftSize - FFT size for frequency analysis (default: 2048)
   * @param {Function} options.onAudioUpdate - Callback when audio data updates
   * @param {Function} options.onMIDINote - Callback when MIDI note event occurs
   * @param {Function} options.onMIDICC - Callback when MIDI CC event occurs
   */
  constructor(options = {}) {
    this.config = {
      enableAudio: options.enableAudio !== false,
      enableMIDI: options.enableMIDI !== false,
      smoothing: options.smoothing || 0.8,
      fftSize: options.fftSize || 2048,
      onAudioUpdate: options.onAudioUpdate || null,
      onMIDINote: options.onMIDINote || null,
      onMIDICC: options.onMIDICC || null,
    };

    // Audio state
    this.audioContext = null;
    this.analyser = null;
    this.microphone = null;
    this.audioStream = null;
    this.isAudioActive = false;

    // Audio data (smoothed)
    this.audioData = {
      volume: 0,
      bass: 0,
      mid: 0,
      treble: 0,
    };

    // Raw audio data (before smoothing)
    this.rawAudioData = {
      volume: 0,
      bass: 0,
      mid: 0,
      treble: 0,
    };

    // MIDI state
    this.midiAccess = null;
    this.midiInputs = [];
    this.isMIDIActive = false;

    // MIDI data
    this.midiData = {
      activeNotes: [],
      velocity: 0,
      cc: {},
    };

    // Frequency band definitions (Hz)
    this.frequencyBands = {
      bass: { min: 0, max: 250 },
      mid: { min: 250, max: 4000 },
      treble: { min: 4000, max: 22050 },
    };

    // Animation frame for audio updates
    this.animationFrameId = null;
  }

  /**
   * Initialize audio and MIDI access
   * @returns {Promise<void>}
   */
  async init() {
    const promises = [];

    if (this.config.enableAudio) {
      promises.push(this._initAudio());
    }

    if (this.config.enableMIDI) {
      promises.push(this._initMIDI());
    }

    await Promise.allSettled(promises);
  }

  /**
   * Initialize Web Audio API
   * Requests microphone/line-in access and sets up audio analysis
   * @private
   */
  async _initAudio() {
    try {
      // Request microphone/line-in access
      // Disable audio processing for raw audio data
      this.audioStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,    // Keep raw audio
          noiseSuppression: false,     // Keep raw audio
          autoGainControl: false,      // Keep raw audio
        },
      });

      // Create Web Audio API context
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create analyser node for frequency and time domain analysis
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = this.config.fftSize; // Larger = more frequency resolution
      this.analyser.smoothingTimeConstant = this.config.smoothing; // 0-1, higher = smoother

      // Connect audio input to analyser
      this.microphone = this.audioContext.createMediaStreamSource(this.audioStream);
      this.microphone.connect(this.analyser);

      console.log("✅ Audio initialized successfully");
    } catch (error) {
      console.warn("⚠️ Audio initialization failed:", error);
      this.config.enableAudio = false;
    }
  }

  /**
   * Initialize Web MIDI API
   * Connects to MIDI devices (e.g., Elektron Digitakt, keyboards, controllers)
   * @private
   */
  async _initMIDI() {
    try {
      if (!navigator.requestMIDIAccess) {
        console.warn("⚠️ Web MIDI API not supported in this browser");
        console.warn("   Supported in: Chrome, Edge, Opera");
        this.config.enableMIDI = false;
        return;
      }

      // Request MIDI access (sysex: false = no system exclusive messages)
      this.midiAccess = await navigator.requestMIDIAccess({ sysex: false });
      this.midiInputs = Array.from(this.midiAccess.inputs.values());

      // Set up listeners for all existing MIDI inputs
      this.midiInputs.forEach((input) => {
        input.onmidimessage = (event) => this._handleMIDIMessage(event);
      });

      // Listen for new MIDI devices being connected
      this.midiAccess.onstatechange = (event) => {
        if (event.port.state === "connected" && event.port.type === "input") {
          event.port.onmidimessage = (e) => this._handleMIDIMessage(e);
          this.midiInputs = Array.from(this.midiAccess.inputs.values());
          console.log(`🎹 MIDI device connected: ${event.port.name}`);
        }
      };

      console.log(`✅ MIDI initialized: ${this.midiInputs.length} input(s) found`);
      if (this.midiInputs.length > 0) {
        this.midiInputs.forEach((input, i) => {
          console.log(`   ${i + 1}. ${input.name}`);
        });
      }
    } catch (error) {
      console.warn("⚠️ MIDI initialization failed:", error);
      this.config.enableMIDI = false;
    }
  }

  /**
   * Handle incoming MIDI messages
   * Parses MIDI protocol messages and updates internal state
   * @private
   * @param {MIDIMessageEvent} event - MIDI message event
   * 
   * MIDI Message Format:
   * - status byte: command (4 bits) + channel (4 bits)
   * - data1: note number or CC number
   * - data2: velocity or CC value
   */
  _handleMIDIMessage(event) {
    const [status, data1, data2] = event.data;
    const command = status & 0xf0;  // Extract command (first 4 bits)
    const channel = status & 0x0f;   // Extract channel (last 4 bits)

    switch (command) {
      case 0x90: // Note On (144)
        if (data2 > 0) {
          // Add note to active notes list if not already there
          if (!this.midiData.activeNotes.includes(data1)) {
            this.midiData.activeNotes.push(data1);
          }
          this.midiData.velocity = data2; // Store last velocity
          if (this.config.onMIDINote) {
            this.config.onMIDINote({
              type: "noteon",
              note: data1,        // MIDI note number (0-127, C4 = 60)
              velocity: data2,    // Velocity (0-127)
              channel: channel,   // MIDI channel (0-15)
            });
          }
        } else {
          // Velocity 0 = Note Off (some devices send this instead of 0x80)
          this._handleNoteOff(data1);
        }
        break;

      case 0x80: // Note Off (128)
        this._handleNoteOff(data1);
        break;

      case 0xb0: // Control Change (176)
        // CC messages: data1 = CC number, data2 = CC value (0-127)
        this.midiData.cc[data1] = data2;
        if (this.config.onMIDICC) {
          this.config.onMIDICC({
            cc: data1,      // CC number (0-127)
            value: data2,   // CC value (0-127)
            channel: channel,
          });
        }
        break;

      case 0xe0: // Pitch Bend (224)
        // Pitch bend is 14-bit value: combine data1 (LSB) and data2 (MSB)
        const pitchValue = ((data2 << 7) | data1) - 8192;
        this.midiData.pitchBend = pitchValue / 8192; // Normalize to -1 to 1
        break;
    }
  }

  /**
   * Handle note off event
   * @private
   * @param {number} note - MIDI note number
   */
  _handleNoteOff(note) {
    const index = this.midiData.activeNotes.indexOf(note);
    if (index > -1) {
      this.midiData.activeNotes.splice(index, 1);
    }
    if (this.config.onMIDINote) {
      this.config.onMIDINote({
        type: "noteoff",
        note: note,
        velocity: 0,
      });
    }
  }

  /**
   * Start audio and MIDI processing
   */
  start() {
    if (this.config.enableAudio && this.audioContext && !this.isAudioActive) {
      // Resume audio context if suspended (browser autoplay policy)
      if (this.audioContext.state === "suspended") {
        this.audioContext.resume();
      }
      this.isAudioActive = true;
      this._updateAudio();
    }

    if (this.config.enableMIDI && this.midiAccess) {
      this.isMIDIActive = true;
    }
  }

  /**
   * Stop audio and MIDI processing
   */
  stop() {
    this.isAudioActive = false;
    this.isMIDIActive = false;

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.audioStream) {
      this.audioStream.getTracks().forEach((track) => track.stop());
      this.audioStream = null;
    }

    if (this.audioContext && this.audioContext.state !== "closed") {
      this.audioContext.close();
      this.audioContext = null;
    }
  }

  /**
   * Update audio data (called on animation frame)
   * Analyzes audio input and calculates volume + frequency bands
   * @private
   */
  _updateAudio() {
    if (!this.isAudioActive || !this.analyser) {
      return;
    }

    // Get frequency domain data (FFT analysis)
    // This gives us amplitude at different frequencies
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(dataArray); // 0-255 values

    // Get time domain data for volume calculation
    // This gives us raw waveform samples
    const timeDataArray = new Uint8Array(bufferLength);
    this.analyser.getByteTimeDomainData(timeDataArray); // 0-255 values

    // Calculate RMS (Root Mean Square) volume from time domain
    // RMS gives us overall amplitude/volume
    let sum = 0;
    for (let i = 0; i < timeDataArray.length; i++) {
      const normalized = (timeDataArray[i] - 128) / 128; // Convert to -1 to 1
      sum += normalized * normalized; // Square each sample
    }
    const rms = Math.sqrt(sum / timeDataArray.length); // Square root of mean
    this.rawAudioData.volume = Math.min(1, rms * 2); // Amplify and clamp to 0-1

    // Calculate frequency bands (bass, mid, treble)
    // Convert frequency bins to actual frequencies
    const sampleRate = this.audioContext.sampleRate; // Usually 44100 Hz
    const nyquist = sampleRate / 2; // Maximum frequency we can detect
    const binSize = nyquist / bufferLength; // Frequency per bin

    // Bass: 0-250Hz (low frequencies, kick drums, bass guitars)
    const bassEnd = Math.floor(this.frequencyBands.bass.max / binSize);
    let bassSum = 0;
    for (let i = 0; i < bassEnd; i++) {
      bassSum += dataArray[i]; // Sum amplitude in bass range
    }
    this.rawAudioData.bass = (bassSum / (bassEnd * 255)) || 0; // Normalize to 0-1

    // Mid: 250-4000Hz (vocals, guitars, most instruments)
    const midStart = Math.floor(this.frequencyBands.mid.min / binSize);
    const midEnd = Math.floor(this.frequencyBands.mid.max / binSize);
    let midSum = 0;
    for (let i = midStart; i < midEnd; i++) {
      midSum += dataArray[i];
    }
    this.rawAudioData.mid = (midSum / ((midEnd - midStart) * 255)) || 0;

    // Treble: 4000Hz+ (cymbals, hi-hats, high frequencies)
    const trebleStart = Math.floor(this.frequencyBands.treble.min / binSize);
    let trebleSum = 0;
    for (let i = trebleStart; i < bufferLength; i++) {
      trebleSum += dataArray[i];
    }
    this.rawAudioData.treble = (trebleSum / ((bufferLength - trebleStart) * 255)) || 0;

    // Apply exponential smoothing to reduce jitter
    // Higher smoothing factor (0.8-0.9) = smoother, slower response
    // Lower smoothing factor (0.5-0.7) = more responsive, more jittery
    const smoothingFactor = this.config.smoothing;
    this.audioData.volume =
      this.audioData.volume * smoothingFactor +
      this.rawAudioData.volume * (1 - smoothingFactor);
    this.audioData.bass =
      this.audioData.bass * smoothingFactor +
      this.rawAudioData.bass * (1 - smoothingFactor);
    this.audioData.mid =
      this.audioData.mid * smoothingFactor +
      this.rawAudioData.mid * (1 - smoothingFactor);
    this.audioData.treble =
      this.audioData.treble * smoothingFactor +
      this.rawAudioData.treble * (1 - smoothingFactor);

    // Call update callback
    if (this.config.onAudioUpdate) {
      this.config.onAudioUpdate(this.audioData);
    }

    // Continue animation loop
    this.animationFrameId = requestAnimationFrame(() => this._updateAudio());
  }

  /**
   * Get current audio data
   * @returns {Object} Audio data object with volume, bass, mid, treble (0-1 normalized)
   */
  getAudioData() {
    return { ...this.audioData };
  }

  /**
   * Get current MIDI data
   * @returns {Object} MIDI data object with activeNotes, velocity, cc
   */
  getMIDIData() {
    return {
      activeNotes: [...this.midiData.activeNotes],
      velocity: this.midiData.velocity,
      cc: { ...this.midiData.cc },
      pitchBend: this.midiData.pitchBend || 0,
    };
  }

  /**
   * Get list of available MIDI input devices
   * @returns {Array<string>} Array of MIDI input device names
   */
  getMIDIDevices() {
    return this.midiInputs.map((input) => input.name);
  }

  /**
   * Check if audio is available and active
   * @returns {boolean}
   */
  isAudioReady() {
    return this.config.enableAudio && this.isAudioActive && this.analyser !== null;
  }

  /**
   * Check if MIDI is available and active
   * @returns {boolean}
   */
  isMIDIReady() {
    return this.config.enableMIDI && this.isMIDIActive && this.midiAccess !== null;
  }
}


