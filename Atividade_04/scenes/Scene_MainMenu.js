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
        this.cameras.main.setBounds(0, 0, 960, 960);
        this.physics.world.setBounds(0, 0, 960, 960);

        this.add.image(480, 480, 'menu_bg').setScale(1);

        this.add.text(480, 200, 'The fate of the moon', {
            fontSize: '48px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(480, 800, 'Feito por: João Anselmo Aidar', {
            fontSize: '22px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            align: 'center'
        }).setOrigin(0.5);

        let startButton = this.add.image(480, 500, 'start_button')
            .setInteractive()
            .setScale(0.7);

        startButton.on('pointerdown', () => {
            this.scene.start('Scene_Game', { level: 1 }); // Start at level 1
        });

        startButton.on('pointerover', () => startButton.setScale(1.3));
        startButton.on('pointerout', () => startButton.setScale(0.7));
    }
}
