/**
 * Custom Tone.js Audio Module
 * =================================
 * 
 * This module provides reusable audio functionality using Tone.js.
 * It includes pre-defined melodies and sound effects that can be used in various projects.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Import this module in your project: 
 *    import { ToneAudio } from '/path/to/custom-tone.js';
 * 
 * 2. Initialize the audio engine:
 *    const audio = new ToneAudio();
 *    await audio.init(); // Must call init before playing sounds
 * 
 * 3. Play sounds using the various methods:
 *    audio.playCorrect();
 *    audio.playWrong();
 *    audio.playComplete();
 *    audio.playPerfect();
 *    
 * 4. Custom sounds:
 *    audio.playNote("C4", "8n"); // Play single note
 *    audio.playChord(["C4", "E4", "G4"], "4n"); // Play chord
 *    audio.playMelody([{ note: "C4", duration: "8n" }, { note: "E4", duration: "8n" }]); // Play sequence
 * 
 * VOLUME CONTROL:
 * - audio.setVolume(0.5); // Set volume between 0 and 1
 * - audio.mute(); // Mute all sounds
 * - audio.unmute(); // Restore volume to previous level
 */

import * as Tone from 'tone';

export class ToneAudio {
  constructor() {
    this.initialized = false;
    this.synth = null;
    this.polySynth = null;
    this.volume = 0.5; // Default volume
    this.isMuted = false;
    this.prevVolume = 0.5;
  }

  /**
   * Initialize the audio engine
   * Must be called before playing any sounds
   * This should be called in response to a user interaction to satisfy
   * browser autoplay policies
   */
  async init() {
    if (this.initialized) return;
    
    try {
      // Start audio context
      await Tone.start();
      
      // Create a synth with reverb for melody
      this.synth = new Tone.Synth({
        oscillator: {
          type: 'triangle'
        },
        envelope: {
          attack: 0.005,
          decay: 0.1,
          sustain: 0.3,
          release: 0.4
        }
      }).toDestination();
      
      // Create a polyphonic synth for chords
      this.polySynth = new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: 'sine'
        },
        envelope: {
          attack: 0.02,
          decay: 0.1,
          sustain: 0.3,
          release: 0.8
        }
      }).toDestination();
      
      // Set up volume
      this.setVolume(this.volume);
      
      this.initialized = true;
      console.log('ToneAudio initialized successfully');
      return true;
    } catch (error) {
      console.error('Failed to initialize ToneAudio:', error);
      return false;
    }
  }

  /**
   * Set the volume for all audio
   * @param {number} level - Volume level between 0 and 1
   */
  setVolume(level) {
    if (!this.initialized) {
      this.volume = level;
      return;
    }
    
    this.volume = Math.max(0, Math.min(1, level));
    Tone.Destination.volume.value = Tone.gainToDb(this.volume);
    
    if (this.volume > 0) {
      this.isMuted = false;
    }
  }

  /**
   * Mute all audio
   */
  mute() {
    if (!this.initialized) return;
    
    this.prevVolume = this.volume;
    this.isMuted = true;
    Tone.Destination.volume.value = Tone.gainToDb(0);
  }

  /**
   * Unmute audio and restore previous volume
   */
  unmute() {
    if (!this.initialized) return;
    
    this.isMuted = false;
    this.volume = this.prevVolume;
    Tone.Destination.volume.value = Tone.gainToDb(this.volume);
  }

  /**
   * Play a single note
   * @param {string} note - Note name (e.g., "C4", "F#3")
   * @param {string} duration - Note duration (e.g., "8n", "4n")
   */
  playNote(note, duration = "8n") {
    if (!this.initialized || this.isMuted) return;
    
    this.synth.triggerAttackRelease(note, duration);
  }

  /**
   * Play a chord
   * @param {Array<string>} notes - Array of note names
   * @param {string} duration - Chord duration
   */
  playChord(notes, duration = "4n") {
    if (!this.initialized || this.isMuted) return;
    
    this.polySynth.triggerAttackRelease(notes, duration);
  }

  /**
   * Play a melody (sequence of notes)
   * @param {Array<Object>} melody - Array of {note, duration} objects
   * @param {number} tempo - Tempo in BPM (beats per minute)
   */
  playMelody(melody, tempo = 120) {
    if (!this.initialized || this.isMuted) return;
    
    // Store current time
    let time = Tone.now();
    
    // Calculate beat duration based on tempo
    const beatDuration = 60 / tempo;
    
    // Schedule notes
    melody.forEach(({ note, duration }) => {
      // Convert duration string to actual time
      let durationValue;
      switch (duration) {
        case "1n": durationValue = 4 * beatDuration; break;
        case "2n": durationValue = 2 * beatDuration; break;
        case "4n": durationValue = beatDuration; break;
        case "8n": durationValue = beatDuration / 2; break;
        case "16n": durationValue = beatDuration / 4; break;
        default: durationValue = beatDuration;
      }
      
      // Play the note
      this.synth.triggerAttackRelease(note, durationValue, time);
      
      // Advance time
      time += durationValue;
    });
  }

  // PREDEFINED MELODIES

  /**
   * Play the "correct answer" sound
   * Bright, uplifting short melody
   */
  playCorrect() {
    if (!this.initialized || this.isMuted) return;
    
    // Correct answer melody - happy ascending arpeggio
    const correctMelody = [
      { note: "C5", duration: "16n" },
      { note: "E5", duration: "16n" },
      { note: "G5", duration: "8n" },
    ];
    
    this.playMelody(correctMelody, 150);
  }

  /**
   * Play the "wrong answer" sound
   * Short, descending tone
   */
  playWrong() {
    if (!this.initialized || this.isMuted) return;
    
    // Wrong answer melody - descending minor third
    const wrongMelody = [
      { note: "A4", duration: "16n" },
      { note: "F4", duration: "8n" },
    ];
    
    this.playMelody(wrongMelody, 120);
  }

  /**
   * Play the "quiz complete" sound
   * Triumphant fanfare
   */
  playComplete() {
    if (!this.initialized || this.isMuted) return;
    
    // Quiz complete melody - triumphant resolution
    const completeMelody = [
      { note: "G4", duration: "8n" },
      { note: "C5", duration: "8n" },
      { note: "E5", duration: "8n" },
      { note: "G5", duration: "4n" },
      { note: "E5", duration: "8n" },
      { note: "G5", duration: "2n" },
    ];
    
    this.playMelody(completeMelody, 120);
  }

  /**
   * Play the "perfect score" sound
   * Extended happy melody with flourish
   */
  playPerfect() {
    if (!this.initialized || this.isMuted) return;
    
    // Perfect score - extended celebratory melody
    const perfectMelody = [
      { note: "C5", duration: "8n" },
      { note: "D5", duration: "8n" },
      { note: "E5", duration: "8n" },
      { note: "G5", duration: "4n" },
      { note: "E5", duration: "8n" },
      { note: "G5", duration: "8n" },
      { note: "A5", duration: "8n" },
      { note: "C6", duration: "4n" },
      { note: "B5", duration: "8n" },
      { note: "G5", duration: "8n" },
      { note: "C6", duration: "2n" },
    ];
    
    this.playMelody(perfectMelody, 130);
  }
}

// Export a singleton instance for easy use
export const audioPlayer = new ToneAudio();
