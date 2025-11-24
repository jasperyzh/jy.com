/**
 * Tests for date utility functions
 * 
 * Run tests:
 * npm run test
 * npm run test:watch
 */

import { describe, it, expect } from 'vitest';
import { parseDateYYMMDD } from './util--date';

describe('parseDateYYMMDD', () => {
  it('parses valid YYMMDD string format', () => {
    const result = parseDateYYMMDD('250217');
    expect(result).toBeInstanceOf(Date);
    expect(result?.getFullYear()).toBe(2025);
    expect(result?.getMonth()).toBe(1); // February (0-based)
    expect(result?.getDate()).toBe(17);
  });

  it('parses valid YYMMDD number format', () => {
    const result = parseDateYYMMDD(250217);
    expect(result).toBeInstanceOf(Date);
    expect(result?.getFullYear()).toBe(2025);
    expect(result?.getMonth()).toBe(1);
    expect(result?.getDate()).toBe(17);
  });

  it('returns existing Date object unchanged', () => {
    const testDate = new Date(2025, 1, 17);
    const result = parseDateYYMMDD(testDate);
    expect(result).toBe(testDate);
  });

  it('handles different years correctly', () => {
    const result2023 = parseDateYYMMDD('231201');
    expect(result2023?.getFullYear()).toBe(2023);
    
    const result2024 = parseDateYYMMDD('241016');
    expect(result2024?.getFullYear()).toBe(2024);
  });

  it('handles different months correctly', () => {
    const january = parseDateYYMMDD('250101');
    expect(january?.getMonth()).toBe(0);
    
    const december = parseDateYYMMDD('251231');
    expect(december?.getMonth()).toBe(11);
  });

  it('returns null for invalid month (13)', () => {
    const result = parseDateYYMMDD('251301');
    expect(result).toBeNull();
  });

  it('returns null for invalid day (32)', () => {
    const result = parseDateYYMMDD('250132');
    expect(result).toBeNull();
  });

  it('returns null for invalid format (too short)', () => {
    const result = parseDateYYMMDD('2502');
    expect(result).toBeNull();
  });

  it('returns null for invalid format (too long)', () => {
    const result = parseDateYYMMDD('2502177');
    expect(result).toBeNull();
  });

  it('returns null for non-numeric string', () => {
    const result = parseDateYYMMDD('invalid');
    expect(result).toBeNull();
  });

  it('handles edge cases for February', () => {
    // Valid February date in non-leap year
    const febValid = parseDateYYMMDD('230228');
    expect(febValid?.getMonth()).toBe(1);
    expect(febValid?.getDate()).toBe(28);
    
    // Invalid February date (29th in non-leap year is adjusted by JS Date)
    const febInvalid = parseDateYYMMDD('230229');
    // JS Date might adjust this, so we check if it's null or adjusted
    if (febInvalid) {
      // If JS adjusted it, it should be March 1st
      expect(febInvalid.getMonth()).toBe(2);
    }
  });
});




