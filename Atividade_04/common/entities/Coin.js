// Coin.js
import Phaser from '../../phaser.js';
export default class Coin extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'coin');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        //this.setBounce(1);
        //this.setVelocityY(50); // Initial upward velocity
        this.setGravityY(0); // Negative gravity to make the coin float up and down

        this.isCollected = false;
    }

    collectCoin(){
        this.isCollected = true;
        this.destroy();
    }
}


