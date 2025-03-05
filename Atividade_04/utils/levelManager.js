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

    // Change this to a method, not a getter
    getNextLevel() {
        if (this.currentLevel < this.totalLevels) {
            return this.currentLevel + 1;
        }
        return null;  // No next level
    }
}
