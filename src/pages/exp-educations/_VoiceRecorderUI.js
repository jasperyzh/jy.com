/**
 * VoiceRecorderUI - Complete UI component for voice recording
 * 
 * Provides a full-featured UI for recording, playing back, and managing audio.
 * Integrates with VoiceRecorder and AudioStorage classes.
 * 
 * @example
 * const ui = new VoiceRecorderUI({
 *   container: document.getElementById('recorder'),
 *   storageType: 'indexeddb',
 *   onSave: (data) => console.log('Saved:', data)
 * });
 */

import { VoiceRecorder } from './_VoiceRecorder.js';
import { AudioStorage } from './_AudioStorage.js';

export class VoiceRecorderUI {
  constructor(options = {}) {
    this.config = {
      container: options.container || document.body,
      storageType: options.storageType || 'indexeddb',
      maxDuration: options.maxDuration || 600, // 10 minutes
      audioBitsPerSecond: options.audioBitsPerSecond || 64000,
      showVisualizer: options.showVisualizer !== false,
      showDownload: options.showDownload !== false,
      showStorage: options.showStorage !== false,
      autoSave: options.autoSave !== false,
      theme: options.theme || 'light', // 'light' | 'dark'
      compact: options.compact || false,
    };

    this.callbacks = {
      onSave: options.onSave || (() => {}),
      onPlay: options.onPlay || (() => {}),
      onDelete: options.onDelete || (() => {}),
      onError: options.onError || ((err) => console.error(err)),
    };

    // Components
    this.recorder = null;
    this.storage = null;
    this.currentRecording = null;
    this.audioElement = null;

    // UI Elements
    this.elements = {};

    this.init();
  }

  /**
   * Initialize the UI
   */
  async init() {
    // Initialize storage
    this.storage = new AudioStorage({
      storageType: this.config.storageType,
    });

    try {
      await this.storage.init();
    } catch (err) {
      console.warn('Storage init warning:', err);
    }

    // Initialize recorder
    this.recorder = new VoiceRecorder({
      maxDuration: this.config.maxDuration,
      audioBitsPerSecond: this.config.audioBitsPerSecond,
      visualizer: this.config.showVisualizer,
      onStart: () => this._onRecordStart(),
      onStop: (data) => this._onRecordStop(data),
      onProgress: (progress) => this._onRecordProgress(progress),
      onVisualizerData: (data) => this._onVisualizerData(data),
      onError: (err) => this.callbacks.onError(err),
    });

    // Build UI
    this.render();
  }

  /**
   * Render the UI
   */
  render() {
    const container = this.config.container;
    container.innerHTML = '';
    container.className = `voice-recorder-ui ${this.config.theme === 'dark' ? 'dark' : ''} ${this.config.compact ? 'compact' : ''}`;

    // Main wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'recorder-wrapper bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl mx-auto';

    // Title
    const title = document.createElement('h2');
    title.className = 'text-2xl font-bold mb-4 text-gray-800 dark:text-white';
    title.textContent = 'Voice Recorder';
    wrapper.appendChild(title);

    // Duration selector
    wrapper.appendChild(this._createDurationSelector());

    // Visualizer
    if (this.config.showVisualizer) {
      wrapper.appendChild(this._createVisualizer());
    }

    // Controls
    wrapper.appendChild(this._createControls());

    // Progress bar
    wrapper.appendChild(this._createProgressBar());

    // Timer display
    wrapper.appendChild(this._createTimer());

    // Playback section
    wrapper.appendChild(this._createPlaybackSection());

    // Storage info
    if (this.config.showStorage) {
      wrapper.appendChild(this._createStorageInfo());
    }

    container.appendChild(wrapper);

    // Add styles
    this._injectStyles();

    // Load storage info
    this._updateStorageInfo();
  }

  /**
   * Create duration selector
   */
  _createDurationSelector() {
    const container = document.createElement('div');
    container.className = 'duration-selector mb-4';

    const label = document.createElement('label');
    label.className = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2';
    label.textContent = 'Recording Duration:';

    const select = document.createElement('select');
    select.className = 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white';

    const durations = [
      { value: 5, label: '5 seconds' },
      { value: 10, label: '10 seconds' },
      { value: 30, label: '30 seconds' },
      { value: 60, label: '1 minute' },
      { value: 120, label: '2 minutes' },
      { value: 300, label: '5 minutes' },
      { value: 600, label: '10 minutes' },
    ];

    durations.forEach(({ value, label }) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = label;
      if (value === this.config.maxDuration) {
        option.selected = true;
      }
      select.appendChild(option);
    });

