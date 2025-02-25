export default class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(x,y, scene, speed){
        super(x,y,scene,speed,'enemy');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

    }

    moveSideToSide(){
        
    }
}