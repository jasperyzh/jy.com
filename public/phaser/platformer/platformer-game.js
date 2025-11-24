import { gameConfig } from './game-config.js';
import { PlatformerScene } from './platformer-scene.js';

// Initialize the platformer game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initPlatformerGame();
});

function initPlatformerGame() {
    // Create platformer-specific config
    const platformerConfig = {
        ...gameConfig,
        scene: PlatformerScene,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 800 },
                debug: false
            }
        }
    };
    
    // Create the Phaser game instance
    const game = new Phaser.Game(platformerConfig);
    
    // Global game reference for debugging
    window.phaserGame = game;
    
    // Add some debugging info
    console.log('🏃 Phaser3 Platformer Game Initialized');
    console.log('Game Config:', platformerConfig);
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
window.platformerUtils = {
    restartLevel: () => {
        const scene = window.phaserGame.scene.getScene('PlatformerScene');
        if (scene) {
            scene.restartLevel();
        }
    },
    
    togglePhysicsDebug: () => {
        const scene = window.phaserGame.scene.getScene('PlatformerScene');
        if (scene) {
            scene.physics.world.drawDebug = !scene.physics.world.drawDebug;
            scene.physics.world.debugGraphic.clear();
        }
    },
    
    getPlayerPosition: () => {
        const scene = window.phaserGame.scene.getScene('PlatformerScene');
        if (scene && scene.player) {
            return { x: scene.player.x, y: scene.player.y };
        }
        return null;
    },
    
    getGameStats: () => {
        const scene = window.phaserGame.scene.getScene('PlatformerScene');
        if (scene) {
            return {
                score: scene.score,
                collected: scene.collected,
                total: scene.totalCollectibles,
                lives: scene.lives,
                level: scene.level
            };
        }
        return null;
    },
    
    addLife: () => {
        const scene = window.phaserGame.scene.getScene('PlatformerScene');
        if (scene) {
            scene.lives++;
            scene.updateUI();
        }
    }
};

// Export for use in other modules if needed
export { initPlatformerGame }; 