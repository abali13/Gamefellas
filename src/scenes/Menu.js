class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload() {
        // load audio
        this.load.audio('sfx_explosion', './assets/assets_explosion38.wav');
        this.load.audio('music', './assets/mafia.mp3');
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

        let dirConfig = {
          fontFamily: 'Courier',
          fontSize: '14px',
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
        this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding, 'GameFellas', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'USE UP and DOWN arrows to move Henry past his life obstacles, beat them long enough to win!', dirConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00F0F0';
        menuConfig.color = '#013220'; //'#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }
    
    update(){
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
              speed: 4, gameTimer: 45000    
            }
            //this.sound.play('sfx_startWhistle');
            this.scene.start('playScen');    
          }
          if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
              speed: 6, gameTimer: 60000 
            }
            //this.sound.play('sfx_startWhistle');
            this.scene.start('playScen');
               
          }
    }
}