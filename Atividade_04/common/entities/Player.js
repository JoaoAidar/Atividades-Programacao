// Player.js
import Phaser from '../../phaser.js';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        // Additional player-specific setup can go here
    }

    // Define player-specific methods here
    update(cursors) {
        if (cursors.left.isDown) {
            this.setVelocityX(-160);
            //this.anims.play('left', true);
        } else if (cursors.right.isDown) {
            this.setVelocityX(160);
            //this.anims.play('right', true);
        } else {
            this.setVelocityX(0);
            //this.anims.play('turn');
        }

        if (cursors.up.isDown && this.body.touching.down) {
            this.setVelocityY(-450);
        }
    }
}
