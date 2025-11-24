import { gameConfig } from './game-config.js';
import { MainScene } from './main-scene.js';

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initGame();
});

function initGame() {
    // Set the scene in the config
    gameConfig.scene = MainScene;
    
    // Create the Phaser game instance
    const game = new Phaser.Game(gameConfig);
    
    // Global game reference for debugging
    window.phaserGame = game;
    
    // Add some debugging info
    console.log('🎮 Phaser3 Basic Game Initialized');
    console.log('Game Config:', gameConfig);
    console.log('Game Instance:', game);
    
    // Add event listeners for page visibility
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            game.pause();
        } else {
            game.resume();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        game.scale.refresh();
    });
    
    return game;
}

// Utility functions for external control
window.gameUtils = {
    addRandomBall: () => {
        const scene = window.phaserGame.scene.getScene('MainScene');
        if (scene) {
            scene.addBall({
                x: Phaser.Math.Between(50, 750),
                y: Phaser.Math.Between(50, 200)
            });
        }
    },
    
    resetGame: () => {
        const scene = window.phaserGame.scene.getScene('MainScene');
        if (scene) {
            scene.resetBalls();
        }
    },
    
    togglePhysicsDebug: () => {
        const scene = window.phaserGame.scene.getScene('MainScene');
        if (scene) {
            scene.physics.world.debugGraphic.visible = !scene.physics.world.debugGraphic.visible;
        }
    },
    
    getBallCount: () => {
        const scene = window.phaserGame.scene.getScene('MainScene');
        return scene ? scene.ballsGroup.children.size : 0;
    }
};

// Export for use in other modules if needed
export { initGame }; 