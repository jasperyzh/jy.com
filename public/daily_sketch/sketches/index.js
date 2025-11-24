/**
 * Sketch Registry - Easy swapping of different p5.js sketches
 */
import { createSimpleGridSketch } from "./simpleGridSketch.js";
import { createDotMatrixSketch } from "./dotMatrixSketch.js";

export const sketches = {
  simpleGrid: createSimpleGridSketch,
  dotMatrix: createDotMatrixSketch,
};

/**
 * Get a sketch factory function by name
 * @param {string} name - Sketch name ('simpleGrid' or 'dotMatrix')
 * @returns {Function} Sketch factory function
 */
export function getSketch(name) {
  if (!sketches[name]) {
    console.warn(`Sketch "${name}" not found. Using "dotMatrix" as default.`);
    return sketches.dotMatrix;
  }
  return sketches[name];
}

/**
 * Get all available sketch names
 * @returns {string[]} Array of sketch names
 */
export function getSketchNames() {
  return Object.keys(sketches);
}

export default sketches;

