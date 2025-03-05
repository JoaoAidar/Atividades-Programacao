import Phaser from '../../phaser.js';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        
        // Initialize the cursors inside the player object
        this.cursors = scene.input.keyboard.createCursorKeys();

    }

    // Define player-specific methods here
    update(time, delta) {
        if (this.cursors.left.isDown) {
            this.setVelocityX(-160);
            //this.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(160);
            //this.anims.play('right', true);
        } else {
            this.setVelocityX(0);
            //this.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.body.touching.down) {
            this.setVelocityY(-450);
        }
    }
}
