import Phaser from '../phaser.js';
import LevelManager from '../utils/levelManager.js';
import { gameMap } from '../utils/worldBuilder.js';

export class Scene_Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene_Game' });
        /** @type {Phaser.Physics.Arcade.Collider[]} */
        this.physicsHandlers = [];
    }

    /**
     * Initialize the scene.
     * Here we set up the level manager and determine which level to load.
     * @param {object} data - Data passed to the scene (e.g., level number)
     */
    init(data) {
        const manager = this.scene.manager;
        if (!manager.levelManager) {
            manager.levelManager = new LevelManager(this);
        }
        this.levelManager = manager.levelManager;
        this.currentLevel = data.level || 1;
    }

    /**
     * Preload game assets.
     * Assets are loaded only once, checking if they already exist.
     */
    preload() {
        if (!this.textures.exists('platforms')) {
            this.load.atlas(
                'platforms',
                'assets/platform_tileset/tilesetPlatforms.png',
                'assets/platform_tileset/tilesetPlatforms.json'
            );
            this.load.image('coin', 'assets/sprCoin.png');
            this.load.image('enemy', 'assets/sprEnemy.png');
            this.load.image('player', 'assets/sprPlayer.png');
        }
    }

    /**
     * Create the scene.
     * Loads the level map, sets up the physics, and initializes the camera.
     */
    create() {
        // Get the map path from the level manager for the current level.
        const mapPath = this.levelManager.getLevelMap(this.currentLevel);
        if (!mapPath) {
            console.error(`No map found for level ${this.currentLevel}`);
            return;
        }

        // Load the map into the scene.
        // gameMap.loadIntoScene returns a texture reference used for cleanup.
        this.mapTexture = gameMap.loadIntoScene(this, mapPath);

        // Once the level is fully loaded, set up the physics and camera.
        this.events.once('levelLoaded', () => {
            if (!this.player) {
                console.error('Player not found after loading the map!');
                return;
            }
            this.setupPhysics();
            this.setupCamera();
        });
    }

    /**
     * The main update loop.
     * Calls update on the player and each enemy.
     * @param {number} time - Current time
     * @param {number} delta - Time elapsed since last update
     */
    update(time, delta) {
        this.player?.update(time, delta);
        //console.log(this.enemies?.getChildren());
        this.enemies?.getChildren().forEach(enemy => enemy?.update?.(time, delta));
    }

    /**
     * Clean up the scene when it shuts down.
     * Destroys display objects, physics objects, textures, and clears event listeners.
     */
    shutdown() {
        // Destroy all display objects.
        this.children.destroy();

        // Shutdown the physics world and destroy stored physics handlers.
        this.physics.world.shutdown();
        this.physicsHandlers.forEach(handler => handler.destroy());
        this.physicsHandlers = [];

        // Destroy groups and containers.
        this.enemies?.destroy();
        this.coins?.destroy();
        this.tilemapLayer?.destroy();

        // Remove the map texture if it exists.
        if (this.mapTexture && this.textures.exists(this.mapTexture)) {
            this.textures.remove(this.mapTexture);
        }

        // Clear references to avoid memory leaks.
        this.player = null;
        this.enemies = null;
        this.coins = null;
        this.tilemapLayer = null;
        this.mapTexture = null;

        // Remove all event listeners, time events, and stop all sounds.
        this.events.removeAllListeners();
        this.time.removeAllEvents();
        this.sound.stopAll();
    }

    /**
     * Set up physics interactions.
     * In this example, an overlap is created between the player and coins.
     */
    setupPhysics() {
        if (!this.player) return;
    
        // Overlap with coins
        const coinOverlap = this.physics.add.overlap(
            this.player,
            this.coins,
            this._collectCoin,
            null,
            this
        );
        this.physicsHandlers.push(coinOverlap);
    
        // Collision with enemies
        const enemyCollision = this.physics.add.overlap(
            this.player,
            this.enemies,
            this._handlePlayerEnemyCollision,
            null,
            this
        );
        this.physicsHandlers.push(enemyCollision);
    }
    _handlePlayerEnemyCollision(player, enemy) {
        // Call the method to handle the falling-on-enemy mechanic
        player.handleFallOnEnemy(enemy);
    }
    /**
     * Handle coin collection.
     * Destroys the coin and checks if all coins have been collected to move to the next level.
     * @param {Phaser.GameObjects.GameObject} player - The player object
     * @param {Phaser.GameObjects.GameObject} coin - The coin object
     */
    _collectCoin(player, coin) {
        coin.destroy();
        if (this.coins?.countActive(true) === 0) {
            this.levelManager.nextLevel();
        }
    }

    /**
     * Set up the camera to follow the player.
     * Configures the camera's follow behavior, zoom, and world bounds.
     */
    setupCamera() {
        if (!this.player) {
            console.error('Camera setup failed: player not found.');
            return;
        }
        
        // Get the main camera from the scene.
        const camera = this.cameras.main;
        // Configure the camera to smoothly follow the player.
        // The second parameter (true) enables smooth following, while 0.08 is the lerp value.
        camera.startFollow(this.player, true, 0.08, 0.08);
        
        // Determine world bounds for the camera.
        // If your levelManager provides world dimensions, use those; otherwise default to scene size.
        const worldWidth = this.levelManager.getWorldWidth ? this.levelManager.getWorldWidth() : this.scale.width;
        const worldHeight = this.levelManager.getWorldHeight ? this.levelManager.getWorldHeight() : this.scale.height;
        camera.setBounds(0, 0, worldWidth, worldHeight);
        
        // Optionally set camera zoom. Adjust as needed.
        camera.setZoom(1);
        
        // Optionally, you can set a deadzone to allow some leeway before the camera moves.
        // camera.setDeadzone(100, 100);
        
        console.log('Camera has been set up to follow the player.');
    }
}
