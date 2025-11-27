/**
 * @fileoverview HatchFill class for generating hatch patterns within shapes.
 * @author jy
 * @date 2025-11-06
 */

/**
 * Represents a hatch fill pattern generator that can fill shapes with parallel lines.
 * This class is designed to work with p5.js and generate SVG-compatible line segments.
 */
export default class HatchFill {
  /**
   * Creates an instance of HatchFill.
   * @param {Object} options - Configuration options
   * @param {number} options.density - Spacing between hatch lines (0.01-1.0, smaller = denser)
   * @param {number} options.angle - Angle of hatch lines in degrees (0-180)
   * @param {number} options.spacing - Alias for density (spacing between lines)
   * @param {boolean} options.crossHatch - Whether to add perpendicular cross-hatch lines
   * @param {number} options.strokeWidth - Stroke width for lines (optional, for SVG)
   * @param {boolean} options.useGlobalDensity - If true, use fixed pixel spacing instead of relative to shape size
   * @param {number} options.globalSpacing - Fixed pixel spacing when useGlobalDensity is true
   */
  constructor(options = {}) {
    this.density = options.density ?? options.spacing ?? 0.1;
    this.angle = options.angle ?? 45;
    this.crossHatch = options.crossHatch ?? false;
    this.strokeWidth = options.strokeWidth ?? 1;
    this.useGlobalDensity = options.useGlobalDensity ?? false;
    this.globalSpacing = options.globalSpacing ?? 5; // Default 5 pixels
  }

  /**
   * Generate hatch lines for a circle.
   * @param {number} cx - Center x coordinate
   * @param {number} cy - Center y coordinate
   * @param {number} radius - Radius of the circle
   * @returns {Array} Array of line segments [{x1, y1, x2, y2}, ...]
   */
  fillCircle(cx, cy, radius) {
    const isInside = (px, py) => {
      const dx = px - cx;
      const dy = py - cy;
      return dx * dx + dy * dy <= radius * radius;
    };

    const bounds = {
      minX: cx - radius,
      minY: cy - radius,
      maxX: cx + radius,
      maxY: cy + radius,
      width: radius * 2,
      height: radius * 2,
    };

    return this._generateHatchLines(bounds, isInside);
  }

  /**
   * Generate hatch lines for a rectangle.
   * @param {number} x - Top-left x coordinate
   * @param {number} y - Top-left y coordinate
   * @param {number} w - Width
   * @param {number} h - Height
   * @returns {Array} Array of line segments [{x1, y1, x2, y2}, ...]
   */
  fillRect(x, y, w, h) {
    const isInside = (px, py) => {
      return px >= x && px <= x + w && py >= y && py <= y + h;
    };

    const bounds = {
      minX: x,
      minY: y,
      maxX: x + w,
      maxY: y + h,
      width: w,
      height: h,
    };

    return this._generateHatchLines(bounds, isInside);
  }

  /**
   * Generate hatch lines for a polygon.
   * @param {Array} vertices - Array of {x, y} vertices
   * @returns {Array} Array of line segments [{x1, y1, x2, y2}, ...]
   */
  fillPolygon(vertices) {
    // Point in polygon test using ray casting algorithm
    const isInside = (px, py) => {
      let inside = false;
      for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
        const xi = vertices[i].x;
        const yi = vertices[i].y;
        const xj = vertices[j].x;
        const yj = vertices[j].y;

        const intersect =
          yi > py !== yj > py &&
          px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;
        if (intersect) inside = !inside;
      }
      return inside;
    };

    const minX = Math.min(...vertices.map((v) => v.x));
    const minY = Math.min(...vertices.map((v) => v.y));
    const maxX = Math.max(...vertices.map((v) => v.x));
    const maxY = Math.max(...vertices.map((v) => v.y));

    const bounds = {
      minX,
      minY,
      maxX,
      maxY,
      width: maxX - minX,
      height: maxY - minY,
    };

