// Scene_Game.js
import Phaser from '../phaser.js';
import { GameMap } from '../utils/worldBuilder.js';
import Player from '../common/Player.js'; // Adjust the import path as necessary
import Coin from '../common/Coin.js'; // Adjust the import path as necessary

export class Scene_Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene_Game' });
    }

    preload() {
        this.load.image('player', 'assets/sprPlayer.png');
        this.load.image('platform', 'assets/sprPlatform.png');
        this.load.image('coin', 'assets/sprCoin.png');
    }

    create() {
        const platforms = this.physics.add.staticGroup();
        this.GameMap = new GameMap('assets/mapScene01.png');

        this.GameMap.load().then(() => {
            const myObjects = this.GameMap.createGameObjectsArray();

            myObjects.forEach(obj => {
                switch (obj.type) {
                    case 'player':
                        this.player = new Player(this, obj.x * 64, obj.y * 64);
                        break;
                    case 'platform':
                        const platform = platforms.create(obj.x * 64 + 32, obj.y * 64 + 32, 'platform');
                        platform.body.immovable = true;
                        platform.body.allowGravity = false;
                        break;
                    case 'coin':
                        this.coin = new Coin(this, obj.x * 64, obj.y * 64);
                        break;
                }
            });

            this.physics.add.collider(this.player, platforms);
            this.physics.add.collider(this.coin, platforms);
        }).catch(err => console.error(err));

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.player) {
            this.player.update(this.cursors);
        }
    }
}
