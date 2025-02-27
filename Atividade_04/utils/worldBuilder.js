
import Player from '../common/entities/Player.js'; // Adjust the import path as necessary
import Enemy from '../common/entities/Enemy.js'; // Adjust the import path as necessary

export class GameMap {
  constructor(imageSrc) {
      this.imageSrc = imageSrc;
      // Define colors for game objects
      this.colors = {
          white: [255, 255, 255],
          black: [0, 0, 0],
          red: [255, 0, 0],   // Enemies are red
          green: [0, 255, 0], // Placeholder for goal or other objects
          blue: [0, 0, 255],  // Player is blue
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
      const platforms = _scene.physics.add.staticGroup();
      const coins = _scene.physics.add.group();
      const enemies = _scene.physics.add.group(); // This group will handle all enemies
      
      _scene.GameMap = new GameMap(_pathToMap);

      _scene.GameMap.load().then(() => {
          const mapWidth = _scene.GameMap.img.width * 64;
          const mapHeight = _scene.GameMap.img.height * 64;

          _scene.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
          _scene.physics.world.setBounds(0, 0, mapWidth, mapHeight);

          const myObjects = _scene.GameMap.createGameObjectsArray();
          
          myObjects.forEach(obj => {
              switch (obj.type) {
                  case 'player':
                      _scene.player = new Player(_scene, obj.x * 64, obj.y * 64);
                      _scene.player.setCollideWorldBounds(true);
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
                      break;
                  case 'enemy': 
                      // Manually instantiate the enemy
                      const enemy = new Enemy(_scene, obj.x * 64 + 32, obj.y * 64 + 32);
                      _scene.enemies.add(enemy); // Add the instantiated enemy to the enemies group
                      break;
              }
          });

          _scene.physics.add.collider(_scene.player, platforms);
          _scene.physics.add.overlap(_scene.player, coins, (player, coin) => {
              coin.destroy();
          });
          _scene.physics.add.collider(_scene.enemies, platforms);
          //_scene.physics.add.collider(coins, platforms);



          // Make the camera follow the player
          if (_scene.player) {
              _scene.cameras.main.startFollow(_scene.player);
          }
      }).catch(err => console.error(err));
  }
}

export const gameMap = new GameMap();
