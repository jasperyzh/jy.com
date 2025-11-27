/**
 * VoiceRecorder - Reusable voice recording module
 * 
 * A standalone JavaScript class for handling audio recording with configurable
 * duration, real-time visualization, and flexible callback system.
 * 
 * @example
 * const recorder = new VoiceRecorder({
 *   maxDuration: 60,
 *   audioBitsPerSecond: 64000,
 *   onStart: () => console.log('Recording started'),
 *   onStop: (blob) => console.log('Recording stopped', blob)
 * });
 * 
 * await recorder.start();
 * // ... later
 * recorder.stop();
 */

export class VoiceRecorder {
  constructor(options = {}) {
    // Configuration
    this.config = {
      maxDuration: options.maxDuration || 600, // 10 minutes default
      minDuration: options.minDuration || 1,
      audioBitsPerSecond: options.audioBitsPerSecond || 64000,
      mimeType: this._getBestMimeType(options.mimeType),
      visualizer: options.visualizer !== false, // enabled by default
      echoCancellation: options.echoCancellation !== false,
      noiseSuppression: options.noiseSuppression !== false,
      autoGainControl: options.autoGainControl !== false,
    };

    // Callbacks
    this.callbacks = {
      onStart: options.onStart || (() => {}),
      onStop: options.onStop || (() => {}),
      onPause: options.onPause || (() => {}),
      onResume: options.onResume || (() => {}),
      onData: options.onData || (() => {}),
      onError: options.onError || ((err) => console.error(err)),
      onProgress: options.onProgress || (() => {}),
      onVisualizerData: options.onVisualizerData || (() => {}),
    };

    // State
    this.mediaRecorder = null;
    this.audioStream = null;
    this.audioChunks = [];
    this.recordingStartTime = null;
    this.recordingDuration = 0;
    this.progressInterval = null;
    this.autoStopTimeout = null;

    // Web Audio API for visualization
    this.audioContext = null;
    this.analyser = null;
    this.microphone = null;
    this.animationFrameId = null;
  }

  /**
   * Determine the best supported MIME type for recording
   */
  _getBestMimeType(preferred) {
    const types = [
      preferred,
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/ogg;codecs=opus',
      'audio/mp4',
      'audio/wav',
    ].filter(Boolean);

    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }

