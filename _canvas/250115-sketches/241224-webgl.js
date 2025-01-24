// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");
const eases = require("eases");
const BezierEasing = require("bezier-easing");

// random.setSeed(108);
random.setSeed(random.getRandomSeed());
console.log(random.getSeed());

const settings = {
  dimensions: [512, 512],
  fps: 24,
  duration: 4,
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl",
  attributes: { antialias: true },
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas,
  });

  // WebGL background color
  renderer.setClearColor("#f3f3f3", 1);

  // Setup a camera
  // const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100);
  const camera = new THREE.OrthographicCamera();
  camera.position.set(1, 0, -4);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  // const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();

  const palette = random.pick(palettes);

  // Setup a geometry
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const geometry = new THREE.SphereGeometry(1, 32, 16);

  // Setup a material
  const material = new THREE.MeshBasicMaterial({
    color: "#131313",
    // wireframe: true,
  });

  const GR = 1.618;

  // Setup a mesh with geometry + material
  // const mesh = new THREE.Mesh(geometry, material);
  // scene.add(mesh);

  for (let i = 0; i < 30; i++) {
    const mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshStandardMaterial({
        // color: "#131313",
        color: random.pick(palette),
        // wireframe: true,
      }),
    );

    mesh.position.set(
      random.range(-GR, GR) / 1.618,
      random.range(-GR, GR) / 1.618,
      random.range(-GR, GR) / 1.618,
      // random.gaussian(-0.3, 0.3),
      // random.gaussian(-0.3, 0.3),
      // random.gaussian(-0.3, 0.3),
    );

    mesh.scale.set(
      random.range(-GR, GR),
      random.range(-GR, GR),
      random.range(-GR, GR),
      // random.gaussian(-1, 1),
      // random.gaussian(-1, 1),
      // random.gaussian(-1, 1),
    );

    mesh.scale.multiplyScalar(0.5);

    scene.add(mesh);
  }

  scene.add(new THREE.AmbientLight("hsl(0, 0%, 12%)"));

  const light = new THREE.DirectionalLight(0xeeeeee, 1);
  light.position.set(-1, 3, 10);
  scene.add(light);

  // https://cubic-bezier.com/#.17,.67,.83,.67
  // const easeFn = BezierEasing(1, .83, .25, .1);
  const easeFn = BezierEasing(1, 0, 0, 1);

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);

      // camera.aspect = viewportWidth / viewportHeight;

      const aspect = viewportWidth / viewportHeight;

      // Ortho zoom
      const zoom = 2.2;

      // Bounds
      camera.left = -zoom * aspect;
      camera.right = zoom * aspect;
      camera.top = zoom;
      camera.bottom = -zoom;

      // Near/Far
      camera.near = -100;
      camera.far = 100;

      // Set position & look at world center
      camera.position.set(zoom, zoom, zoom);
      camera.lookAt(new THREE.Vector3());

      // Update the camera
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ /* time */ playhead }) {
      // controls.update();

      // 172149
      // scene.rotation.z = playhead * -4 * Math.PI;
      // scene.rotation.y = playhead * -4 * Math.PI;
      // scene.rotation.x = playhead * -4 * Math.PI;

      // scene.rotation.z = Math.sin(playhead * Math.PI * -2) * 4;

      const t = Math.sin(playhead * Math.PI);

      // scene.rotation.z = eases.expoInOut(t) * 6.5;
      scene.rotation.z = easeFn(t);
      scene.rotation.x = -easeFn(t);

      renderer.render(scene, camera);

      // scene.rotation.y = time * (10 * Math.PI / 100);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      // controls.dispose();
      renderer.dispose();
    },
  };
};

canvasSketch(sketch, settings);
