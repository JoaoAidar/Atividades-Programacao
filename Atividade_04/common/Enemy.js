export default class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(x,y, scene, speed){
        this.x = x;
        this.y = y;
        this.scene = scene;
        this.speed = speed;
    }

    
}