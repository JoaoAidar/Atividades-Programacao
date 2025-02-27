import Phaser from '../phaser.js';
import { gameMap } from '../utils/worldBuilder.js';
import Player from '../common/entities/Player.js';
import Coin from '../common/entities/Coin.js';
import Enemy from '../common/entities/Enemy.js'; // Import the Enemy class

export class Scene_Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene_Game' });
    }

    preload() {
        this.load.image('player', 'assets/sprPlayer.png');
        this.load.image('platform', 'assets/sprPlatform.png');
        this.load.image('coin', 'assets/sprCoin.png');
        this.load.image('enemy', 'assets/sprEnemy.png');
    }

    create() {
        this.map = gameMap;

        // Load the room (and add enemies) from the map
        this.map.loadRoomFromSprite(this, 'assets/mapScene03.png');  // This will automatically create `this.enemies`

        // Set up the camera and world bounds
        this.cameras.main.setBounds(0, 0, this.map.img.width * 64, this.map.img.height * 64);
        this.physics.world.setBounds(0, 0, this.map.img.width * 64, this.map.img.height * 64);

        // Ensure player is colliding with world bounds
        if (this.player) {
           this.player.setCollideWorldBounds(true);
        }

        this.cursors = this.input.keyboard.createCursorKeys();

        // Ensure enemies group is correctly populated
        this.enemies = this.add.group({
            classType: Enemy,  // Use your Enemy class
            runChildUpdate: true  // Automatically call update() on each child
        });

        // Make sure enemies are properly added to the group after creation
        this.map.loadRoomFromSprite(this, 'assets/mapScene03.png');
        
        // Detect collision between the player and the enemies
       // this.physics.add.overlap(this.player, this.enemies, this.handlePlayerEnemyOverlap, null, this);
    }
    


    update() {
        if (this.player) {
            this.player.update(this.cursors);
        }

        // Ensure proper handling of enemies in the group
        this.enemies.getChildren().forEach(enemy => {
            if (enemy instanceof Enemy) {  // Check if the object is an instance of the Enemy class
                enemy.update();  // Call the enemy's update method
            }
        });
    }
}
