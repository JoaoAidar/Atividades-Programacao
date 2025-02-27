
//Setamos as configurações do Phaser
import { Scene_Game } from './scenes/Scene_Game.js';
import { Scene_MainMenu } from './scenes/Scene_MainMenu.js';
var config = {
    type: Phaser.AUTO,
    width: 960,
    height: 960,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 500},
            debug: false
        }
    },
    scene: [Scene_MainMenu, Scene_Game]
};

//Instanciamos o jogo
var game = new Phaser.Game(config);

