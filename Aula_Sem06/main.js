//Setamos as configurações do Phaser
import { Scene_Level01 } from './scenes/Scene_Level01.js';
import { Scene_Level02 } from './scenes/Scene_Level02.js';
import { Scene_GameOver} from './scenes/Scene_GameOver.js';
import { Scene_Win} from './scenes/Scene_Win.js';
import { Scene_Menu} from './scenes/Scene_Menu.js';
var config = {
    type: Phaser.AUTO,
    width: 640,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: false
        }
    },
    fps: { target:60},
    scene: [Scene_Menu, Scene_Level01, Scene_Level02, Scene_Win, Scene_GameOver],
    baseURL: '/Atividades-Programacao/Aula_Sem06/',
    
};

//Instanciamos o jogo
var game = new Phaser.Game(config);