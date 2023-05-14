// Spaceship prefab
class Defender extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.speed;;
    }

    update(){
        this.x -= this.moveSpeed;
        //wrap around from left edge to right edge
        if(this.x <= 0 - this.width){
            this.reset();
            currScore++;
            this.y = Phaser.Math.Between(this.height, borderUISize * 11);
        }
       

    }

    //reset position
    reset(){
        this.x = game.config.width;
        this.moveSpeed += 0.2;
    }
}
