export class SpriteMapExtractor {
  constructor(imageSrc, tileSize = 64) {
      // Inicializa com o caminho da imagem e o tamanho do tile.
      this.imageSrc = imageSrc;
      this.tileSize = tileSize;
      this.colors = this._defineColors();  // Define as cores associadas aos tipos de objetos.
      this.img = null;  // Armazena a imagem carregada.
      this.hiddenCanvas = null;  // Canvas oculto para processar a imagem.
      this.hiddenCtx = null;  // Contexto do canvas oculto.
  }

  /**
   * Define as cores correspondentes aos tipos de objetos no mapa.
   * Cada chave é um tipo de objeto (plataforma, inimigo, jogador, etc.)
   * e o valor é um array RGB que representa a cor do objeto.
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
   * Carrega a imagem a partir do caminho especificado.
   * Retorna uma Promise que resolve quando a imagem é carregada.
   */
  loadImage() {
      return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';  // Permite carregar imagens externas sem problemas de CORS.
          img.src = this.imageSrc;  // Define a fonte da imagem.
          img.onload = () => {
              this.img = img;  // Armazena a imagem carregada.
              this._createHiddenCanvas();  // Cria o canvas oculto para análise.
              resolve();  // Resolve a Promise quando a imagem é carregada.
          };
          img.onerror = (err) => reject(err);  // Rejeita a Promise em caso de erro.
      });
  }

  /**
   * Cria um canvas oculto com as mesmas dimensões da imagem.
   * Este canvas é usado para processar e ler os pixels da imagem.
   */
  _createHiddenCanvas() {
      this.hiddenCanvas = document.createElement('canvas');
      this.hiddenCanvas.width = this.img.width;  // Define a largura do canvas como a da imagem.
      this.hiddenCanvas.height = this.img.height;  // Define a altura do canvas como a da imagem.
      this.hiddenCtx = this.hiddenCanvas.getContext('2d');  // Obtém o contexto 2D para desenhar no canvas.
      this.hiddenCtx.drawImage(this.img, 0, 0);  // Desenha a imagem no canvas.
  }

  /**
   * Extrai os objetos do mapa, identificando as cores dos pixels
   * e criando uma lista de objetos correspondentes.
   * 
   * @returns {Array} Lista de objetos extraídos da imagem com seus tipos e posições.
   */
  extractObjects() {
      if (!this.hiddenCtx) {
          throw new Error("Image not loaded. Call loadImage() first.");
      }

      // Obtém os dados de imagem (array de pixels RGBA).
      const imageData = this.hiddenCtx.getImageData(
          0,
          0,
          this.hiddenCanvas.width,
          this.hiddenCanvas.height
      ).data;

      return this._createObjectListFromImageData(imageData);
  }

  /**
   * Cria uma lista de objetos a partir dos dados de imagem (RGB).
   * A cada pixel, verifica a cor e cria um objeto com o tipo e a posição.
   * 
   * @param {Uint8ClampedArray} imageData - Dados de pixels da imagem.
   * @returns {Array} - Lista de objetos extraídos da imagem.
   */
  _createObjectListFromImageData(imageData) {
      const objects = [];
      const width = this.hiddenCanvas.width;

      // Itera sobre cada pixel (4 valores por pixel: R, G, B, A).
      for (let i = 0; i < imageData.length; i += 4) {
          const r = imageData[i];
          const g = imageData[i + 1];
          const b = imageData[i + 2];
          const a = imageData[i + 3];

          // Ignora pixels totalmente transparentes (A = 0).
          if (a === 0) continue;

          // Calcula as coordenadas x e y, escaladas pelo tamanho do tile.
          const x = ((i / 4) % width) * this.tileSize;
          const y = Math.floor(i / (4 * width)) * this.tileSize;

          // Normaliza os valores RGB para garantir precisão na comparação.
          const pixel = [r, g, b].map(v => v >= 254 ? 255 : Math.round(v / 255) * 255);

          // Determina o tipo de objeto baseado na cor do pixel.
          const type = this._getObjectType(pixel);

          if (type) {
              // Adiciona o objeto à lista de objetos extraídos.
              objects.push({ type, x, y });
          }
      }

      return objects;
  }

  /**
   * Verifica o tipo do objeto comparando a cor do pixel com o mapa de cores predefinido.
   * 
   * @param {Array} pixel - Array RGB do pixel analisado.
   * @returns {string|null} - Retorna o tipo do objeto ou null se não corresponder a nenhum tipo.
   */
  _getObjectType(pixel) {
      return Object.entries(this.colors)
          .find(([, color]) =>
              pixel.every((value, i) => value === color[i])
          )?.[0] || null;
  }

  /**
   * Exporta os objetos extraídos do mapa para um formato JSON.
   * Aguarda o carregamento da imagem e a extração dos objetos.
   * 
   * @returns {Promise<string>} - Uma Promise que retorna o JSON formatado.
   */
  async exportToJSON() {
      await this.loadImage();  // Aguarda o carregamento da imagem.
      const objects = this.extractObjects();  // Extrai os objetos.
      return JSON.stringify(objects, null, 2);  // Retorna os objetos como uma string JSON formatada.
  }
}
