// Import the library
const canvasSketch = require("canvas-sketch");

/*
// Grab P5.js from npm
const p5 = require('p5');
// Attach p5.js it to global scope
new p5()

// Optionally preload before you load the sketch
window.preload = () => {
  // Preload sounds/images/etc...
};
 */

// Specify some output parameters
const settings = {
    // The [ width, height ] of the artwork in pixels
    // dimensions: [256, 256],

    // // Enable an animation loop
    // animate: true,
    // // Set loop duration to 3
    // duration: 3,
    // // Use a small size for better GIF file size
    // dimensions: [256, 256],
    // // Optionally specify a frame rate, defaults to 30
    // fps: 30,

    // physical print
    // physical units
    // Measurements of artwork
    dimensions: [3.5, 2],
    // Use a higher density for print resolution
    // (this defaults to 72, which is good for web)
    pixelsPerInch: 300,
    // All our units are inches
    units: "in",

    // Results in 21 x 29.7 cm
    dimensions: "A4",
    dimensions: "postcard",
    orientation: "landscape", // also supports 'portrait'
    // Include a bit of 'bleed' to the dimensions above
    bleed: 1 / 8,

    // filenaming
    // The file name without extension, defaults to current time stamp
    name: "foobar",
    // Optional prefix applied to the file name
    prefix: "artwork",
    // Optional suffix applied to the file name
    suffix: ".draft",
    // using p5js - https://github.com/mattdesl/canvas-sketch/blob/master/examples/animated-p5.js
    // Tell canvas-sketch we're using p5.js
    /* p5: true,
    // Turn on a render loop (it's off by default in canvas-sketch)
    animate: true,
    // We can specify WebGL context if we want
    context: "webgl",
    // Optional loop duration
    duration: 6,
    // Enable MSAA
    attributes: {
        antialias: true,
    }, */
};

// Start the sketch
const sketch = () => {
    // Select an initial 0..1 random, outside your renderer
    const startXScale = Math.random();
    const startYScale = Math.random();

    // Utility to draw a circle
    const circle = (context, x, y, radius, fill) => {
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2, false);
        if (fill) context.fill();
        context.stroke();
    };

    // Inside this is a bit like p5.js 'setup' function
    // ...

    // Attach events to window to receive them
    window.mouseClicked = () => {
        console.log("Mouse clicked");
    };

    return (props) => {
        // Destructure what we need from props
        const { context, width, height, playhead } = props;

        // Fill the canvas with pink
        context.fillStyle = "pink";
        context.fillRect(0, 0, width, height);

        // Now draw a white rectangle in the center
        context.strokeStyle = "white";
        context.lineWidth = 4;
        context.strokeRect(width / 4, height / 4, width / 2, height / 2);

        const startX = startXScale * width;
        const startY = startYScale * width;
        context.strokeStyle = "grey";
        context.fillStyle = "black";
        context.fillRect(startX - 25, startY - 25, 50, 50);

        // animation
        // Get a seamless 0..1 value for our loop
        const t = Math.sin(playhead * Math.PI);

        // Animate the thickness with 'playhead' prop
        const thickness = Math.max(5, Math.pow(t, 0.55) * width * 0.5);

        // Rotate with PI to create a seamless animation
        const rotation = playhead * Math.PI;

        // Draw a rotating white rectangle around the center
        const cx = width / 2;
        const cy = height / 2;
        const length = height * 0.5;
        context.fillStyle = "white";
        context.save();
        context.translate(cx, cy);
        context.rotate(rotation);
        context.fillRect(-thickness / 2, -length / 2, thickness, length);
        context.restore();

        // physical print
        // Here, the 'width' and 'height' are in inches
        // Fill the whole card with black
        context.fillStyle = "#000";
        context.fillRect(0, 0, width, height);

        // Now draw some circles with alternating radii
        // between 0.5 and 0.25 inches
        context.strokeStyle = "#fff";
        context.fillStyle = "#fff";
        context.lineWidth = 0.01;
        for (let i = 0; i < 5; i++) {
            const x = i / 4 * width;
            const y = height / 2;
            const radius = i % 2 === 0 ? 0.5 : 0.25;
            const fill = i % 4 === 0;
            circle(context, x, y, radius, fill);
        }
        const {
            exporting,
            bleed,
            trimWidth,
            trimHeight,
        } = props;

        // Visualize the trim area with a yellow guide (ignored on export)
        if (!exporting && bleed > 0) {
            context.strokeStyle = "yellow";
            context.lineWidth = 0.0075;
            context.strokeRect(bleed, bleed, trimWidth, trimHeight);
        }

        // p5js stuff
        /*
        // Draw with p5.js things
        clear();
        normalMaterial();
        rotateX(playhead * 2 * PI);
        rotateZ(playhead * 2 * PI);
        cylinder(20, 50); */
    };

    /* return {

    //setup

    // side-effects cleaning
    const timer = setInterval(() => {
        console.log("Tick!");
    });

    const onClick = () => {
        console.log("Screen clicked!");
    };
    window.addEventListener("click", onClick);
    //setup end
        render({ context, width, height, frame }) {
            //   Render your content...
            // Fill the canvas with pink
            context.fillStyle = "pink";
            context.fillRect(0, 0, width, height);

            // Now draw a white rectangle in the center
            context.strokeStyle = "white";
            context.lineWidth = 4;
            context.strokeRect(width / 4, height / 4, width / 2, height / 2);

            const startX = startXScale * width;
            const startY = startYScale * width;
            context.strokeStyle = "grey";
            context.fillStyle = "black";
            context.fillRect(startX - 25, startY - 25, 50, 50);
        },

        unload() {
            // Dispose of side-effects
            clearInterval(timer);
            window.removeEventListener("click", onClick);
        },
    }; */
};

// Start the sketch with parameters
canvasSketch(sketch, settings);