    return this._generateHatchLines(bounds, isInside);
  }

  /**
   * Generate hatch lines for text.
   * @param {string} text - The text string to fill
   * @param {number} x - X position of text baseline
   * @param {number} y - Y position of text baseline
   * @param {number} fontSize - Font size in pixels
   * @param {p5.Font} font - p5.Font object (must be loaded)
   * @param {Object} options - Additional options
   * @param {number} options.sampleFactor - Sampling factor for textToPoints (default: 0.1)
   * @returns {Array} Array of line segments [{x1, y1, x2, y2}, ...]
   */
  fillText(text, x, y, fontSize, font, options = {}) {
    if (!font || !font.textToPoints) {
      console.warn('HatchFill.fillText: font not provided or textToPoints not available');
      return [];
    }

    const sampleFactor = options.sampleFactor ?? 0.1;
    const allLines = [];

    try {
      // Get text outline points
      const points = font.textToPoints(text, x, y, fontSize, {
        sampleFactor: sampleFactor,
      });

      if (points.length === 0) {
        return [];
      }

      // Group points into separate paths (for letters with holes)
      const paths = this._groupPointsIntoPaths(points);

      // Apply hatchfill to each path
      for (const path of paths) {
        if (path.length < 3) continue; // Need at least 3 points for a polygon

        // Convert points to vertices format {x, y}
        const vertices = path.map((pt) => ({ x: pt.x, y: pt.y }));

        // Use existing fillPolygon method
        const pathLines = this.fillPolygon(vertices);
        allLines.push(...pathLines);
      }
    } catch (error) {
      console.error('HatchFill.fillText error:', error);
      return [];
    }

    return allLines;
  }

  /**
   * Group text points into separate paths (handles letters with holes).
   * @private
   * @param {Array} points - Array of p5.Vector points from textToPoints
   * @returns {Array} Array of point arrays, each representing a separate path
   */
  _groupPointsIntoPaths(points) {
    if (points.length === 0) return [];

    const paths = [];
    const used = new Set();
    const distanceThreshold = 5; // Pixels - points closer than this are considered connected

    // Find all separate paths by following connected points
    for (let i = 0; i < points.length; i++) {
      if (used.has(i)) continue;

      const currentPath = [points[i]];
      used.add(i);
      let currentIdx = i;
      let foundNext = true;

      // Follow the path by finding the nearest unused point
      while (foundNext) {
        foundNext = false;
        let nearestIdx = -1;
        let nearestDist = Infinity;

        for (let j = 0; j < points.length; j++) {
          if (used.has(j)) continue;

          const dist = this._pointDistance(
            points[currentIdx],
            points[j]
          );

          if (dist < distanceThreshold && dist < nearestDist) {
            nearestDist = dist;
            nearestIdx = j;
            foundNext = true;
          }
        }

        if (foundNext) {
          currentPath.push(points[nearestIdx]);
          used.add(nearestIdx);
          currentIdx = nearestIdx;
        }
      }

      // Only add paths with enough points
      if (currentPath.length >= 3) {
        paths.push(currentPath);
      }
    }

    // If no paths found (all points too far apart), return single path with all points
    if (paths.length === 0 && points.length > 0) {
      paths.push(points);
    }

    return paths;
  }

  /**
   * Calculate distance between two points.
   * @private
   * @param {p5.Vector|Object} p1 - First point with x, y properties
   * @param {p5.Vector|Object} p2 - Second point with x, y properties
   * @returns {number} Distance between points
   */
  _pointDistance(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Core algorithm to generate hatch lines within a bounded shape.
   * @private
   * @param {Object} bounds - Bounding box {minX, minY, maxX, maxY, width, height}
   * @param {Function} isInside - Function to test if a point is inside the shape
   * @returns {Array} Array of line segments [{x1, y1, x2, y2}, ...]
   */
  _generateHatchLines(bounds, isInside) {
    const lines = [];
    const angleRad = (this.angle * Math.PI) / 180;
    
    // Use global spacing if enabled, otherwise relative to shape size
    let spacing = this.useGlobalDensity
      ? this.globalSpacing
      : this.density * Math.min(bounds.width, bounds.height);
    
    // Ensure minimum spacing for very small shapes
    const minDimension = Math.min(bounds.width, bounds.height);
    if (!this.useGlobalDensity && spacing > minDimension * 0.8) {
      spacing = minDimension * 0.3; // Fallback to 30% of smallest dimension
    }
    
    // Ensure spacing is at least 0.5 pixels
    spacing = Math.max(spacing, 0.5);

    // Calculate diagonal to ensure full coverage
    const diagonal = Math.sqrt(
      bounds.width * bounds.width + bounds.height * bounds.height
    );

    // Generate primary hatch lines
    lines.push(...this._generateParallelLines(bounds, isInside, angleRad, spacing, diagonal));

    // Generate cross-hatch lines if enabled
    if (this.crossHatch) {
      const crossAngle = angleRad + Math.PI / 2;
      lines.push(...this._generateParallelLines(bounds, isInside, crossAngle, spacing, diagonal));
    }

    return lines;
  }

  /**
   * Generate parallel lines at a given angle.
   * @private
   * @param {Object} bounds - Bounding box
   * @param {Function} isInside - Point-in-shape test function
   * @param {number} angleRad - Angle in radians
   * @param {number} spacing - Spacing between lines
   * @param {number} diagonal - Diagonal length for coverage
   * @returns {Array} Array of line segments
   */
  _generateParallelLines(bounds, isInside, angleRad, spacing, diagonal) {
    const lines = [];
    const cosAngle = Math.cos(angleRad);
    const sinAngle = Math.sin(angleRad);

    // Calculate the perpendicular direction for offset
    const perpX = -sinAngle;
    const perpY = cosAngle;

    // Number of lines needed to cover the shape
    // Ensure we have enough lines even for small spacing or small shapes
    let numLines = 1;
    if (spacing > 0 && spacing < diagonal) {
      numLines = Math.max(Math.ceil(diagonal / spacing) + 2, 2);
    } else if (spacing >= diagonal) {
      // If spacing is larger than diagonal, just try one line through center
      numLines = 1;
    } else {
      // Fallback: ensure at least 2 lines
      numLines = 2;
    }
    // Ensure at least 1 line for very small shapes
    numLines = Math.max(numLines, 1);

    // Generate lines
    for (let i = -numLines; i <= numLines; i++) {
      const offset = i * spacing;
      const line = this._clipLineToShape(
        bounds,
        isInside,
        angleRad,
        offset,
        perpX,
        perpY,
        diagonal
      );
      if (line) {
        lines.push(line);
      }
    }

    return lines;
  }

  /**
   * Clip a line to the shape boundary.
   * @private
   * @param {Object} bounds - Bounding box
   * @param {Function} isInside - Point-in-shape test function
   * @param {number} angleRad - Angle in radians
   * @param {number} offset - Perpendicular offset
   * @param {number} perpX - Perpendicular x component
   * @param {number} perpY - Perpendicular y component
   * @param {number} diagonal - Diagonal length
   * @returns {Object|null} Line segment {x1, y1, x2, y2} or null if no valid segment
   */
  _clipLineToShape(bounds, isInside, angleRad, offset, perpX, perpY, diagonal) {
    const cosAngle = Math.cos(angleRad);
    const sinAngle = Math.sin(angleRad);

    // Center point of the bounding box
    const centerX = (bounds.minX + bounds.maxX) / 2;
    const centerY = (bounds.minY + bounds.maxY) / 2;

    // Sample points along the line to find intersections with shape boundary
    // Use finer precision for better accuracy, especially for small shapes
    const minDimension = Math.min(bounds.width, bounds.height);
    const precision = Math.max(minDimension / 200, 0.05); // At least 0.05 pixel precision for small shapes
    const linePoints = [];

    // Sample along the line direction with finer steps
    const stepSize = Math.max(precision, 0.05);
    for (let t = -diagonal * 1.1; t <= diagonal * 1.1; t += stepSize) {
      // Calculate point on the line
      const px = centerX + offset * perpX + t * cosAngle;
      const py = centerY + offset * perpY + t * sinAngle;

      // Check if point is inside the shape
      if (isInside(px, py)) {
        linePoints.push({ x: px, y: py });
      }
    }

    // If we have points, create line segments from continuous groups
    if (linePoints.length < 2) {
      return null;
    }

    // Group consecutive points into line segments
    const segments = [];
    let currentSegment = [linePoints[0]];

    for (let i = 1; i < linePoints.length; i++) {
      const prev = linePoints[i - 1];
      const curr = linePoints[i];
      const dist = Math.sqrt(
        (curr.x - prev.x) ** 2 + (curr.y - prev.y) ** 2
      );

      // If points are close, continue the segment
      if (dist < precision * 3) {
        currentSegment.push(curr);
      } else {
        // Start a new segment
        if (currentSegment.length > 1) {
          segments.push({
            x1: currentSegment[0].x,
            y1: currentSegment[0].y,
            x2: currentSegment[currentSegment.length - 1].x,
            y2: currentSegment[currentSegment.length - 1].y,
          });
        }
        currentSegment = [curr];
      }
    }

    // Add the last segment
    if (currentSegment.length > 1) {
      segments.push({
        x1: currentSegment[0].x,
        y1: currentSegment[0].y,
        x2: currentSegment[currentSegment.length - 1].x,
        y2: currentSegment[currentSegment.length - 1].y,
      });
    }

    // Return the longest segment for now (can be improved to return all segments)
    if (segments.length === 0) {
      return null;
    }

    // Find the longest segment
    let longestSegment = segments[0];
    let maxLength = 0;
    for (const seg of segments) {
      const length = Math.sqrt(
        (seg.x2 - seg.x1) ** 2 + (seg.y2 - seg.y1) ** 2
      );
      if (length > maxLength) {
        maxLength = length;
        longestSegment = seg;
      }
    }

    return longestSegment;
  }
}

