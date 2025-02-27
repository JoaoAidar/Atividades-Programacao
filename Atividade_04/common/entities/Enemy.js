export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, speed = 100) {
        super(scene, x, y, 'enemy'); // Create the enemy sprite

        scene.add.existing(this);  // Add this sprite to the scene
        scene.physics.add.existing(this); // Add physics to this sprite

        this.setCollideWorldBounds(true);  // Keep it inside the world bounds
        this.setVelocityX(speed); // Set initial velocity

        // Store the original speed (optional, if you want to vary it later)
        this.speed = speed;
    }

    update() {
        // Move the enemy side to side
        this.moveSideToSide();
    }

    moveSideToSide() {
        // When the enemy hits the left or right boundary, reverse direction
        if (this.body.blocked.left) {
            this.setVelocityX(Math.abs(this.speed)); // Move right
            this.flipX = false; // Flip the sprite
        } else if (this.body.blocked.right) {
            this.setVelocityX(-Math.abs(this.speed)); // Move left
            this.flipX = true; // Flip the sprite
        }
    }


}
