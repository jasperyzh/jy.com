import { PLATFORMER_CONSTANTS } from './game-config.js';

export class PlatformerScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlatformerScene' });
        
        // Game state
        this.player = null;
        this.platforms = null;
        this.collectibles = null;
        this.cursors = null;
        this.wasdKeys = null;
        
        // Player state
        this.isGrounded = false;
        this.coyoteTime = 0;
        this.jumpBufferTime = 0;
        
        // Game stats
        this.score = 0;
        this.collected = 0;
        this.lives = 3;
        this.level = 1;
        this.totalCollectibles = 0;
        
        // Level data
        this.levelData = this.createLevelData();
    }

    preload() {
        // Create textures dynamically
        this.createGameTextures();
    }

    create() {
        // Set world bounds
        this.physics.world.setBounds(0, 0, 800, 600);
        this.physics.world.gravity.y = PLATFORMER_CONSTANTS.WORLD.GRAVITY;

        // Create level
        this.createLevel();
        
        // Create player
        this.createPlayer();
        
        // Setup input
        this.setupInput();
        
        // Setup collisions
        this.setupCollisions();
        
        // Setup camera
        this.setupCamera();
        
        // Update UI
        this.updateUI();
        
        // Show instructions
        this.showInstructions();
    }

    createGameTextures() {
        // Player texture (blue rectangle)
        const playerGraphics = this.add.graphics();
        playerGraphics.fillStyle(PLATFORMER_CONSTANTS.PLAYER.COLORS.NORMAL);
        playerGraphics.fillRoundedRect(0, 0, PLATFORMER_CONSTANTS.PLAYER.SIZE.WIDTH, PLATFORMER_CONSTANTS.PLAYER.SIZE.HEIGHT, 4);
        playerGraphics.generateTexture('player', PLATFORMER_CONSTANTS.PLAYER.SIZE.WIDTH, PLATFORMER_CONSTANTS.PLAYER.SIZE.HEIGHT);
        playerGraphics.destroy();

        // Platform texture (purple rectangle)
        const platformGraphics = this.add.graphics();
        platformGraphics.fillStyle(PLATFORMER_CONSTANTS.PLATFORMS.COLOR);
        platformGraphics.fillRoundedRect(0, 0, 32, PLATFORMER_CONSTANTS.PLATFORMS.HEIGHT, 2);
        platformGraphics.generateTexture('platform', 32, PLATFORMER_CONSTANTS.PLATFORMS.HEIGHT);
        platformGraphics.destroy();

        // Collectible texture (golden circle)
        const coinGraphics = this.add.graphics();
        coinGraphics.fillStyle(PLATFORMER_CONSTANTS.COLLECTIBLES.COLOR);
        coinGraphics.fillCircle(PLATFORMER_CONSTANTS.COLLECTIBLES.SIZE / 2, PLATFORMER_CONSTANTS.COLLECTIBLES.SIZE / 2, PLATFORMER_CONSTANTS.COLLECTIBLES.SIZE / 2);
        coinGraphics.generateTexture('coin', PLATFORMER_CONSTANTS.COLLECTIBLES.SIZE, PLATFORMER_CONSTANTS.COLLECTIBLES.SIZE);
        coinGraphics.destroy();

        // Ground texture (darker platform)
        const groundGraphics = this.add.graphics();
        groundGraphics.fillStyle(0x2c3e50);
        groundGraphics.fillRect(0, 0, 32, 32);
        groundGraphics.generateTexture('ground', 32, 32);
        groundGraphics.destroy();
    }

    createLevelData() {
        // Simple level layout (x, y, width in tiles)
        return {
            platforms: [
                // Ground level
                { x: 0, y: 580, width: 25, type: 'ground' },
                
                // Lower platforms
                { x: 200, y: 520, width: 4, type: 'platform' },
                { x: 350, y: 480, width: 3, type: 'platform' },
                { x: 500, y: 440, width: 4, type: 'platform' },
                
                // Mid platforms
                { x: 100, y: 400, width: 3, type: 'platform' },
                { x: 300, y: 360, width: 5, type: 'platform' },
                { x: 550, y: 320, width: 3, type: 'platform' },
                
                // Upper platforms
                { x: 150, y: 280, width: 4, type: 'platform' },
                { x: 400, y: 240, width: 3, type: 'platform' },
                { x: 600, y: 200, width: 4, type: 'platform' },
                
                // Top platforms
                { x: 50, y: 160, width: 3, type: 'platform' },
                { x: 250, y: 120, width: 6, type: 'platform' },
                { x: 500, y: 80, width: 3, type: 'platform' }
            ],
            collectibles: [
                { x: 220, y: 480 },
                { x: 365, y: 440 },
                { x: 520, y: 400 },
                { x: 115, y: 360 },
                { x: 330, y: 320 },
                { x: 565, y: 280 },
                { x: 170, y: 240 },
                { x: 415, y: 200 },
                { x: 620, y: 160 },
                { x: 65, y: 120 },
                { x: 280, y: 80 },
                { x: 520, y: 40 }
            ],
            playerStart: { x: 50, y: 500 }
        };
    }

    createLevel() {
        // Create platforms group
        this.platforms = this.physics.add.staticGroup();
        
        // Add platforms from level data
        this.levelData.platforms.forEach(platform => {
            for (let i = 0; i < platform.width; i++) {
                const x = platform.x + (i * 32);
                const y = platform.y;
                const texture = platform.type === 'ground' ? 'ground' : 'platform';
                
                const tile = this.platforms.create(x, y, texture);
                tile.setOrigin(0, 0);
                tile.body.setSize(32, platform.type === 'ground' ? 32 : PLATFORMER_CONSTANTS.PLATFORMS.HEIGHT);
            }
        });

        // Create collectibles group
        this.collectibles = this.physics.add.group();
        this.totalCollectibles = this.levelData.collectibles.length;
        
        this.levelData.collectibles.forEach(coin => {
            const collectible = this.collectibles.create(coin.x, coin.y, 'coin');
            collectible.setBounce(0.3);
            collectible.setCollideWorldBounds(true);
            
            // Add floating animation
            this.tweens.add({
                targets: collectible,
                y: collectible.y - 10,
                duration: 1000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        });
    }

    createPlayer() {
        const start = this.levelData.playerStart;
        this.player = this.physics.add.sprite(start.x, start.y, 'player');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);
        this.player.setTint(PLATFORMER_CONSTANTS.PLAYER.COLORS.NORMAL);
        
        // Player physics
        this.player.body.setGravityY(300);
        this.player.body.setSize(PLATFORMER_CONSTANTS.PLAYER.SIZE.WIDTH - 4, PLATFORMER_CONSTANTS.PLAYER.SIZE.HEIGHT);
    }

    setupInput() {
        // Arrow keys
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // WASD keys
        this.wasdKeys = this.input.keyboard.addKeys('W,S,A,D');
        
        // Additional keys
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    setupCollisions() {
        // Player-Platform collisions
        this.physics.add.collider(this.player, this.platforms, (player, platform) => {
            if (player.body.touching.down) {
                this.isGrounded = true;
                this.coyoteTime = 10; // frames
                this.updatePlayerColor();
            }
        });

        // Player-Collectible collisions
        this.physics.add.overlap(this.player, this.collectibles, this.collectCoin, null, this);
        
        // Collectible-Platform collisions
        this.physics.add.collider(this.collectibles, this.platforms);
    }

    setupCamera() {
        // Camera follows player with some bounds
        this.cameras.main.setBounds(0, 0, 800, 600);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setLerp(0.1, 0.1);
    }

    collectCoin(player, coin) {
        coin.destroy();
        
        this.collected++;
        this.score += PLATFORMER_CONSTANTS.COLLECTIBLES.POINTS;
        
        // Particle effect
        this.createCollectEffect(coin.x, coin.y);
        
        this.updateUI();
        
        // Check win condition
        if (this.collected >= this.totalCollectibles) {
            this.levelComplete();
        }
    }

    createCollectEffect(x, y) {
        // Simple particle explosion
        for (let i = 0; i < 8; i++) {
            const particle = this.add.circle(x, y, 3, PLATFORMER_CONSTANTS.COLLECTIBLES.COLOR);
            
            this.tweens.add({
                targets: particle,
                x: x + Phaser.Math.Between(-50, 50),
                y: y + Phaser.Math.Between(-50, 50),
                alpha: 0,
                duration: 500,
                ease: 'Power2',
                onComplete: () => particle.destroy()
            });
        }
    }

    update(time, delta) {
        // Handle input
        this.handleMovement();
        
        // Update timers
        if (this.coyoteTime > 0) this.coyoteTime--;
        if (this.jumpBufferTime > 0) this.jumpBufferTime--;
        
        // Check if player fell off the world
        if (this.player.y > 650) {
            this.playerDied();
        }
        
        // Reset key
        if (Phaser.Input.Keyboard.JustDown(this.rKey)) {
            this.restartLevel();
        }
        
        // Update grounded state
        this.isGrounded = this.player.body.touching.down || this.player.body.onFloor();
        this.updatePlayerColor();
    }

    handleMovement() {
        const speed = PLATFORMER_CONSTANTS.PLAYER.SPEED;
        
        // Horizontal movement
        if (this.cursors.left.isDown || this.wasdKeys.A.isDown) {
            this.player.setVelocityX(-speed);
        } else if (this.cursors.right.isDown || this.wasdKeys.D.isDown) {
            this.player.setVelocityX(speed);
        } else {
            this.player.setVelocityX(0);
        }
        
        // Jumping with jump buffering and coyote time
        const jumpPressed = this.cursors.up.isDown || this.wasdKeys.W.isDown || this.spaceKey.isDown;
        
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up) || 
            Phaser.Input.Keyboard.JustDown(this.wasdKeys.W) || 
            Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.jumpBufferTime = 5; // frames
        }
        
        if (this.jumpBufferTime > 0 && (this.isGrounded || this.coyoteTime > 0)) {
            this.player.setVelocityY(PLATFORMER_CONSTANTS.PLAYER.JUMP_VELOCITY);
            this.jumpBufferTime = 0;
            this.coyoteTime = 0;
            this.isGrounded = false;
        }
    }

    updatePlayerColor() {
        if (!this.isGrounded && this.player.body.velocity.y < 0) {
            // Jumping
            this.player.setTint(PLATFORMER_CONSTANTS.PLAYER.COLORS.JUMPING);
        } else if (this.isGrounded) {
            // Grounded
            this.player.setTint(PLATFORMER_CONSTANTS.PLAYER.COLORS.GROUNDED);
        } else {
            // Falling
            this.player.setTint(PLATFORMER_CONSTANTS.PLAYER.COLORS.NORMAL);
        }
    }

    updateUI() {
        // Update DOM elements
        const scoreElement = document.getElementById('score');
        const collectedElement = document.getElementById('collected');
        const livesElement = document.getElementById('lives');
        const levelElement = document.getElementById('level');
        
        if (scoreElement) scoreElement.textContent = this.score;
        if (collectedElement) collectedElement.textContent = `${this.collected}/${this.totalCollectibles}`;
        if (livesElement) livesElement.textContent = this.lives;
        if (levelElement) levelElement.textContent = this.level;
    }

    playerDied() {
        this.lives--;
        this.updateUI();
        
        if (this.lives <= 0) {
            this.gameOver();
        } else {
            this.respawnPlayer();
        }
    }

    respawnPlayer() {
        const start = this.levelData.playerStart;
        this.player.setPosition(start.x, start.y);
        this.player.setVelocity(0, 0);
        
        // Flash effect
        this.tweens.add({
            targets: this.player,
            alpha: 0.3,
            duration: 100,
            yoyo: true,
            repeat: 5
        });
    }

    restartLevel() {
        this.scene.restart();
    }

    levelComplete() {
        // Show completion message
        const completeText = this.add.text(400, 300, 
            'Level Complete!\nAll coins collected!\n\nPress R to restart', 
            {
                fontSize: '32px',
                fill: '#2ecc71',
                align: 'center',
                backgroundColor: 'rgba(0,0,0,0.8)',
                padding: { x: 30, y: 20 }
            }
        ).setOrigin(0.5);
        
        // Freeze player
        this.player.setVelocity(0, 0);
        this.physics.pause();
    }

    gameOver() {
        // Show game over message
        const gameOverText = this.add.text(400, 300, 
            'Game Over!\n\nPress R to restart', 
            {
                fontSize: '32px',
                fill: '#e74c3c',
                align: 'center',
                backgroundColor: 'rgba(0,0,0,0.8)',
                padding: { x: 30, y: 20 }
            }
        ).setOrigin(0.5);
        
        // Reset stats
        this.lives = 3;
        this.score = 0;
        this.collected = 0;
        
        // Freeze physics
        this.physics.pause();
    }

    showInstructions() {
        const instructText = this.add.text(400, 100, 
            'Collect all golden coins!\nArrow keys or WASD to move\nSpace/W/Up to jump', 
            {
                fontSize: '18px',
                fill: '#ffffff',
                align: 'center',
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: { x: 15, y: 10 }
            }
        ).setOrigin(0.5);
        
        // Fade out after 4 seconds
        this.tweens.add({
            targets: instructText,
            alpha: 0,
            duration: 2000,
            delay: 4000,
            onComplete: () => instructText.destroy()
        });
    }
} 