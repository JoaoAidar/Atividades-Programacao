import Player from '../common/entities/Player.js'; // Adjust the import path as necessary
import Enemy from '../common/entities/Enemy.js';   // Adjust the import path as necessary

export class GameMap {
  constructor(imageSrc) {
      this.imageSrc = imageSrc;
      // Define colors for game objects
      this.colors = {
          white: [255, 255, 255],
          black: [0, 0, 0],
          red: [255, 0, 0],    // Enemies are red
          green: [0, 255, 0],  // Placeholder for goal or other objects
          blue: [0, 0, 255],   // Player is blue
          yellow: [255, 255, 0], // Coins are yellow
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
  createGameObjectsArray() {
      let gameObjects = [];
      let width = this.img.width;
      let height = this.img.height;

      for (let i = 0; i < width; i++) {
          for (let j = 0; j < height; j++) {
              let pixelData = this.ctx.getImageData(i, j, 1, 1).data;
              pixelData = this.roundPixel(pixelData);
              
              if (this.matchColor(pixelData, this.colors.black)) {
                  gameObjects.push({ type: 'platform', x: i, y: j });
              } else if (this.matchColor(pixelData, this.colors.red)) {
                  gameObjects.push({ type: 'enemy', x: i, y: j });
              } else if (this.matchColor(pixelData, this.colors.blue)) {
                  gameObjects.push({ type: 'player', x: i, y: j });
              } else if (this.matchColor(pixelData, this.colors.yellow)) {
                  gameObjects.push({ type: 'coin', x: i, y: j });
              }
          }
      }
      return gameObjects;
  }
  getGameObjects() {
    return gameObjects;
  }
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

  matchColor(pixelRgb, targetRgb) {
      return (
          pixelRgb[0] === targetRgb[0] &&
          pixelRgb[1] === targetRgb[1] &&
          pixelRgb[2] === targetRgb[2]
      );
  }

  loadRoomFromSprite(_scene, _pathToMap) {
    // Create groups for platforms, coins, and enemies.
    const platforms = _scene.physics.add.staticGroup();
    const coins = _scene.physics.add.group();
    var player = null;
    _scene.enemies = _scene.physics.add.group();

    // Create a local GameMap instance using the provided map path.
    let localMap = new GameMap(_pathToMap);

    localMap.load().then(() => {
        const myObjects = localMap.createGameObjectsArray();

        myObjects.forEach(obj => {
            switch (obj.type) {
                case 'player':
                    player = new Player(_scene, obj.x * 64, obj.y * 64);
                    break;

                case 'platform':
                    let platform = platforms.create(obj.x * 64 + 32, obj.y * 64 + 32, 'platforms', 'platform_tile');
                    if (platform.body) {
                      platform.body.immovable = true;
                      platform.body.allowGravity = false;
                    }
                    break;

                case 'coin':
                    let coin = coins.create(obj.x * 64 + 32, obj.y * 64 + 32, 'coin');
                    if (coin.body) {
                      coin.body.immovable = true;
                      coin.body.allowGravity = false;
                    }
                    break;

                case 'enemy': 
                    let enemy = new Enemy(_scene, obj.x * 64 + 32, obj.y * 64 + 32);
                    _scene.enemies.add(enemy);
                    break;
            }
        });
        _scene.player = player;
        // Only add player-related colliders and camera follow if the player was created.
        if (_scene.player) {
            _scene.physics.add.collider(_scene.player, platforms);
            _scene.physics.add.overlap(_scene.player, coins, (player, coin) => {
                coin.destroy();
                _scene.events.emit('coinCollected');
            });
            _scene.cameras.main.startFollow(_scene.player);
        } else {
            console.error("Player not found in map.");
        }
        
        _scene.physics.add.collider(_scene.enemies, platforms);
    }).catch(err => console.error(err));
  }
}

// Export a global instance if needed; note that its imageSrc is undefined.
// It is not used by loadRoomFromSprite since that creates a new instance.
export const gameMap = new GameMap();
