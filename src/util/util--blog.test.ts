/**
 * Tests for blog utility functions
 * 
 * Run tests:
 * npm run test
 * npm run test:watch
 */

import { describe, it, expect } from 'vitest';
import { slugify } from './util--blog';

describe('slugify', () => {
  it('converts text to lowercase', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('replaces spaces with dashes', () => {
    expect(slugify('Multiple   Spaces')).toBe('multiple-spaces');
  });

  it('removes special characters', () => {
    expect(slugify('React & Vue.js!')).toBe('react-vuejs');
    expect(slugify('Hello@World#Test')).toBe('helloworldtest');
  });

  it('handles underscores', () => {
    expect(slugify('snake_case_text')).toBe('snake-case-text');
  });

  it('removes leading and trailing spaces', () => {
    expect(slugify('  trimmed  ')).toBe('trimmed');
  });

  it('handles multiple consecutive dashes', () => {
    expect(slugify('too---many---dashes')).toBe('too-many-dashes');
  });

  it('handles empty strings', () => {
    expect(slugify('')).toBe('');
  });

  it('handles hashtags correctly', () => {
    expect(slugify('#javascript #webdev')).toBe('javascript-webdev');
  });

  it('creates valid URL slugs from blog titles', () => {
    expect(slugify('Keep it Simple, Essential')).toBe('keep-it-simple-essential');
    expect(slugify('Why I Chose Astro.js')).toBe('why-i-chose-astrojs');
    expect(slugify('Building GPT for my EDM Music Journey')).toBe('building-gpt-for-my-edm-music-journey');
  });
});




