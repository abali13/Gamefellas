class Ball extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      // add object to existing scene
      scene.add.existing(this);
      this.moveSpeed = 2;
    }

    update() {
        if(keyUP.isDown && this.y >= borderPadding){
            this.y -= this.moveSpeed;
        }else if(keyDOWN.isDown && this.y <=  game.config.height - (borderUISize * 3 + this.height - 7) /*game.config.height - borderPadding *2*/){
            this.y += this.moveSpeed;
        }
    
       
    }
   
    reset(){
        this.isFiring = false;
        //this.x = 750;
        //this.y = game.config.height - borderUISize - borderPadding;
    }
}