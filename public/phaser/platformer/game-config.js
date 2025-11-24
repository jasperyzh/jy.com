// Game Configuration
export const gameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-game',
    backgroundColor: '#1a252f',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: null, // Will be set when importing the scene
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: {
            width: 400,
            height: 300
        },
        max: {
            width: 1200,
            height: 900
        }
    }
};

// Game constants
export const GAME_CONSTANTS = {
    BALL_COLORS: [
        0xff6b6b,  // Red
        0x4ecdc4,  // Teal
        0x45b7d1,  // Blue
        0x96ceb4,  // Green
        0xfeca57,  // Yellow
        0xff9ff3,  // Pink
        0x54a0ff,  // Light Blue
        0x5f27cd   // Purple
    ],
    BALL_SIZE: {
        MIN: 15,
        MAX: 35
    },
    BALL_BOUNCE: 0.8,
    ATTRACTION_FORCE: 0.5,
    MAX_BALLS: 50
};

// Platformer constants
export const PLATFORMER_CONSTANTS = {
    PLAYER: {
        SPEED: 160,
        JUMP_VELOCITY: -600,
        SIZE: { WIDTH: 32, HEIGHT: 48 },
        COLORS: {
            NORMAL: 0x3498db,
            JUMPING: 0xe74c3c,
            GROUNDED: 0x2ecc71
        }
    },
    WORLD: {
        GRAVITY: 800,
        TILE_SIZE: 32
    },
    PLATFORMS: {
        COLOR: 0x8e44ad,
        HEIGHT: 16
    },
    COLLECTIBLES: {
        COLOR: 0xf1c40f,
        SIZE: 16,
        POINTS: 10
    }
}; 