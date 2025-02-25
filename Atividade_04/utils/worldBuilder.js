import Player from '../common/entities/Player.js'; // Adjust the import path as necessary
import Coin from '../common/entities/Coin.js'; // Adjust the import path as necessary

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
    let gameObjects = [];
    let width = this.img.width;
    let height = this.img.height;

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        let pixelData = this.ctx.getImageData(i, j, 1, 1).data;
        pixelData = this.roundPixel(pixelData);
        
        if (this.matchColor(pixelData, this.colors.black)) {
          console.log("Pushing platform");
          gameObjects.push({ type: 'platform', x: i, y: j });
        } else if (this.matchColor(pixelData, this.colors.red)) {
           gameObjects.push({ type: 'enemy', x: i, y: j });
        } else if (this.matchColor(pixelData, this.colors.green)) {
          // gameObjects.push({ type: 'goal', x: i, y: j });
        } else if (this.matchColor(pixelData, this.colors.blue)) {
          console.log("Pushing player");
          gameObjects.push({ type: 'player', x: i, y: j });
        } else if (this.matchColor(pixelData, this.colors.yellow)) {
          console.log("Pushing coin");
          gameObjects.push({ type: 'coin', x: i, y: j });
        }
      }
    }
    return gameObjects;
  }
    
  /**
   * Rounds the RGB values for a given pixel.
   * @param {Array} pixelRgb - The original pixel RGB array.
   * @returns {Array} - The rounded RGB values.
   */
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

  /**
   * Checks whether a pixel's color matches a target RGB value.
   * @param {Array} pixelRgb - The pixel RGB array.
   * @param {Array} targetRgb - The target RGB array.
   * @returns {boolean} - True if they match, false otherwise.
   */
  matchColor(pixelRgb, targetRgb) {
    return (
      pixelRgb[0] === targetRgb[0] &&
      pixelRgb[1] === targetRgb[1] &&
      pixelRgb[2] === targetRgb[2]
    );
  }

  loadRoomFromSprite(_scene, _pathToMap) {
    const platforms = _scene.physics.add.staticGroup();
    const coins = _scene.physics.add.group();
    const enemies = _scene.physics.add.group();
    _scene.GameMap = new GameMap(_pathToMap);

    _scene.GameMap.load().then(() => {
        const myObjects = _scene.GameMap.createGameObjectsArray();
        
        myObjects.forEach(obj => {
            switch (obj.type) {
                case 'player':
                    _scene.player = new Player(_scene, obj.x * 64, obj.y * 64);
                    break;
                case 'platform':
                    const platform = platforms.create(obj.x * 64 + 32, obj.y * 64 + 32, 'platform');
                    platform.body.immovable = true;
                    platform.body.allowGravity = false;
                    break;
                case 'coin':
                    const coin = coins.create(obj.x * 64 + 32, obj.y * 64 + 32, 'coin');
                    coin.body.immovable = true;
                    coin.body.allowGravity = false;
                    _scene.coin = coin;
                    break;
                case 'enemy': 
                    const enemy = enemies.create(obj.x*64 + 32,obj.y*64 + 32, 'enemy')
                    break;
            }
        });

        _scene.physics.add.collider(_scene.player, platforms);
        _scene.physics.add.overlap(_scene.player, coins, (player, coin) => {
            coin.destroy();
          });
        _scene.physics.add.collider(enemies, platforms);
        _scene.physics.add.collider(coins, platforms);
    }).catch(err => console.error(err));
}
}

export const gameMap = new GameMap();