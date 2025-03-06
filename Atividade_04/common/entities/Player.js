import Phaser from '../../phaser.js'; // Importa o Phaser

// Define a classe Player, que representa o jogador e estende o sprite de arcade da física do Phaser
export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        // Chama o construtor da classe base e define a textura do sprite como 'player'
        super(scene, x, y, 'player');

        // Adiciona o jogador à cena e ao sistema de física
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Garante que o jogador não saia dos limites do mundo
        this.setCollideWorldBounds(true);

        // Inicializa as teclas de controle (setas do teclado)
        this.cursors = scene.input.keyboard.createCursorKeys();

        // Inicializa variáveis de controle do pulo
        this.isJumping = false;   // Indica se o jogador está no meio de um pulo
        this.canDoubleJump = false; // Indica se o jogador pode executar um pulo duplo
    }

    // Método chamado a cada atualização do jogo (game loop)
    update(time, delta) {
        // Lógica de movimento horizontal
        if (this.cursors.left.isDown) {
            this.setVelocityX(-160); // Move para a esquerda
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(160); // Move para a direita
        } else {
            this.setVelocityX(0); // Para se nenhum botão for pressionado
        }

        // Lógica de pulo
        if (this.cursors.up.isDown) {
            if (this.body.touching.down) { 
                // Se o jogador estiver no chão, realiza o primeiro pulo
                this.setVelocityY(-450);
                this.isJumping = true;
                this.canDoubleJump = true; // Habilita o pulo duplo
            } else if (this.canDoubleJump) {
                // Se já estiver no ar e o pulo duplo for permitido, executa o segundo pulo
                this.setVelocityY(-450);
                this.canDoubleJump = false; // Após o segundo pulo, desativa o pulo duplo
            }
        }

        // Reseta os estados de pulo quando o jogador toca o chão
        if (this.body.touching.down) {
            this.isJumping = false;
            this.canDoubleJump = false;
        }
    }

    // Método (ainda não implementado) para lidar com dano ao tocar em um inimigo
    handleTakingDamage(enemy) {
        // Pode ser implementado para reduzir a vida do jogador ou fazer com que ele pisque
    }

    // Método chamado quando o jogador pisa em cima de um inimigo
    handleFallOnEnemy(enemy) {
        // Verifica se o jogador está caindo e está acima do inimigo
        if (this.body.velocity.y > 0 && this.y < enemy.y) {
            // Destroi o inimigo (como um Goomba no Mario)
            enemy.destroy(); 

            // Opcionalmente, pode-se habilitar o pulo duplo ao matar o inimigo
            // this.canDoubleJump = true;

            // Exibe uma mensagem no console indicando a morte do inimigo
            console.log('Enemy killed!');
        }
    }
}
