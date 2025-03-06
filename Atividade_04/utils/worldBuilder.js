import Player from '../common/entities/Player.js';
import Enemy from '../common/entities/Enemy.js';
import { SpriteMapExtractor } from './spriteMapExtractor.js'; // Classe para extração de mapa de sprites

const TILE_SIZE = 64;  // Tamanho de cada tile no mapa
const VIEW_SIZE = 640;  // Tamanho da visão da câmera

/**
 * O EntityManager é responsável pela criação e gerenciamento das entidades do jogo.
 * Ele cria grupos do Phaser para plataformas, moedas, inimigos e armazena o jogador.
 * TODO: Considerar mover esta classe para seu próprio arquivo.
 */
export class EntityManager {
    constructor(scene) {
        this.scene = scene;  // Referência para a cena do Phaser
        this.groups = {
            platforms: scene.physics.add.staticGroup(),  // Grupo de plataformas (não se move)
            coins: scene.physics.add.staticGroup(),      // Grupo de moedas (não se move)
            enemies: scene.physics.add.group(),          // Grupo de inimigos (movimentam-se)
            player: null                                  // Jogador (inicialmente nulo)
        };
    }
    
    /**
     * Popula as entidades na cena com base nos objetos extraídos do mapa.
     * 
     * @param {Array} objects - Lista de objetos extraídos do mapa com tipo e coordenadas.
     */
    populateEntities(objects) {
        for (const { type, x, y } of objects) {
            switch (type) {
                case 'player':
                    this.groups.player = new Player(this.scene, x + 32, y + 32);  // Cria o jogador na posição especificada.
                    break;
                case 'platforms':
                    this.groups.platforms.create(x + 32, y + 32, 'platform');  // Cria uma plataforma na posição especificada.
                    break;
                case 'coins':
                    this.groups.coins.create(x + 32, y + 32, 'coin');  // Cria uma moeda na posição especificada.
                    break;
                case 'enemies':
                    this.groups.enemies.add(new Enemy(this.scene, x + 32, y + 32, 100));  // Cria um inimigo na posição especificada.
                    break;
                // TODO: Adicionar mais tipos de objetos conforme necessário.
            }
        }
    }
    
    /**
     * Limpa as referências das entidades da cena, destruindo grupos e objetos.
     */
    cleanup() {
        const scene = this.scene;
        // Para cada grupo de objetos (plataformas, moedas, inimigos), remove colididores e destrói os objetos.
        ['platforms', 'coins', 'enemies'].forEach(group => {
            if (scene[group]) {
                scene.physics.world.removeCollider(scene[`${group}Collider`]);
                scene[group].destroy(true);  // Destrói os objetos do grupo.
                scene[group] = null;
            }
        });

        // Destrói o jogador se existir.
        if (scene.player) {
            scene.player.destroy();
            scene.player = null;
        }
    }
}

/**
 * O GameMap é responsável por carregar e gerenciar o mapa do jogo a partir de uma imagem de sprites.
 * Ele extrai as entidades do mapa e as organiza na cena.
 */
export class GameMap {
    constructor(imageSrc) {
        this.imageSrc = imageSrc;  // Caminho da imagem do mapa
        this.colors = this._defineColors();  // Mapeamento de cores para diferentes tipos de objetos
        this.pendingLoad = null;  // Variável para armazenar o status de carregamento pendente
        this.scaleFactor = TILE_SIZE;  // Fator de escala para o tamanho dos tiles
    }

    /**
     * Define um mapeamento de cores para os diferentes tipos de objetos no mapa.
     * 
     * @returns {Object} - Objeto com mapeamento de cores.
     */
    _defineColors() {
        return {
            platforms: [0, 0, 0],    // Preto - Plataformas
            enemies: [255, 0, 0],    // Vermelho - Inimigos
            player: [0, 0, 255],     // Azul - Jogador
            coins: [255, 255, 0],    // Amarelo - Moedas
            placeholder: [0, 255, 0] // Verde - Espaços reservados
        };
    }

