import Phaser from '../phaser.js';

// Definição da cena do menu principal
export class Scene_MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene_MainMenu' }); // Define uma chave única para a cena
    }

    // Pré-carregamento dos assets do menu
    preload() {
        this.load.image('menu_bg', 'assets/backgroundMenu.png'); // Carrega a imagem de fundo do menu
        this.load.image('start_button', 'assets/PlayButton.png'); // Carrega a imagem do botão de iniciar
    }

    create() {
        // Define os limites da câmera e do mundo para 640x640 pixels
        this.cameras.main.setBounds(0, 0, 640, 640);
        this.physics.world.setBounds(0, 0, 640, 640);

        // Adiciona a imagem de fundo no centro da tela e redimensiona
        this.add.image(320, 320, 'menu_bg').setScale(0.35);

        // Adiciona o título do jogo centralizado no topo da tela
        this.add.text(320, 100, 'The fate of the moon', {
            fontSize: '48px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            align: 'center'
        }).setOrigin(0.5); // Define a origem no centro do texto para facilitar o posicionamento

        // Adiciona um texto de crédito na parte inferior da tela
        this.add.text(320, 620, 'Feito por: João Anselmo Aidar', {
            fontSize: '22px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            align: 'center'
        }).setOrigin(0.5);

        // Cria o botão de início, posicionando-o e tornando-o interativo
        let startButton = this.add.image(320, 310, 'start_button')
            .setInteractive() // Permite interações com o botão
            .setScale(0.7); // Define o tamanho do botão

        // Evento acionado quando o botão é pressionado
        startButton.on('pointerdown', () => {
            this.scene.start('Scene_Game', { level: 1 }); // Inicia a cena do jogo no nível 1
        });

        // Evento ao passar o mouse sobre o botão (aumenta a escala para efeito visual)
        startButton.on('pointerover', () => startButton.setScale(0.8));

        // Evento ao retirar o mouse do botão (retorna à escala original)
        startButton.on('pointerout', () => startButton.setScale(0.7));
    }
}
