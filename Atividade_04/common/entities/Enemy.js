export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, speed = 100) {
        super(scene, x, y, 'enemy');

        scene.add.existing(this);
        scene.physics.add.existing(this);  // Ensure dynamic body

        this.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.speed = speed;  // Make sure to store speed as a property

        console.log("Initial Velocity:", this.body.velocity.x); // Check initial velocity
    }

    update(time, delta) {
        console.log('Enemy updating:', this.x, this.y, "Velocity:", this.body.velocity.x);
        this.moveSideToSide();
    }

    moveSideToSide() {
        console.log("Blocked Left:", this.body.blocked.left, "Blocked Right:", this.body.blocked.right);

        if (this.body.blocked.left) {
            console.log("Switching to RIGHT");
            this.setVelocityX(Math.abs(this.speed));
        } else if (this.body.blocked.right) {
            console.log("Switching to LEFT");
            this.setVelocityX(-Math.abs(this.speed));
        } else {
            // If not blocked, keep moving in the current direction
            if (this.body.velocity.x === 0) {
                // If velocity is zero, start it again in a random direction
                this.setVelocityX(Math.random() > 0.5 ? Math.abs(this.speed) : -Math.abs(this.speed));
            }
        }
    }
}
