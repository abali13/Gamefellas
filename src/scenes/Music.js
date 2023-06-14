class Music extends Phaser.Scene{
    constructor(){
        super("musicScene");
    }
    preload() {
        // load audio
        this.load.audio('music', './assets/mafia.mp3');

      }
    create(){
       let backgroundMusic = this.sound.add('music');
       backgroundMusic.loop = true;
       backgroundMusic.play();

    }
    
    update(){
        
    }
}