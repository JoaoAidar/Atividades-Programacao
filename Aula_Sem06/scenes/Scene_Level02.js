export class Scene_Level02 extends Phaser.Scene {
    constructor() {
        super("Level_02");
    }
    

    preload() {
        this.load.tilemapTiledJSON('map2', 'assets/map2.json');
        this.load.image('backgroundGame2', 'assets/background_game2.png');
        this.load.image('tiles', 'assets/tileset.png');
        this.load.image('player', 'assets/player.png');
    }

    create() {
        this.add.image(400, 300, 'backgroundGame2');
        this.player = this.physics.add.sprite(320,320,'player');
        console.log(this.player);
        
        this.add.text(100, 100, "Fase 2 - Novo Desafio", { fontSize: "32px", fill: "#fff" });
    }
}