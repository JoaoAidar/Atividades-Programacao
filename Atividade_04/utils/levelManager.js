export default class LevelManager {
    constructor(scene) {
        this.scene = scene; // Referência para a cena do jogo
        this.currentLevel = 1; // Define o nível inicial
        this.totalLevels = 3; // Número total de níveis no jogo

        // Mapeamento dos níveis para os respectivos arquivos de mapa
        this.levels = {
            1: 'assets/maps/level01.png',
            2: 'assets/maps/level02.png',
            3: 'assets/maps/level03.png'
        };

        this.tileSize = 64; // Cada pixel no mapa representa 64 pixels no jogo
    }

    /**
     * Retorna o caminho do arquivo de mapa do nível especificado.
     * @param {number} levelNumber - O número do nível desejado.
     * @returns {string|null} - O caminho do arquivo do mapa ou null se não existir.
     */
    getLevelMap(levelNumber) {
        return this.levels[levelNumber] || null;
    }

    /**
     * Carrega um nível específico, reiniciando a cena do jogo.
     * Se o nível for maior que o total de níveis, reinicia o jogo voltando ao menu principal.
     * @param {number} levelNumber - O número do nível a ser carregado.
     */
    loadLevel(levelNumber) {
        if (levelNumber > this.totalLevels) {
            //console.log("Game completed!"); // Comentado: mensagem para indicar a conclusão do jogo
            // return; // Comentado: antes o jogo apenas terminava sem voltar ao menu
            // levelNumber = 0; // Comentado: reiniciar o nível para 0 não faria sentido aqui
           
            this.currentLevel = 1; // Reinicia o progresso do jogo para o primeiro nível
            this.scene.scene.start('Scene_MainMenu'); // Retorna ao menu principal
            return;
        }
        this.currentLevel = levelNumber; // Atualiza o nível atual
        this.scene.scene.start('Scene_Game', { level: levelNumber }); // Inicia a cena do jogo com o novo nível
    }

    /**
     * Avança para o próximo nível.
     */
    nextLevel() {
        this.loadLevel(this.currentLevel + 1);
    }

    /**
     * Retorna o número do próximo nível, se houver.
     * @returns {number|null} - O próximo nível ou null se não houver mais níveis.
     */
    getNextLevel() {
        if (this.currentLevel < this.totalLevels) {
            return this.currentLevel + 1;
        }
        return null; // Nenhum nível seguinte disponível
    }

    /**
     * Obtém a largura do mundo para o nível atual com base no mapa do nível.
     * Assume que cada pixel no mapa corresponde a um tile de `this.tileSize` no jogo.
     * @returns {number} - A largura do mundo em pixels.
     */
    getWorldWidth() {
        const mapPath = this.getLevelMap(this.currentLevel);
        if (!mapPath) return 0; // Retorna 0 se não houver um mapa válido

        const texture = this.scene.textures.get(mapPath); // Obtém a textura associada ao mapa
        if (!texture || !texture.source[0]) {
            console.warn(`Texture not loaded for ${mapPath}`); // Exibe um aviso se a textura não foi carregada
            return 0;
        }

        const imageWidth = texture.source[0].width; // Obtém a largura da imagem do mapa
        return imageWidth * this.tileSize; // Converte pixels da imagem para unidades do jogo
    }
}
