import { GAME_CONSTANTS } from './game-config.js';

export class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.balls = [];
        this.cursors = null;
        this.mousePointer = null;
        this.ballCount = 0;
        this.fpsText = null;
        this.attractionMode = false;
    }

    preload() {
        // Create colored circle textures dynamically
        this.createBallTextures();
    }

    create() {
        // Set world bounds with collision
        this.physics.world.setBoundsCollision(true, true, true, true);
        
        // Create physics group for balls
        this.ballsGroup = this.physics.add.group({
            bounceX: GAME_CONSTANTS.BALL_BOUNCE,
            bounceY: GAME_CONSTANTS.BALL_BOUNCE,
            collideWorldBounds: true
        });

        // Input handling
        this.input.on('pointerdown', this.addBall, this);
        this.input.on('pointermove', this.updateMousePosition, this);
        
        // Keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        
        // Add some initial balls
        this.addInitialBalls();
        
        // UI Text (will be invisible in game canvas but we'll update DOM)
        this.updateUI();
        
        // Welcome message
        this.showWelcomeMessage();
    }

    createBallTextures() {
        GAME_CONSTANTS.BALL_COLORS.forEach((color, index) => {
            const graphics = this.add.graphics();
            graphics.fillStyle(color);
            graphics.fillCircle(32, 32, 30);
            graphics.generateTexture(`ball_${index}`, 64, 64);
            graphics.destroy();
        });
    }

    addInitialBalls() {
        // Add 3 initial balls
        for (let i = 0; i < 3; i++) {
            this.addBall({
                x: Phaser.Math.Between(100, 700),
                y: Phaser.Math.Between(100, 200)
            });
        }
    }

    addBall(pointer) {
        if (this.ballsGroup.children.size >= GAME_CONSTANTS.MAX_BALLS) {
            return;
        }

        const x = pointer.x || Phaser.Math.Between(50, 750);
        const y = pointer.y || Phaser.Math.Between(50, 200);
        
        // Random ball properties
        const colorIndex = Phaser.Math.Between(0, GAME_CONSTANTS.BALL_COLORS.length - 1);
        const size = Phaser.Math.Between(GAME_CONSTANTS.BALL_SIZE.MIN, GAME_CONSTANTS.BALL_SIZE.MAX);
        
        // Create ball sprite
        const ball = this.physics.add.sprite(x, y, `ball_${colorIndex}`);
        ball.setScale(size / 32); // Scale based on texture size
        ball.setBounce(GAME_CONSTANTS.BALL_BOUNCE);
        ball.setCollideWorldBounds(true);
        
        // Add some initial velocity
        ball.setVelocity(
            Phaser.Math.Between(-200, 200),
            Phaser.Math.Between(-100, 100)
        );
        
        // Add to group
        this.ballsGroup.add(ball);
        
        // Store additional properties
        ball.originalColor = colorIndex;
        ball.attractionStrength = Phaser.Math.FloatBetween(0.3, 0.7);
        
        this.updateUI();
    }

    updateMousePosition(pointer) {
        this.mousePointer = pointer;
    }

    update(time, delta) {
        // Handle keyboard input
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.resetBalls();
        }
        
        if (Phaser.Input.Keyboard.JustDown(this.rKey)) {
            this.randomizeBallColors();
        }
        
        // Apply mouse attraction to balls
        if (this.mousePointer && this.ballsGroup) {
            this.ballsGroup.children.entries.forEach(ball => {
                this.applyMouseAttraction(ball);
            });
        }
        
        // Update UI
        this.updateUI();
    }

    applyMouseAttraction(ball) {
        const distance = Phaser.Math.Distance.Between(
            ball.x, ball.y, 
            this.mousePointer.x, this.mousePointer.y
        );
        
        if (distance < 200) { // Attraction radius
            const force = (200 - distance) / 200 * GAME_CONSTANTS.ATTRACTION_FORCE * ball.attractionStrength;
            const angle = Phaser.Math.Angle.Between(
                ball.x, ball.y,
                this.mousePointer.x, this.mousePointer.y
            );
            
            ball.body.velocity.x += Math.cos(angle) * force;
            ball.body.velocity.y += Math.sin(angle) * force;
            
            // Limit velocity
            const maxVel = 400;
            if (ball.body.velocity.x > maxVel) ball.body.velocity.x = maxVel;
            if (ball.body.velocity.x < -maxVel) ball.body.velocity.x = -maxVel;
            if (ball.body.velocity.y > maxVel) ball.body.velocity.y = maxVel;
            if (ball.body.velocity.y < -maxVel) ball.body.velocity.y = -maxVel;
        }
    }

    resetBalls() {
        this.ballsGroup.clear(true, true);
        this.addInitialBalls();
        this.updateUI();
    }

    randomizeBallColors() {
        this.ballsGroup.children.entries.forEach(ball => {
            const newColorIndex = Phaser.Math.Between(0, GAME_CONSTANTS.BALL_COLORS.length - 1);
            ball.setTexture(`ball_${newColorIndex}`);
            ball.originalColor = newColorIndex;
        });
    }

    updateUI() {
        // Update DOM elements
        const ballCountElement = document.getElementById('ball-count');
        const fpsElement = document.getElementById('fps');
        
        if (ballCountElement) {
            ballCountElement.textContent = this.ballsGroup ? this.ballsGroup.children.size : 0;
        }
        
        if (fpsElement) {
            fpsElement.textContent = Math.round(this.game.loop.actualFps);
        }
    }

    showWelcomeMessage() {
        // Create a temporary text overlay
        const welcomeText = this.add.text(400, 300, 
            'Click anywhere to add bouncing balls!\nMove mouse to attract them\nSpace: Reset | R: Change colors', 
            {
                fontSize: '24px',
                fill: '#ffffff',
                align: 'center',
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: { x: 20, y: 10 }
            }
        ).setOrigin(0.5);
        
        // Fade out after 4 seconds
        this.tweens.add({
            targets: welcomeText,
            alpha: 0,
            duration: 2000,
            delay: 4000,
            onComplete: () => welcomeText.destroy()
        });
    }
} 