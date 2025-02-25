// Scene_Game.js
import Phaser from '../phaser.js';
import { gameMap } from '../utils/worldBuilder.js';
import Player from '../common/entities/Player.js'; // Adjust the import path as necessary
import Coin from '../common/entities/Coin.js'; // Adjust the import path as necessary

export class Scene_Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene_Game' });
    }
    
    
    preload() {
        this.load.image('player', 'assets/sprPlayer.png');
        this.load.image('platform', 'assets/sprPlatform.png');
        this.load.image('coin', 'assets/sprCoin.png');
        this.load.image('enemy', 'assets/sprEnemy.png')
    }

    create() {
        // Create the  
        this.map = gameMap;
        this.map.loadRoomFromSprite(this, 'assets/mapScene02.png');
        
        //this.scale.resize('assets/mapScene02.png'.width, 'assets/mapScene02.png'.height)
        this.cursors = this.input.keyboard.createCursorKeys();
    }



    update() {
        if (this.player) {
            this.player.update(this.cursors);
        }
    }
}
