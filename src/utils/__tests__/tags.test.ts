import { describe, it, expect } from 'vitest';
import { slugifyTag, unslugifyTag, getAllUniqueTags } from '../tags';

describe('Tags Utility', () => {
  describe('slugifyTag', () => {
    it('should convert a tag to a slug format', () => {
      expect(slugifyTag('JavaScript Tips')).toBe('javascript-tips');
      expect(slugifyTag('CSS & HTML')).toBe('css-html');
      expect(slugifyTag('Web Development 101')).toBe('web-development-101');
      expect(slugifyTag('   Spacing   Test   ')).toBe('spacing-test');
    });

    it('should handle special characters correctly', () => {
      expect(slugifyTag('Node.js')).toBe('nodejs');
      expect(slugifyTag('C++')).toBe('c');
      expect(slugifyTag('React/Redux')).toBe('reactredux');
    });
  });

  describe('unslugifyTag', () => {
    it('should convert a slug back to a readable tag', () => {
      expect(unslugifyTag('javascript-tips')).toBe('Javascript Tips');
      expect(unslugifyTag('web-development')).toBe('Web Development');
      expect(unslugifyTag('css')).toBe('Css');
    });
  });

  describe('getAllUniqueTags', () => {
    it('should extract unique tags from posts', () => {
      const mockPosts = [
        { data: { tags: ['javascript', 'web'] } },
        { data: { tags: ['javascript', 'react'] } },
        { data: { tags: ['css', 'web'] } },
        { data: {} }  // Post without tags
      ];
      
      expect(getAllUniqueTags(mockPosts)).toEqual(['css', 'javascript', 'react', 'web']);
    });

    it('should handle empty arrays', () => {
      expect(getAllUniqueTags([])).toEqual([]);
    });
  });
});