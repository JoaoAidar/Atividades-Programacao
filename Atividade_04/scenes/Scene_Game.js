import Phaser from '../phaser.js';
import LevelManager from '../utils/levelManager.js';
import { gameMap } from '../utils/worldBuilder.js';

// Define a cena principal do jogo
export class Scene_Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene_Game' }); // Define a chave da cena para referenciá-la posteriormente
        
        /** @type {Phaser.Physics.Arcade.Collider[]} */
        this.physicsHandlers = []; // Armazena manipuladores de colisão para facilitar a remoção
        this.parallaxLayers = []; // Armazena as camadas do fundo parallax
    }

    /**
     * Inicializa a cena.
     * Aqui configuramos o gerenciador de níveis e determinamos qual nível carregar.
     * @param {object} data - Dados passados para a cena (ex: número do nível)
     */
    init(data) {
        const manager = this.scene.manager;
        
        // Se ainda não houver um gerenciador de níveis, cria um novo
        if (!manager.levelManager) {
            manager.levelManager = new LevelManager(this);
        }
        
        this.levelManager = manager.levelManager;
        this.currentLevel = data.level || 1; // Define o nível atual, padrão para 1
    }

    /**
     * Pré-carregamento de assets do jogo.
     * Os assets são carregados apenas uma vez, verificando se já existem.
     */
    preload() {
        this.load.image('coin', 'assets/sprCoin.png');
        this.load.image('enemy', 'assets/sprEnemy.png');
        this.load.image('player', 'assets/sprPlayer.png');
        this.load.image('platform', 'assets/sprPlatform.png');

        // Carrega camadas do fundo para efeito de parallax
        this.load.image('bg_far', 'assets/moon_parallax/moon_sky.png');
        this.load.image('bg_mid', 'assets/moon_parallax/moon_mid.png');
        this.load.image('bg_near', 'assets/moon_parallax/moon_front.png');
    }

    /**
     * Criação da cena.
     * Carrega o mapa, configura a física e inicializa a câmera.
     */
    create() {
        const worldWidth = this.levelManager.getWorldWidth ? this.levelManager.getWorldWidth() : this.scale.width;
        const worldHeight = this.levelManager.getWorldHeight ? this.levelManager.getWorldHeight() : this.scale.height;

        // Obtém o caminho do mapa do nível atual
        const mapPath = this.levelManager.getLevelMap(this.currentLevel);
        if (!mapPath) {
            console.error(`Nenhum mapa encontrado para o nível ${this.currentLevel}`);
            return;
        }

        // Carrega o mapa na cena
        this.mapTexture = gameMap.loadIntoScene(this, mapPath);

        // Aguarda o carregamento do nível para configurar física e câmera
        this.events.once('levelLoaded', () => {
            if (!this.player) {
                console.error('Jogador não encontrado após o carregamento do mapa!');
                return;
            }
            this.setupPhysics();
            this.setupCamera();
        });

        // Adiciona camadas de fundo para o efeito de parallax
        this.parallaxLayers.push(
            this.add.tileSprite(0, 0, worldWidth, worldHeight, 'bg_far').setOrigin(0, 0).setScrollFactor(0),
            this.add.tileSprite(0, 0, worldWidth, worldHeight, 'bg_mid').setOrigin(0, 0).setScrollFactor(0),
            this.add.tileSprite(0, 0, worldWidth, worldHeight, 'bg_near').setOrigin(0, 0).setScrollFactor(0)
        );

        // Texto informativo sobre a coleta de moedas
        this.coinText = this.add.text(
            16, 16, 
            'Colete todas as moedas para passar de nível!', 
            { font: '18px Arial', fill: '#ffffff' }
        );
        this.coinText.setScrollFactor(0);
    }

    /**
     * Atualiza o jogo a cada frame.
     * Atualiza o jogador, inimigos e aplica o efeito de parallax.
     * @param {number} time - Tempo atual do jogo
     * @param {number} delta - Tempo desde o último frame
     */
    update(time, delta) {
        //this.coinText.setText('Collect all coins to go to the next level');

        this.player?.update(time, delta);
        this.enemies?.getChildren().forEach(enemy => enemy?.update?.(time, delta));

        // Atualiza o efeito de parallax baseado na posição da câmera
        const cameraX = this.cameras.main.scrollX;
        this.parallaxLayers[0].tilePositionX = -cameraX * 0.2; // Fundo distante
        this.parallaxLayers[1].tilePositionX = -cameraX * 0.5; // Fundo médio
        this.parallaxLayers[2].tilePositionX = -cameraX * 0.8; // Fundo próximo
    }

    /**
     * Limpa a cena ao ser encerrada.
     * Remove objetos, eventos e texturas para evitar vazamentos de memória.
     */
    shutdown() {
        this.children.destroy();
        this.physics.world.shutdown();
        
        // Remove todas as colisões armazenadas
        this.physicsHandlers.forEach(handler => handler.destroy());
        this.physicsHandlers = [];

        // Destrói grupos e objetos restantes
        this.enemies?.destroy();
        this.coins?.destroy();
        this.tilemapLayer?.destroy();

        // Remove a textura do mapa se existir
        if (this.mapTexture && this.textures.exists(this.mapTexture)) {
            this.textures.remove(this.mapTexture);
        }

        // Limpa referências para liberar memória
        this.player = null;
        this.enemies = null;
        this.coins = null;
        this.tilemapLayer = null;
        this.mapTexture = null;

        // Remove eventos, timers e sons
        this.events.removeAllListeners();
        this.time.removeAllEvents();
        this.sound.stopAll();
    }

    /**
     * Configura a física do jogo.
     * Cria colisões entre o jogador, moedas e inimigos.
     */
    setupPhysics() {
        if (!this.player) return;
    
        // Adiciona colisão entre jogador e moedas
        const coinOverlap = this.physics.add.overlap(
            this.player,
            this.coins,
            this._collectCoin,
            null,
            this
        );
        this.physicsHandlers.push(coinOverlap);
    
        // Adiciona colisão entre jogador e inimigos
        const enemyCollision = this.physics.add.overlap(
            this.player,
            this.enemies,
            this._handlePlayerEnemyCollision,
            null,
            this
        );
        this.physicsHandlers.push(enemyCollision);
    }

    /**
     * Manipula a colisão entre o jogador e um inimigo.
     * Se o jogador cair sobre o inimigo, ele será derrotado.
     */
    _handlePlayerEnemyCollision(player, enemy) {
        player.handleFallOnEnemy(enemy);
    }

    /**
     * Manipula a coleta de moedas.
     * Remove a moeda coletada e verifica se todas foram coletadas para avançar de nível.
     */
    _collectCoin(player, coin) {
        coin.destroy();

        // Se todas as moedas foram coletadas, passa para o próximo nível
        if (this.coins?.countActive(true) === 0) {
            this.levelManager.nextLevel();
        }
    }

    /**
     * Configura a câmera para seguir o jogador.
     * Define os limites do mundo, zoom e comportamento de seguir.
     */
    setupCamera() {
        if (!this.player) {
            console.error('Configuração da câmera falhou: jogador não encontrado.');
            return;
        }

        const camera = this.cameras.main;
        camera.startFollow(this.player, true, 0.08, 0.08);

        // Define os limites da câmera baseados no tamanho do mundo
        const worldWidth = this.levelManager.getWorldWidth ? this.levelManager.getWorldWidth() : this.scale.width;
        const worldHeight = this.levelManager.getWorldHeight ? this.levelManager.getWorldHeight() : this.scale.height;
        camera.setBounds(0, 0, worldWidth, worldHeight);

        // Define o nível de zoom da câmera
        camera.setZoom(1);
    }
}
