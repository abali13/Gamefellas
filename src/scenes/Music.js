class Music extends Phaser.Scene{
    constructor(){
        super("musicScene");
    }
    preload() {
        // load audio
        this.load.audio('music', './assets/backgroudMusic.mp3');

      }
    create(){
       backgroundMusic = this.add.audio('music');
       backgroundMusic.loop = true;
       backgroundMusic.play();

    }
    
    update(){
        
    }
}