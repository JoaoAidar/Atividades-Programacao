export default class LevelManager {
    constructor(scene) {
        this.scene = scene;
        this.currentLevel = 1;
        this.totalLevels = 3;

        // Store level-to-map associations
        this.levels = {
            1: 'assets/maps/level01.png',
            2: 'assets/maps/level02.png',
            3: 'assets/maps/level03.png'
        };

        this.tileSize = 64; // Each map pixel represents 64 game pixels
    }

    getLevelMap(levelNumber) {
        return this.levels[levelNumber] || null;
    }

    loadLevel(levelNumber) {
        if (levelNumber > this.totalLevels) {
            console.log("Game completed!");
            return;
        }
        this.currentLevel = levelNumber;
        this.scene.scene.start('Scene_Game', { level: levelNumber });
    }

    nextLevel() {
        this.loadLevel(this.currentLevel + 1);
    }

    getNextLevel() {
        if (this.currentLevel < this.totalLevels) {
            return this.currentLevel + 1;
        }
        return null;  // No next level
    }

    /**
     * Get the world width for the current level based on the level map image.
     * Assumes each pixel in the image corresponds to a tile of `this.tileSize` game units.
     * @returns {number} The world width in pixels.
     */
    getWorldWidth() {
        const mapPath = this.getLevelMap(this.currentLevel);
        if (!mapPath) return 0; // No valid level map

        const texture = this.scene.textures.get(mapPath);
        if (!texture || !texture.source[0]) {
            console.warn(`Texture not loaded for ${mapPath}`);
            return 0;
        }

        const imageWidth = texture.source[0].width;
        return imageWidth * this.tileSize; // Convert pixels to game units
    }
}
