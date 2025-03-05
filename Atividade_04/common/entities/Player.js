import Phaser from '../../phaser.js';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);

        // Initialize the cursors inside the player object
        this.cursors = scene.input.keyboard.createCursorKeys();

        // Initialize jump state variables
        this.isJumping = false;
        this.canDoubleJump = false;
    }

    // Define player-specific methods here
    update(time, delta) {
        // Movement logic
        if (this.cursors.left.isDown) {
            this.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(160);
        } else {
            this.setVelocityX(0);
        }

        // Jumping logic
        if (this.cursors.up.isDown) {
            if (this.body.touching.down) {
                this.setVelocityY(-450);  // First jump
                this.isJumping = true;
                this.canDoubleJump = true;
            } else if (this.canDoubleJump) {
                this.setVelocityY(-450);  // Double jump
                this.canDoubleJump = false;
            }
        }

        // Reset jump states when on the ground
        if (this.body.touching.down) {
            this.isJumping = false;
            this.canDoubleJump = false;
        }
    }

    // This method will be called from the scene to handle collisions with enemies
    handleFallOnEnemy(enemy) {
        // Check if the player is falling on top of the enemy (velocity.y > 0 means falling)
        if (this.body.velocity.y > 0 && this.y < enemy.y) {
            // Destroy the enemy and enable double jump
            enemy.destroy(); // Destroy the enemy (Goomba)
            //this.canDoubleJump = true; // Enable double jump

            // Optionally: Play sound or animation for killing the enemy
            console.log('Enemy killed!');
        }
    }
}
