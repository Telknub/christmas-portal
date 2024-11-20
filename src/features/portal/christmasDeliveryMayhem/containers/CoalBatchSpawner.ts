import { COAL_BATCH_SPAWN, COAL_BATCH_SIZES } from "../ChristmasDeliveryMayhemConstants";

export class CoalBatchSpawner {
    private scene: Phaser.Scene;
    private coalsConfig: { x: number; y: number }[];
    private coalBatchSpawn: number;
  
    constructor(
      scene: Phaser.Scene, 
      coalsConfig: { x: number, y: number }[]) {
      this.scene = scene;
      this.coalsConfig = coalsConfig;
      this.coalBatchSpawn = COAL_BATCH_SPAWN;
    }
  
    public spawnInBatches() {
      // Loop through the batch size configurations
      let delay = 0;
      COAL_BATCH_SIZES.forEach((batch, index) => {
        this.scene.time.delayedCall(delay, () => {
          this.spawnBatch(batch.min, batch.max);
        });
        
        delay += this.coalBatchSpawn;
      });
    }  
   spawnBatch(startIndex: number, endIndex: number) {
      const batch = this.coalsConfig.slice(startIndex, endIndex);
      batch.forEach(({ x, y }) => {
        (this.scene as any).coals(x, y);
      });
    }
  }