    /**
     * Método obsoleto de carregamento de mapa, pois agora o SpriteMapExtractor lida com o carregamento da imagem.
     * TODO: Remover esse método se o SpriteMapExtractor for o único responsável pelo carregamento da imagem.
     */
    async loadIntoScene(scene, pathToMap) {
        // Limpa as referências anteriores da cena (grupos, colididores, etc.)
        this._cleanSceneReferences(scene);
        
        // Cria uma instância do SpriteMapExtractor para carregar e extrair os dados do mapa.
        const extractor = new SpriteMapExtractor(pathToMap, TILE_SIZE);
        await extractor.loadImage();  // Aguarda o carregamento da imagem.

        // Cria um canvas visível para exibir a cena com base na imagem carregada.
        const visibleCanvas = document.createElement('canvas');
        visibleCanvas.width = VIEW_SIZE;
        visibleCanvas.height = VIEW_SIZE;
        const visibleCtx = visibleCanvas.getContext('2d');
        
        // Limpa o canvas com a cor de fundo (garante que não haja fundo "mudando" na tela)
        visibleCtx.clearRect(0, 0, VIEW_SIZE, VIEW_SIZE);
        
        // Cria uma chave de textura única para o mapa baseado no timestamp.
        const textureKey = `map-${Date.now()}`;
        scene.textures.addCanvas(textureKey, visibleCanvas);  // Adiciona o canvas como uma textura.

        // Extrai os objetos do mapa usando o SpriteMapExtractor.
        const objects = extractor.extractObjects();

        // Cria uma instância do EntityManager para gerenciar as entidades extraídas.
        const entityManager = new EntityManager(scene);
        entityManager.populateEntities(objects);  // Popula as entidades no jogo.
    
        // Atribui os grupos de entidades à cena.
        Object.assign(scene, {
            player: entityManager.groups.player,
            enemies: entityManager.groups.enemies,
            coins: entityManager.groups.coins,
            platforms: entityManager.groups.platforms
        });
    
        // Configura os colididores de física e a câmera para seguir o jogador.
        scene.physics.add.collider(entityManager.groups.player, entityManager.groups.platforms);
        if (!entityManager.groups.player) {
            console.error('Player is null! Cannot follow player.');  // Verifica se o jogador foi criado corretamente.
        } else {
            scene.cameras.main.startFollow(entityManager.groups.player);  // Faz a câmera seguir o jogador.
        }
        scene.physics.add.collider(entityManager.groups.enemies, entityManager.groups.platforms);
        scene.physics.add.collider(entityManager.groups.coins, entityManager.groups.platforms);
        
        // Define os limites do mundo físico de acordo com o tamanho do mapa.
        const width = extractor.img.width * TILE_SIZE;
        const height = extractor.img.height * TILE_SIZE;
        
        // Define os limites de física do mapa.
        scene.physics.world.setBounds(0, 0, width, height);
    
        // Emite um evento indicando que o nível foi carregado.
        scene.events.emit('levelLoaded');
    
        // Limita a movimentação da câmera dentro dos limites do mapa.
        this._clampCamera(scene, extractor);
        
        // Limpa os recursos locais do extractor (imagem e canvas oculto).
        this._cleanupLocalMap(extractor);
        
        return textureKey;  // Retorna a chave da textura do mapa.
    }
    
    /**
     * Limpa as referências de grupos e entidades na cena.
     */
    _cleanSceneReferences(scene) {
        // Para cada grupo de objetos (plataformas, moedas, inimigos), remove colididores e destrói os objetos.
        ['platforms', 'coins', 'enemies'].forEach(group => {
            if (scene[group]) {
                scene.physics.world.removeCollider(scene[`${group}Collider`]);
                scene[group].destroy(true);  // Destrói os objetos do grupo.
                scene[group] = null;
            }
        });

        // Destrói o jogador se existir.
        if (scene.player) {
            scene.player.destroy();
            scene.player = null;
        }
    }

    /**
     * Limita a movimentação da câmera para não ultrapassar os limites do mapa.
     */
    _clampCamera(scene, extractor) {
        const mapWidth = extractor.img.width * TILE_SIZE;
        const mapHeight = extractor.img.height * TILE_SIZE;
    
        // Define a área da viewport da câmera, centralizando-a.
        scene.cameras.main.setViewport(
            (scene.scale.width - VIEW_SIZE) / 2, // Centraliza horizontalmente
            (scene.scale.height - VIEW_SIZE) / 2, // Centraliza verticalmente
            VIEW_SIZE,
            VIEW_SIZE
        );
    
        // Limita a movimentação da câmera dentro dos limites do mapa.
        scene.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
    }
    
    /**
     * Limpa os recursos do extractor após o carregamento do mapa.
     */
    _cleanupLocalMap(extractor) {
        if (extractor.img) {
            Object.assign(extractor.img, { onload: null, onerror: null, src: '' });  // Limpa a imagem carregada.
        }
    
        if (extractor.hiddenCanvas) {
            extractor.hiddenCtx?.clearRect(0, 0, extractor.hiddenCanvas.width, extractor.hiddenCanvas.height);
            Object.assign(extractor.hiddenCanvas, { width: 0, height: 0 });  // Limpa o canvas oculto.
        }
    }
}

// Instância global do mapa do jogo
export const gameMap = new GameMap();
