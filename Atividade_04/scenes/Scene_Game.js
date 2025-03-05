import Phaser from '../phaser.js';
import LevelManager  from '../utils/levelManager.js';
import { gameMap } from '../utils/worldBuilder.js';

export class Scene_Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene_Game' });
    }

    init(data) {
        this.levelManager = new LevelManager(this);
        this.currentLevel = data.level || 1;
    }

    preload() {
        this.load.atlas('platforms', 'assets/platform_tileset/tilesetPlatforms.png', 'assets/platform_tileset/tilesetPlatforms.json');
        this.load.image('coin', 'assets/sprCoin.png');
        this.load.image('enemy', 'assets/sprEnemy.png');
        this.load.image('player', 'assets/sprPlayer.png');
    }
        
    create() {
        // Load the map for the current level
        const mapPath = this.levelManager.getLevelMap(this.currentLevel);
        if (mapPath) {
            // Assume loadRoomFromSprite now returns an object with game entities
            const roomData = gameMap.getGameObjects();

            // Assign the objects from the returned data
            this.player = roomData.player;
            this.enemies = roomData.enemies || this.add.group();
            this.coins = roomData.coins || this.add.group();
        } else {
            console.error("No map found for level", this.currentLevel);
        }

        // Check that the player exists and has a physics body
        if (!this.player) {
            console.error("Player is undefined after loading the map!");
            return;
        }

        // Set up physics overlaps for coin collection
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
    }
    
    update(time, delta) {
        if (this.player) {
            this.player.update(time, delta); // Update player movement
        }
    
        if (this.enemies) {
            this.enemies.children.iterate(enemy => {
                if (enemy && enemy.update) {
                    enemy.update(time, delta);
                }
            });
        }
    }

    // Called when player overlaps with a coin
    collectCoin(player, coin) {
        coin.destroy();
        // Optionally update score here

        // Check if all coins have been collected
        if (this.coins.getChildren().length === 0) {
            this.loadNextLevel();
        }
    }

    loadNextLevel() {
        const nextLevel = this.levelManager.getNextLevel();
        if (nextLevel) {
            this.scene.restart({ level: nextLevel });
        } else {
            console.log("No more levels available!");
            this.scene.start('Scene_MainMenu');
        }
    }
}
