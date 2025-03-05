import Phaser from '../phaser.js';

export class Scene_MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene_MainMenu' });
    }

    preload() {
        this.load.image('menu_bg', 'assets/backgroundMenu.png');
        this.load.image('start_button', 'assets/PlayButton.png');
    }

    create() {
        this.cameras.main.setBounds(0, 0, 640, 640);
        this.physics.world.setBounds(0, 0, 640, 640);

        this.add.image(320, 320, 'menu_bg').setScale(.35);

        this.add.text(320, 100, 'The fate of the moon', {
            fontSize: '48px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(320, 620, 'Feito por: João Anselmo Aidar', {
            fontSize: '22px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            align: 'center'
        }).setOrigin(0.5);

        let startButton = this.add.image(320, 300, 'start_button')
            .setInteractive()
            .setScale(0.7);

        startButton.on('pointerdown', () => {
            this.scene.start('Scene_Game', { level: 1 }); // Start at level 1
        });

        startButton.on('pointerover', () => startButton.setScale(.8));
        startButton.on('pointerout', () => startButton.setScale(.7));
    }
}
