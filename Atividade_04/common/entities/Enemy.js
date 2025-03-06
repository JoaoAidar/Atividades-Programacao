export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, speed = 100) {
        // Chama o construtor da classe base e define a textura do sprite como 'enemy'
        super(scene, x, y, 'enemy');

        // Adiciona o inimigo à cena e ao sistema de física
        scene.add.existing(this);
        scene.physics.add.existing(this);  // Garante que o corpo físico seja dinâmico

        // Faz com que o inimigo colida com os limites do mundo
        this.setCollideWorldBounds(true);

        // Permite detectar quando o inimigo colide com os limites do mundo
        this.body.onWorldBounds = true;

        // Armazena a velocidade como uma propriedade para facilitar o controle
        this.speed = speed;

        // Código comentado que poderia ser usado para depuração da velocidade inicial
        // console.log("Initial Velocity:", this.body.velocity.x);
    }

    update(time, delta) {
        // Código comentado para depuração da posição e velocidade do inimigo
        // console.log('Enemy updating:', this.x, this.y, "Velocity:", this.body.velocity.x);

        // Chama o método responsável pelo movimento do inimigo
        this.moveSideToSide();
    }

    moveSideToSide() {
        // Código comentado para depuração das colisões laterais
        // console.log("Blocked Left:", this.body.blocked.left, "Blocked Right:", this.body.blocked.right);

        // Verifica se o inimigo bateu no lado esquerdo da tela
        if (this.body.blocked.left) {
            // Muda a direção para a direita
            // console.log("Switching to RIGHT");
            this.setVelocityX(Math.abs(this.speed));
        } 
        // Verifica se o inimigo bateu no lado direito da tela
        else if (this.body.blocked.right) {
            // Muda a direção para a esquerda
            // console.log("Switching to LEFT");
            this.setVelocityX(-Math.abs(this.speed));
        } 
        else {
            // Se não estiver bloqueado, continua se movendo na direção atual
            if (this.body.velocity.x === 0) {
                // Se a velocidade for zero, inicia um movimento aleatório para esquerda ou direita
                this.setVelocityX(Math.random() > 0.5 ? Math.abs(this.speed) : -Math.abs(this.speed));
            }
        }
    }
}
