export class SpriteMapExtractor {
    constructor(imageSrc, tileSize = 64) {
      this.imageSrc = imageSrc;
      this.tileSize = tileSize;
      this.colors = this._defineColors();
      this.img = null;
      this.hiddenCanvas = null;
      this.hiddenCtx = null;
    }
  
    _defineColors() {
      return {
        platforms: [0, 0, 0],    // Black
        enemies: [255, 0, 0],    // Red
        player: [0, 0, 255],     // Blue
        coins: [255, 255, 0],    // Yellow
        placeholder: [0, 255, 0] // Green
      };
    }
  
    loadImage() {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = this.imageSrc;
        img.onload = () => {
          this.img = img;
          this._createHiddenCanvas();
          resolve();
        };
        img.onerror = (err) => reject(err);
      });
    }
  
    _createHiddenCanvas() {
      // Create a canvas matching the original image dimensions for pixel extraction.
      this.hiddenCanvas = document.createElement('canvas');
      this.hiddenCanvas.width = this.img.width;
      this.hiddenCanvas.height = this.img.height;
      this.hiddenCtx = this.hiddenCanvas.getContext('2d');
      this.hiddenCtx.drawImage(this.img, 0, 0);
    }
  
    extractObjects() {
      if (!this.hiddenCtx) {
        throw new Error("Image not loaded. Call loadImage() first.");
      }
      const imageData = this.hiddenCtx.getImageData(
        0,
        0,
        this.hiddenCanvas.width,
        this.hiddenCanvas.height
      ).data;
      return this._createObjectListFromImageData(imageData);
    }
  
    _createObjectListFromImageData(imageData) {
      const objects = [];
      const width = this.hiddenCanvas.width;
      // Loop through each pixel (4 values per pixel: R, G, B, A)
      for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const a = imageData[i + 3];
        
        // Skip fully transparent pixels.
        if (a === 0) continue;
        
        // Calculate the x and y coordinates (scaling them by tileSize)
        const x = ((i / 4) % width) * this.tileSize;
        const y = Math.floor(i / (4 * width)) * this.tileSize;
        
        // Normalize RGB values to either 0 or 255.
        const pixel = [r, g, b].map(v => v >= 254 ? 255 : Math.round(v / 255) * 255);
        const type = this._getObjectType(pixel);
        
        if (type) {
          objects.push({ type, x, y });
        }
      }
      return objects;
    }
  
    _getObjectType(pixel) {
      // Match the pixel against the defined color map.
      return Object.entries(this.colors)
        .find(([, color]) =>
          pixel.every((value, i) => value === color[i])
        )?.[0] || null;
    }
  
    async exportToJSON() {
      await this.loadImage();
      const objects = this.extractObjects();
      return JSON.stringify(objects, null, 2);
    }
  }
  

  