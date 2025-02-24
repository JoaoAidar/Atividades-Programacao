export class GameMap {
    constructor(imageSrc) {
      this.imageSrc = imageSrc;
      // Define colors for game objects
      this.colors = {
        white: [255, 255, 255],
        black: [0, 0, 0],
        red: [255, 0, 0],
        green: [0, 255, 0],
        blue: [0, 0, 255],
        yellow: [255, 255, 0],
        fuchsia: [255, 0, 255],
        aqua: [0, 255, 255]
      };
  
      // Create the image object
      this.img = new Image();
      this.img.crossOrigin = "anonymous";
      this.img.src = this.imageSrc;
  
      // Canvas properties; will be created when the image loads
      this.canvas = null;
      this.ctx = null;
    }
  
    // Loads the image and sets up the canvas.
    load() {
      return new Promise((resolve, reject) => {
        this.img.onload = () => {
          this._createCanvas();
          this._drawImage();
          resolve();
        };
        this.img.onerror = reject;
      });
    }
  
    // Private: Creates a canvas with the same dimensions as the image.
    _createCanvas() {
      this.canvas = document.createElement('canvas');
      this.canvas.width = this.img.width;
      this.canvas.height = this.img.height;
      // Disable alpha to avoid premultiplication issues
      this.ctx = this.canvas.getContext("2d", { alpha: false });
    }
  
    // Private: Draws the loaded image onto the canvas.
    _drawImage() {
      this.ctx.drawImage(this.img, 0, 0);
    }
  
    // Processes the image pixel-by-pixel to create game objects.
    // Returns an array of objects, each with a type and x/y position.
    createGameObjectsArray() {
      const gameObjects = [];
      const width = this.img.width;
      const height = this.img.height;
  
      for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
          //console.log(i,j);   
          let pixelData = this.ctx.getImageData(i, j, 1, 1).data;
          pixelData = this.roundPixel(pixelData);
          
          if (this.matchColor(pixelData, this.colors.white)) {
            // Example: Create an object for white pixels.
            //gameObjects.push({ type: 'whiteObject', x: i, y: j });
          } else if (this.matchColor(pixelData, this.colors.black)) {
            gameObjects.push({ type: 'platform', x: i, y: j });
          } else if (this.matchColor(pixelData, this.colors.red)) {
            //gameObjects.push({ type: 'redObject', x: i, y: j });
          } else if (this.matchColor(pixelData, this.colors.blue)) {
            // For blue pixels, create the player.
            gameObjects.push({ type: 'player', x: i, y: j }); 
          } else if(this.matchColor(pixelData, this.colors.yellow)){
            gameObjects.push({ type: 'coin', x: i, y: j });
          }
          // Add more color conditions as needed.
        }
      }
      //console.log(gameObjects);
      return gameObjects;
    }
  
    // Rounds the RGB values for a given pixel.
    roundPixel(pixelRgb) {
      const pixel = [];
      for (let k = 0; k < 3; k++) {
        if (pixelRgb[k] >= 254) {
          pixel.push(255);
        } else {
          pixel.push(Math.round(pixelRgb[k] / 255) * 255);
        }
      }
      return pixel;
    }
  
    // Checks whether a pixel's color matches a target RGB value.
    matchColor(pixelRgb, targetRgb) {
      return (
        pixelRgb[0] === targetRgb[0] &&
        pixelRgb[1] === targetRgb[1] &&
        pixelRgb[2] === targetRgb[2]
      );
    }
  }
  