    return ''; // Let browser choose default
  }

  /**
   * Get available audio input devices
   */
  async getAudioDevices() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices.filter(device => device.kind === 'audioinput');
    } catch (err) {
      this.callbacks.onError(new Error('Failed to enumerate devices: ' + err.message));
      return [];
    }
  }

  /**
   * Start recording audio
   */
  async start(deviceId = null) {
    if (this.isRecording()) {
      this.callbacks.onError(new Error('Already recording'));
      return false;
    }

    try {
      // Request microphone access
      const constraints = {
        audio: {
          echoCancellation: this.config.echoCancellation,
          noiseSuppression: this.config.noiseSuppression,
          autoGainControl: this.config.autoGainControl,
          ...(deviceId && { deviceId: { exact: deviceId } }),
        },
      };

      this.audioStream = await navigator.mediaDevices.getUserMedia(constraints);

      // Setup Web Audio API for visualization
      if (this.config.visualizer) {
        this._setupVisualizer();
      }

      // Setup MediaRecorder
      const options = {
        mimeType: this.config.mimeType,
        audioBitsPerSecond: this.config.audioBitsPerSecond,
      };

      this.mediaRecorder = new MediaRecorder(this.audioStream, options);
      this.audioChunks = [];

      // Event handlers
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
          this.callbacks.onData(event.data);
        }
      };

      this.mediaRecorder.onstart = () => {
        this.recordingStartTime = Date.now();
        this.recordingDuration = 0;
        this._startProgressTracking();
        this._setupAutoStop();
        this.callbacks.onStart();
      };

      this.mediaRecorder.onstop = () => {
        this._stopProgressTracking();
        this._clearAutoStop();
        this._stopVisualizer();

        const mimeType = this.config.mimeType || 'audio/webm';
        const audioBlob = new Blob(this.audioChunks, { type: mimeType });
        
        const recordingData = {
          blob: audioBlob,
          duration: this.recordingDuration,
          mimeType: mimeType,
          size: audioBlob.size,
          timestamp: Date.now(),
        };

        this.callbacks.onStop(recordingData);
        this.cleanup();
      };

      this.mediaRecorder.onerror = (event) => {
        this.callbacks.onError(new Error('MediaRecorder error: ' + event.error));
      };

      this.mediaRecorder.onpause = () => {
        this.callbacks.onPause();
      };

      this.mediaRecorder.onresume = () => {
        this.callbacks.onResume();
      };

      // Start recording
      this.mediaRecorder.start(100); // Collect data every 100ms
      return true;

    } catch (err) {
      this.callbacks.onError(new Error('Failed to start recording: ' + err.message));
      this.cleanup();
      return false;
    }
  }

  /**
   * Stop recording
   */
  stop() {
    if (!this.isRecording()) {
      return false;
    }

    if (this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }

    return true;
  }

  /**
   * Pause recording
   */
  pause() {
    if (!this.isRecording() || this.mediaRecorder.state !== 'recording') {
      return false;
    }

    this.mediaRecorder.pause();
    return true;
  }

  /**
   * Resume recording
   */
  resume() {
    if (!this.mediaRecorder || this.mediaRecorder.state !== 'paused') {
      return false;
    }

    this.mediaRecorder.resume();
    return true;
  }

  /**
   * Check if currently recording
   */
  isRecording() {
    return this.mediaRecorder && this.mediaRecorder.state === 'recording';
  }

  /**
   * Check if paused
   */
  isPaused() {
    return this.mediaRecorder && this.mediaRecorder.state === 'paused';
  }

  /**
   * Get current recording state
   */
  getState() {
    return this.mediaRecorder ? this.mediaRecorder.state : 'inactive';
  }

  /**
   * Get current recording duration in seconds
   */
  getDuration() {
    return this.recordingDuration;
  }

  /**
   * Setup audio visualization
   */
  _setupVisualizer() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 2048;
      this.analyser.smoothingTimeConstant = 0.8;

      this.microphone = this.audioContext.createMediaStreamSource(this.audioStream);
      this.microphone.connect(this.analyser);

      this._updateVisualizer();
    } catch (err) {
      console.warn('Failed to setup visualizer:', err);
    }
  }

  /**
   * Update visualizer data
   */
  _updateVisualizer() {
    if (!this.analyser || !this.isRecording()) {
      return;
    }

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const update = () => {
      if (!this.isRecording() && !this.isPaused()) {
        return;
      }

      this.analyser.getByteTimeDomainData(dataArray);
      this.analyser.getByteFrequencyData(dataArray);

      // Calculate average amplitude
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      const average = sum / bufferLength;

      this.callbacks.onVisualizerData({
        dataArray,
        bufferLength,
        average,
        normalized: average / 255,
      });

      this.animationFrameId = requestAnimationFrame(update);
    };

    update();
  }

  /**
   * Stop visualizer
   */
  _stopVisualizer() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.microphone) {
      this.microphone.disconnect();
      this.microphone = null;
    }

    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close();
      this.audioContext = null;
    }

    this.analyser = null;
  }

  /**
   * Track recording progress
   */
  _startProgressTracking() {
    this.progressInterval = setInterval(() => {
      if (this.recordingStartTime && this.isRecording()) {
        this.recordingDuration = (Date.now() - this.recordingStartTime) / 1000;
        
        const remaining = this.config.maxDuration - this.recordingDuration;
        
        this.callbacks.onProgress({
          duration: this.recordingDuration,
          remaining: Math.max(0, remaining),
          percentage: (this.recordingDuration / this.config.maxDuration) * 100,
        });
      }
    }, 100);
  }

  /**
   * Stop progress tracking
   */
  _stopProgressTracking() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
  }

  /**
   * Setup automatic stop when max duration reached
   */
  _setupAutoStop() {
    this._clearAutoStop();
    
    this.autoStopTimeout = setTimeout(() => {
      if (this.isRecording()) {
        this.stop();
      }
    }, this.config.maxDuration * 1000);
  }

  /**
   * Clear auto-stop timeout
   */
  _clearAutoStop() {
    if (this.autoStopTimeout) {
      clearTimeout(this.autoStopTimeout);
      this.autoStopTimeout = null;
    }
  }

  /**
   * Clean up resources
   */
  cleanup() {
    this._stopProgressTracking();
    this._clearAutoStop();
    this._stopVisualizer();

    if (this.audioStream) {
      this.audioStream.getTracks().forEach(track => track.stop());
      this.audioStream = null;
    }

    this.mediaRecorder = null;
    this.audioChunks = [];
    this.recordingStartTime = null;
  }

  /**
   * Check browser support
   */
  static isSupported() {
    return !!(
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia &&
      window.MediaRecorder
    );
  }

  /**
   * Get supported MIME types
   */
  static getSupportedMimeTypes() {
    const types = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/ogg;codecs=opus',
      'audio/ogg',
      'audio/mp4',
      'audio/mpeg',
      'audio/wav',
    ];

    return types.filter(type => MediaRecorder.isTypeSupported(type));
  }
}

export default VoiceRecorder;



