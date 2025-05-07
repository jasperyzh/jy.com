---
title: canvas-sketch Refresh Patterns Documentation
description: "canvas-sketch's two approaches for updating and refreshing a canvas-sketch: flag-based refreshing and direct rendering with the sketch manager."
pubDate: 250506
draft: 0
---
# canvas-sketch Refresh Patterns Documentation

## Overview
This document explains two approaches for updating and refreshing a canvas-sketch: flag-based refreshing and direct rendering with the sketch manager.

## Background
In canvas-sketch applications, there are different ways to trigger updates to the visual content. Understanding these approaches helps create more responsive and efficient applications.

## Approaches to Refreshing Sketches

### 1. Flag-Based Approach

The flag-based approach uses a boolean variable to indicate that a refresh is needed in the next animation frame.

#### Implementation:
```javascript
// Setup
const sketch = () => {
  let sketch_needs_update = false;
  
  // Event listener
  document.addEventListener("keypress", (event) => {
    if (event.key === " ") {
      sketch_needs_update = true;
      console.log("Update requested");
    }
  });
  
  // Render function
  return ({ context, width, height }) => {
    // Check if update is needed
    if (sketch_needs_update) {
      // Perform update actions
      regenerateElements();
      sketch_needs_update = false;
    }
    
    // Draw everything
    drawElements(context);
  };
};
```

#### How It Works:
1. Set a flag variable when an update is requested
2. Wait for the next animation frame to occur naturally
3. Check the flag during rendering and perform updates if needed
4. Reset the flag after updating

#### Advantages:
- Simple to implement
- Works with canvas-sketch's animation loop

#### Disadvantages:
- Requires two animation frames to see changes
- Creates a delay in visual feedback
- Less responsive to user input

### 2. Direct Manager Approach

The direct manager approach uses canvas-sketch's manager to force an immediate redraw.

#### Implementation:
```javascript
// Setup
const sketch = () => {
  // Render function
  return ({ context, width, height }) => {
    // Draw everything
    drawElements(context);
  };
};

// Run sketch and store manager
canvasSketch(sketch, settings).then(mgr => {
  window.sketchManager = mgr;
  
  // Event listener with direct rendering
  document.addEventListener("keypress", (event) => {
    if (event.key === " ") {
      // Perform update actions immediately
      regenerateElements();
      console.log("Update performed");
      
      // Force a redraw
      window.sketchManager.render();
    }
  });
});
```

#### How It Works:
1. Store the canvas-sketch manager object after initialization
2. When an update is needed, make changes to the data
3. Call `manager.render()` to force an immediate redraw
4. See changes instantly without waiting for the next animation frame

#### Advantages:
- Immediate visual feedback
- More responsive to user input
- Cleaner code without flag management

#### Disadvantages:
- Requires access to the manager object
- Slightly more complex setup

## Manager Object Capabilities

The canvas-sketch manager provides several useful methods:

- `manager.render()` - Force a single render frame
- `manager.play()` - Start or resume the animation loop
- `manager.pause()` - Pause the animation loop
- `manager.toggle()` - Toggle between play/pause
- `manager.stop()` - Stop the animation loop completely
- `manager.frame([n])` - Render a specific frame

## Example: Comparison of Both Approaches

```javascript
// FLAG-BASED APPROACH
// ------------------
const sketchWithFlag = () => {
  let needsUpdate = false;
  
  document.addEventListener("keypress", (e) => {
    if (e.key === " ") {
      needsUpdate = true; // Set flag, wait for next frame
    }
  });
  
  return ({ context }) => {
    if (needsUpdate) {
      updateData();     // Actually update in next frame
      needsUpdate = false;
    }
    renderContent(context);
  };
};

// MANAGER APPROACH
// ---------------
const sketchWithManager = () => {
  return ({ context }) => {
    renderContent(context);
  };
};

canvasSketch(sketchWithManager, settings).then(mgr => {
  window.sketchManager = mgr;
  
  document.addEventListener("keypress", (e) => {
    if (e.key === " ") {
      updateData();     // Update immediately
      mgr.render();     // Render immediately
    }
  });
});
```

## Conclusion

For the most responsive user experience, the direct manager approach is recommended as it provides immediate visual feedback. The flag-based approach is simpler but introduces a delay in visual updates.

Choose the approach that best suits your application's needs based on the desired responsiveness and complexity.
