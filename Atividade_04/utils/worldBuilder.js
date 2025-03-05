import Player from '../common/entities/Player.js';
import Enemy from '../common/entities/Enemy.js';
import { SpriteMapExtractor } from './spriteMapExtractor.js'; // New extraction class

const TILE_SIZE = 64;
const VIEW_SIZE = 640;
/**
 * EntityManager is responsible for creating and managing game entities.
 * It creates Phaser groups for platforms, coins, enemies, and stores the player.
 * TODO: Consider moving this class into its own file.
 */
export class EntityManager {
    constructor(scene) {
        this.scene = scene;
        this.groups = {
            platforms: scene.physics.add.staticGroup(),
            coins: scene.physics.add.staticGroup(),
            enemies: scene.physics.add.group(),
            player: null
        };
    }
    
    populateEntities(objects) {
        for (const { type, x, y } of objects) {
            switch (type) {
                case 'player':
                    this.groups.player = new Player(this.scene, x + 32, y+ 32);
                    break;
                case 'platforms':
                    this.groups.platforms.create(x+ 32, y+ 32, 'platforms','platform_tile');
                    break;
                case 'coins':
                    this.groups.coins.create(x+ 32, y+ 32, 'coin');
                    break;
                case 'enemies':
                    this.groups.enemies.add(new Enemy(this.scene, x+ 32, y+ 32,100));
                    break;
                // TODO: Handle additional object types as necessary.
            }
        }
    }
    
    cleanup() {
        // Clean up scene references for entities, if necessary.
        const scene = this.scene;
        ['platforms', 'coins', 'enemies'].forEach(group => {
            if (scene[group]) {
                scene.physics.world.removeCollider(scene[`${group}Collider`]);
                scene[group].destroy(true);
                scene[group] = null;
            }
        });
    
        if (scene.player) {
            scene.player.destroy();
            scene.player = null;
        }
    }
}

export class GameMap {
    constructor(imageSrc) {
        this.imageSrc = imageSrc;
        // TODO: Consider removing the colors mapping here if extraction is fully delegated to SpriteMapExtractor.
        this.colors = this._defineColors();
        this.pendingLoad = null;
        this.scaleFactor = TILE_SIZE; // Scale factor for the visible canvas
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

    // Note: The old load() method is deprecated since SpriteMapExtractor now handles image loading.
    // TODO: Remove this method if SpriteMapExtractor becomes the sole image loader.

    async loadIntoScene(scene, pathToMap) {
        // Clean up previous scene references (groups, colliders, etc.)
        this._cleanSceneReferences(scene);
        
        // Use the new SpriteMapExtractor to load and extract map data.
        const extractor = new SpriteMapExtractor(pathToMap, TILE_SIZE);
        await extractor.loadImage();

        // Create a visible canvas for scene display based on the loaded image.
        const visibleCanvas = document.createElement('canvas');
        visibleCanvas.width = VIEW_SIZE;
        visibleCanvas.height = VIEW_SIZE;
        const visibleCtx = visibleCanvas.getContext('2d');
        
        // Clear with a background color to prevent "changing background" issues
        //visibleCtx.fillStyle = '#000'; // Set this to any background color you prefer
        visibleCtx.clearRect(0, 0, VIEW_SIZE, VIEW_SIZE);
        
        const textureKey = `map-${Date.now()}`;
        scene.textures.addCanvas(textureKey, visibleCanvas);

        // Extract game objects from the sprite image.
        const objects = extractor.extractObjects();

        // Use the new EntityManager to handle entity instancing.
        const entityManager = new EntityManager(scene);
        entityManager.populateEntities(objects);
    
        // Assign entity groups to scene.
        Object.assign(scene, {
            player: entityManager.groups.player,
            enemies: entityManager.groups.enemies,
            coins: entityManager.groups.coins,
            platforms: entityManager.groups.platforms
        });
    
        // Set up physics colliders and camera follow.
        scene.physics.add.collider(entityManager.groups.player, entityManager.groups.platforms);
        if (!entityManager.groups.player) {
            console.error('Player is null! Cannot follow player.');
        } else {
            scene.cameras.main.startFollow(entityManager.groups.player);
        }
        scene.physics.add.collider(entityManager.groups.enemies, entityManager.groups.platforms);
        scene.physics.add.collider(entityManager.groups.coins, entityManager.groups.platforms);
        
        const width = extractor.img.width * TILE_SIZE;
        const height = extractor.img.height * TILE_SIZE;
        
        //scene.scale.resize(width, height);
        scene.physics.world.setBounds(0, 0, width, height);
    
        scene.events.emit('levelLoaded');
        // TODO: Review cleanup timing if persistent resources are needed.
    
        this._clampCamera(scene, extractor);
        
        // Clean up extractor resources if needed.
        this._cleanupLocalMap(extractor);
        
        return textureKey;
    }
    
    _cleanSceneReferences(scene) {
        ['platforms', 'coins', 'enemies'].forEach(group => {
            if (scene[group]) {
                scene.physics.world.removeCollider(scene[`${group}Collider`]);
                scene[group].destroy(true);
                scene[group] = null;
            }
        });
    
        if (scene.player) {
            scene.player.destroy();
            scene.player = null;
        }
    }
    
    _clampCamera(scene, extractor) {
        const mapWidth = extractor.img.width * TILE_SIZE;
        const mapHeight = extractor.img.height * TILE_SIZE;
    
        // Keep the camera's viewport fixed
        scene.cameras.main.setViewport(
            (scene.scale.width - VIEW_SIZE) / 2, // Center horizontally
            (scene.scale.height - VIEW_SIZE) / 2, // Center vertically
            VIEW_SIZE,
            VIEW_SIZE
        );
    
        // Clamp camera movement within map bounds
        scene.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
    }
    
    _cleanupLocalMap(extractor) {
        if (extractor.img) {
            Object.assign(extractor.img, { onload: null, onerror: null, src: '' });
        }
    
        if (extractor.hiddenCanvas) {
            extractor.hiddenCtx?.clearRect(0, 0, extractor.hiddenCanvas.width, extractor.hiddenCanvas.height);
            Object.assign(extractor.hiddenCanvas, { width: 0, height: 0 });
        }
    
        // visibleCanvas is managed separately in loadIntoScene; add cleanup here if necessary.
        // TODO: Consider integrating visible canvas management into SpriteMapExtractor.
    }
}

export const gameMap = new GameMap();
