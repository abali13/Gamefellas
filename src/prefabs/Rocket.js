// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.isFiring = false;
      this.moveSpeed = 2;
      this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update() {
        // left/right movement
       // if(!this.isFiring){
            if(keyUP.isDown && this.y >= borderPadding + this.height){
                this.y -= this.moveSpeed;
            }else if(keyDOWN.isDown && this.y <=  game.config.height - (borderUISize * 3 + this.height - 7) /*game.config.height - borderPadding *2*/){
                this.y += this.moveSpeed;
            }
        //}

        
        //fire button
        if(Phaser.Input.Keyboard.JustDown(keyF)){
            this.isFiring = true;
            this.sfxRocket.play();
        }
        //if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding){
            this.y -= this.moveSpeed;
        }
        //reset on miss
        //if(this.y <= borderUISize * 3 + borderPadding){
            //this.isFiring = false;
            //this.y = game.config.height - borderUISize - borderPadding;
        //}
    }
    //reset rocket to the ground
    reset(){
        this.isFiring = false;
        //this.y = game.config.height - borderUISize - borderPadding;
    }
}