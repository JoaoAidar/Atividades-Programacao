// Coin.js
import Phaser from '../../phaser.js'; // Importa o Phaser a partir do caminho especificado

// Define a classe Coin, que estende o sprite de arcade da física do Phaser
export default class Coin extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        // Chama o construtor da classe base (Phaser.Physics.Arcade.Sprite)
        // e define a textura do sprite como 'coin'
        super(scene, x, y, 'coin');

        // Adiciona a moeda à cena e ao sistema de física
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Define a colisão com os limites do mundo para impedir que saia da tela
        this.setCollideWorldBounds(true);

        // Código comentado que poderia fazer a moeda quicar e ter uma velocidade inicial
        // this.setBounce(1);
        // this.setVelocityY(50); // Velocidade inicial para cima

        // Define a gravidade como 0 para impedir que a moeda caia
        this.setGravityY(0); 

        // Flag para verificar se a moeda foi coletada
        this.isCollected = false;
    }
}
