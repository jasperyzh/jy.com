// Import canvas-sketch library
const canvasSketch = require('canvas-sketch');

// Define the sketch settings
const settings = {
    dimensions: [1024, 1024],
    animate: true,
    duration: 1
};

// Define the sketch function
const sketch = () => {
    return ({ context, width, height, playhead }) => {
        // context.fillStyle = '#ffffff';
        context.fillStyle = '#3498db';
            context.lineWidth = 13;
            context.strokeStyle = 'red';

        context.fillRect(0, 0, width, height);

        const GOLDEN_RATIO = 1.618;
        const maxRectangles = 13;

        for (let i = 1; i <= maxRectangles; i++) {
            const scale = Math.pow(GOLDEN_RATIO, i);
            const baseWidth = width / scale;
            const baseHeight = height / scale;

            const t = Math.sin(playhead * Math.PI /2); // Seamless looping factor
            const animationScale = 1 + t * 1.618; // Scale out over time
            const boxWidth = baseWidth * animationScale;
            const boxHeight = baseHeight * animationScale;

            const x = width - boxWidth;
            const y = height - boxHeight;

            context.fillRect(x, y, boxWidth, boxHeight);

            context.strokeRect(x, y, boxWidth, boxHeight);
        }
    };
};

canvasSketch(sketch, settings);
