
//Setamos as configurações do Phaser
import { Scene_Game } from './scenes/Scene_Game.js';
import { Scene_MainMenu } from './scenes/Scene_MainMenu.js';
var config = {
    type: Phaser.AUTO,
    width: 640,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 500},
            debug: true
        }
    },
    fps: { target:60},
    scene: [Scene_MainMenu, Scene_Game],
    baseURL: '/Atividades-Programacao/Atividade_04/',
    
};

//Instanciamos o jogo
var game = new Phaser.Game(config);

