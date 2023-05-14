class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/assets_blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/assets_explosion38.wav');
        this.load.audio('sfx_rocket', './assets/assets_rocket_shot.wav');
        this.load.audio('music', './assets/backgroundMusic.mp3');
        this.load.audio('sfx_startWhistle', './assets/startWhistle.mp3');
        this.load.audio('sfx_finalWhistle', './assets/finalWhistle.mp3');

      }
    create(){
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //menu text
        this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding, 'Frantic Futball Frenzy', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'USE Up and Down arrows to move', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00F0F0';
        menuConfig.color = '#013220'; //'#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //play music
        //this.scene.start('musicScene');
        var backgroundMusic = this.sound.add('music');
        backgroundMusic.loop = true;
        backgroundMusic.play();
    }
    
    update(){
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
              spaceshipSpeed: 3,
              gameTimer: 60000    
            }
            this.sound.play('sfx_startWhistle');
            this.scene.start('playScen');    
          }
          if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
              spaceshipSpeed: 4,
              gameTimer: 45000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playScen');    
          }
    }
}