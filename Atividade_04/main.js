
//Setamos as configurações do Phaser
import { Scene_Game } from './scenes/Scene_Game.js';
var config = {
    type: Phaser.AUTO,
    width: 640,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 500},
            debug: false
        }
    },
    scene: [Scene_Game]
};

//Instanciamos o jogo
var game = new Phaser.Game(config);