    select.addEventListener('change', (e) => {
      this.config.maxDuration = parseInt(e.target.value);
      this.recorder.config.maxDuration = this.config.maxDuration;
    });

    container.appendChild(label);
    container.appendChild(select);
    this.elements.durationSelect = select;

    return container;
  }

  /**
   * Create visualizer
   */
  _createVisualizer() {
    const container = document.createElement('div');
    container.className = 'visualizer-container mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg p-4 h-32 flex items-center justify-center';

    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 100;
    canvas.className = 'w-full h-full';

    container.appendChild(canvas);
    this.elements.visualizerCanvas = canvas;
    this.elements.visualizerContext = canvas.getContext('2d');

    return container;
  }

  /**
   * Create controls
   */
  _createControls() {
    const container = document.createElement('div');
    container.className = 'controls flex gap-3 mb-4';

    // Record button
    const recordBtn = document.createElement('button');
    recordBtn.className = 'flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2';
    recordBtn.innerHTML = `
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="6"/>
      </svg>
      <span>Record</span>
    `;
    recordBtn.addEventListener('click', () => this._toggleRecording());
    this.elements.recordBtn = recordBtn;

    // Stop button
    const stopBtn = document.createElement('button');
    stopBtn.className = 'bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
    stopBtn.innerHTML = `
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <rect x="6" y="6" width="8" height="8"/>
      </svg>
    `;
    stopBtn.disabled = true;
    stopBtn.addEventListener('click', () => this._stopRecording());
    this.elements.stopBtn = stopBtn;

    container.appendChild(recordBtn);
    container.appendChild(stopBtn);

    return container;
  }

  /**
   * Create progress bar
   */
  _createProgressBar() {
    const container = document.createElement('div');
    container.className = 'progress-bar-container mb-2';

    const progressBg = document.createElement('div');
    progressBg.className = 'w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden';

    const progressBar = document.createElement('div');
    progressBar.className = 'bg-blue-500 h-full transition-all duration-100';
    progressBar.style.width = '0%';

    progressBg.appendChild(progressBar);
    container.appendChild(progressBg);
    this.elements.progressBar = progressBar;

    return container;
  }

  /**
   * Create timer display
   */
  _createTimer() {
    const container = document.createElement('div');
    container.className = 'timer-display text-center mb-4';

    const timer = document.createElement('div');
    timer.className = 'text-3xl font-mono font-bold text-gray-700 dark:text-gray-300';
    timer.textContent = '00:00';

    const subtitle = document.createElement('div');
    subtitle.className = 'text-sm text-gray-500 dark:text-gray-400 mt-1';
    subtitle.textContent = 'Ready to record';

    container.appendChild(timer);
    container.appendChild(subtitle);
    this.elements.timer = timer;
    this.elements.timerSubtitle = subtitle;

    return container;
  }

  /**
   * Create playback section
   */
  _createPlaybackSection() {
    const container = document.createElement('div');
    container.className = 'playback-section hidden border-t border-gray-200 dark:border-gray-700 pt-4 mt-4';

    const title = document.createElement('h3');
    title.className = 'text-lg font-semibold mb-3 text-gray-800 dark:text-white';
    title.textContent = 'Playback';

    // Audio player
    const audioContainer = document.createElement('div');
    audioContainer.className = 'audio-player-container mb-3';

    const audio = document.createElement('audio');
    audio.className = 'w-full';
    audio.controls = true;
    audioContainer.appendChild(audio);
    this.elements.audioPlayer = audio;

    // Action buttons
    const actions = document.createElement('div');
    actions.className = 'flex gap-2';

    // Save button
    const saveBtn = document.createElement('button');
    saveBtn.className = 'flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200';
    saveBtn.textContent = 'Save Recording';
    saveBtn.addEventListener('click', () => this._saveRecording());
    this.elements.saveBtn = saveBtn;

    // Download button
    if (this.config.showDownload) {
      const downloadBtn = document.createElement('button');
      downloadBtn.className = 'bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200';
      downloadBtn.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
        </svg>
      `;
      downloadBtn.addEventListener('click', () => this._downloadRecording());
      this.elements.downloadBtn = downloadBtn;
      actions.appendChild(downloadBtn);
    }

    // Discard button
    const discardBtn = document.createElement('button');
    discardBtn.className = 'bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200';
    discardBtn.textContent = 'Discard';
    discardBtn.addEventListener('click', () => this._discardRecording());
    this.elements.discardBtn = discardBtn;

    actions.appendChild(saveBtn);
    actions.appendChild(discardBtn);

    container.appendChild(title);
    container.appendChild(audioContainer);
    container.appendChild(actions);
    this.elements.playbackSection = container;

    return container;
  }

  /**
   * Create storage info
   */
  _createStorageInfo() {
    const container = document.createElement('div');
    container.className = 'storage-info border-t border-gray-200 dark:border-gray-700 pt-4 mt-4';

    const title = document.createElement('h3');
    title.className = 'text-lg font-semibold mb-2 text-gray-800 dark:text-white';
    title.textContent = 'Storage Info';

    const info = document.createElement('div');
    info.className = 'text-sm text-gray-600 dark:text-gray-400';
    info.innerHTML = '<p>Loading storage information...</p>';

    container.appendChild(title);
    container.appendChild(info);
    this.elements.storageInfo = info;

    return container;
  }

  /**
   * Toggle recording
   */
  async _toggleRecording() {
    if (this.recorder.isRecording()) {
      this.recorder.pause();
      this.elements.recordBtn.innerHTML = `
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="6"/>
        </svg>
        <span>Resume</span>
      `;
    } else if (this.recorder.isPaused()) {
      this.recorder.resume();
      this.elements.recordBtn.innerHTML = `
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <rect x="6" y="4" width="3" height="12"/>
          <rect x="11" y="4" width="3" height="12"/>
        </svg>
        <span>Pause</span>
      `;
    } else {
      const started = await this.recorder.start();
      if (started) {
        this.elements.recordBtn.innerHTML = `
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <rect x="6" y="4" width="3" height="12"/>
            <rect x="11" y="4" width="3" height="12"/>
          </svg>
          <span>Pause</span>
        `;
        this.elements.recordBtn.classList.remove('bg-red-500', 'hover:bg-red-600');
        this.elements.recordBtn.classList.add('bg-yellow-500', 'hover:bg-yellow-600');
        this.elements.stopBtn.disabled = false;
        this.elements.durationSelect.disabled = true;
      }
    }
  }

  /**
   * Stop recording
   */
  _stopRecording() {
    this.recorder.stop();
  }

  /**
   * Save recording
   */
  async _saveRecording() {
    if (!this.currentRecording) return;

    try {
      const id = `recording-${Date.now()}`;
      const metadata = {
        title: `Recording ${new Date().toLocaleString()}`,
        duration: this.currentRecording.duration,
      };

      await this.storage.save(id, this.currentRecording.blob, metadata);
      this.callbacks.onSave({ id, ...this.currentRecording });
      this._updateStorageInfo();
      
      // Show success message
      this.elements.timerSubtitle.textContent = 'Recording saved!';
      this.elements.timerSubtitle.className = 'text-sm text-green-500 mt-1';
      
      setTimeout(() => {
        this._discardRecording();
      }, 2000);
    } catch (err) {
      this.callbacks.onError(err);
      this.elements.timerSubtitle.textContent = 'Failed to save: ' + err.message;
      this.elements.timerSubtitle.className = 'text-sm text-red-500 mt-1';
    }
  }

  /**
   * Download recording
   */
  _downloadRecording() {
    if (!this.currentRecording) return;

    const url = URL.createObjectURL(this.currentRecording.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recording-${Date.now()}.${this._getExtension(this.currentRecording.mimeType)}`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Discard recording
   */
  _discardRecording() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.src = '';
    }

    this.currentRecording = null;
    this.elements.playbackSection.classList.add('hidden');
    this.elements.timer.textContent = '00:00';
    this.elements.timerSubtitle.textContent = 'Ready to record';
    this.elements.timerSubtitle.className = 'text-sm text-gray-500 dark:text-gray-400 mt-1';
    this.elements.progressBar.style.width = '0%';
  }

  /**
   * Update storage info
   */
  async _updateStorageInfo() {
    if (!this.config.showStorage || !this.elements.storageInfo) return;

    try {
      const info = await this.storage.getStorageInfo();
      const usedMB = (info.used / (1024 * 1024)).toFixed(2);
      const limitMB = (info.limit / (1024 * 1024)).toFixed(2);

      this.elements.storageInfo.innerHTML = `
        <div class="space-y-2">
          <div class="flex justify-between">
            <span>Storage Type:</span>
            <span class="font-semibold">${this.config.storageType}</span>
          </div>
          <div class="flex justify-between">
            <span>Used:</span>
            <span class="font-semibold">${usedMB} MB / ${limitMB} MB</span>
          </div>
          <div class="flex justify-between">
            <span>Recordings:</span>
            <span class="font-semibold">${info.count}</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div class="bg-blue-500 h-full" style="width: ${Math.min(info.percentage, 100).toFixed(1)}%"></div>
          </div>
        </div>
      `;
    } catch (err) {
      console.warn('Failed to update storage info:', err);
    }
  }

  /**
   * Record start handler
   */
  _onRecordStart() {
    this.elements.timerSubtitle.textContent = 'Recording...';
    this.elements.timerSubtitle.className = 'text-sm text-red-500 mt-1';
  }

  /**
   * Record stop handler
   */
  _onRecordStop(data) {
    this.currentRecording = data;

    // Reset UI
    this.elements.recordBtn.innerHTML = `
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="6"/>
      </svg>
      <span>Record</span>
    `;
    this.elements.recordBtn.classList.remove('bg-yellow-500', 'hover:bg-yellow-600');
    this.elements.recordBtn.classList.add('bg-red-500', 'hover:bg-red-600');
    this.elements.stopBtn.disabled = true;
    this.elements.durationSelect.disabled = false;

    // Show playback
    const url = URL.createObjectURL(data.blob);
    this.elements.audioPlayer.src = url;
    this.elements.playbackSection.classList.remove('hidden');

    this.elements.timerSubtitle.textContent = 'Recording complete';
    this.elements.timerSubtitle.className = 'text-sm text-green-500 mt-1';

    // Auto-save if enabled
    if (this.config.autoSave) {
      this._saveRecording();
    }
  }

  /**
   * Record progress handler
   */
  _onRecordProgress(progress) {
    const minutes = Math.floor(progress.duration / 60);
    const seconds = Math.floor(progress.duration % 60);
    this.elements.timer.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    this.elements.progressBar.style.width = `${progress.percentage}%`;

    const remainingSeconds = Math.ceil(progress.remaining);
    this.elements.timerSubtitle.textContent = `Recording... (${remainingSeconds}s remaining)`;
  }

  /**
   * Visualizer data handler
   */
  _onVisualizerData(data) {
    if (!this.elements.visualizerCanvas || !this.elements.visualizerContext) return;

    const canvas = this.elements.visualizerCanvas;
    const ctx = this.elements.visualizerContext;
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = this.config.theme === 'dark' ? '#374151' : '#f3f4f6';
    ctx.fillRect(0, 0, width, height);

    // Draw waveform
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#3b82f6';
    ctx.beginPath();

    const sliceWidth = width / data.bufferLength;
    let x = 0;

    for (let i = 0; i < data.bufferLength; i++) {
      const v = data.dataArray[i] / 128.0;
      const y = (v * height) / 2;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    ctx.lineTo(width, height / 2);
    ctx.stroke();
  }

  /**
   * Get file extension from MIME type
   */
  _getExtension(mimeType) {
    const extensions = {
      'audio/webm': 'webm',
      'audio/ogg': 'ogg',
      'audio/mp4': 'mp4',
      'audio/mpeg': 'mp3',
      'audio/wav': 'wav',
    };
    return extensions[mimeType] || 'webm';
  }

  /**
   * Inject CSS styles
   */
  _injectStyles() {
    if (document.getElementById('voice-recorder-ui-styles')) return;

    const style = document.createElement('style');
    style.id = 'voice-recorder-ui-styles';
    style.textContent = `
      .voice-recorder-ui.dark {
        color-scheme: dark;
      }
      
      .voice-recorder-ui.compact .recorder-wrapper {
        padding: 1rem;
      }
      
      .voice-recorder-ui.compact h2 {
        font-size: 1.25rem;
        margin-bottom: 0.75rem;
      }

      .voice-recorder-ui button {
        cursor: pointer;
      }

      .voice-recorder-ui button:active {
        transform: scale(0.98);
      }

      .voice-recorder-ui select:focus {
        outline: none;
      }
    `;

    document.head.appendChild(style);
  }

  /**
   * Destroy the UI and clean up resources
   */
  destroy() {
    if (this.recorder) {
      this.recorder.cleanup();
    }

    if (this.currentRecording) {
      URL.revokeObjectURL(this.elements.audioPlayer.src);
    }

    this.config.container.innerHTML = '';
  }
}

export default VoiceRecorderUI;



