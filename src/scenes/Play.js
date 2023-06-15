class Play extends Phaser.Scene{
    constructor(){
        super("playScen");
        this.highScore = 0;
    }
    preload() {
        this.load.image('field', './assets/field.png');
        this.load.image('ball1', './assets/Ball1_24x24.png');
        this.load.image('defender', './assets/Defender.png');

        this.load.image('youngHenry', './assets/young_henry.png');
        this.load.image('reportCard', './assets/report_card.png');
        this.load.image('nycBackground', './assets/nyc_background.png');
        this.load.image('coke', './assets/coke.png');
        this.load.image('henry', './assets/Henry.png');
        this.load.image('gun', "./assets/gun.png");

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.atlas('myball', './assets/spritesheet.png', './assets/sprites.json')
      }
    create(){
        this.scene.launch('musicScene'); 
        this.field = this.add.tileSprite(0, 0, 640, 480, 'nycBackground').setOrigin(0,0);
        this.ball = new Ball(this, borderUISize , game.config.height / 2, 'henry').setOrigin(0.5, 0);



        //Tried to make animations with the atlas, but I kept getting an error in phaser.js, which I tried to google
        //But I could not find a solution for it. I tried to pinpoint which part of my code was causing the error but 
        //since the console only showed an "error in phaser.js" I could not find it.


        /*
        this.sprite = me.game.add.sprite(me.game.world.centerX, 300, 'myball');
        this.sprite.animations.add(
            'moving',
            ['Ball1_24x24', 'Ball2_24x24', 'Ball3_24x24', 'Ball4_24x24'], 
            5,
            true

        );
        this.sprite.animations.play('moving');
        */
        
        this.defender01 = new Defender(this, game.config.width + borderUISize*6, borderUISize*4, 'reportCard', 0, 30).setOrigin(0, 0);
        this.defender02 = new Defender(this, game.config.width + borderUISize*3, borderUISize*7 , 'gun', 0, 20).setOrigin(0,0);
        this.defender03 = new Defender(this, game.config.width, borderUISize*10 , 'coke', 0, 10).setOrigin(0,0);
        

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);


        //Animation code is based on the code from Rocket Patrol
        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        //this.scoreLeft = this.add.text(borderUISize + borderPadding, game.config.height - (borderUISize + borderPadding*4), currScore, scoreConfig);

        //this.scoreRight = this.add.text(game.config.height, game.config.height - (borderUISize + borderPadding*4), this.highScore, scoreConfig);    
        
        
        //Game over flag
        this.gameOver = false;

        scoreConfig.fontSize = '14px';
        scoreConfig.fixedWidth = 0;

        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME WON, Henry escaped all of his demons!', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
       

        this.timeInSec = (game.settings.gameTimer) / 1000;
        let timerConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.timerText = this.add.text((game.config.height / 2) + borderPadding, game.config.height - (borderUISize + borderPadding*4)/*borderUISize + borderPadding*/, this.timeInSec, timerConfig);
    }


    update(){

         //Updating timer 
         this.timerText.text = this.clock.getRemainingSeconds();

        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.remove('musicScene')
            //this.sound.play('sfx_startWhistle');
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.remove('musicScene')
            this.scene.start("menuScene");
        }



        //Movement of the field
        if(!this.gameOver){
            this.field.tilePositionX += 4;
        }
        
        if(!this.gameOver){  
            this.ball.update();
            this.defender01.update();              
            this.defender02.update();
            this.defender03.update();
            /*
            this.scoreLeft.text = currScore;
            if(currScore > this.highScore){
                this.highScore = currScore;
                this.scoreRight.text = this.highScore;
            }
            */
        }
        


        // check collisions
        if(this.checkCollision(this.ball, this.defender03)) {
            console.log(currScore);
            this.ball.reset();
            this.explode(this.defender03);
            
            this.gameOver = true;
            currScore = 0;
           
            
        }
        if (this.checkCollision(this.ball, this.defender02)) {
            this.ball.reset();
            this.explode(this.defender02);
            this.gameOver = true;
           
            
        }
        if (this.checkCollision(this.ball, this.defender01)) {
            this.ball.reset();
            this.explode(this.defender01);
            this.gameOver = true;
            currScore = 0;
            
            
        }


        //Adding text for gameover
        if(this.gameOver && this.clock.getRemainingSeconds() > 0){
            let scoreConfig = {
                fontFamily: 'Courier',
                fontSize: '28px',
                backgroundColor: '#F3B141',
                color: '#843605',
                align: 'left',
                padding: {
                top: 5,
                bottom: 5,
                },
                fixedWidth: 0
            }
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER, YOU LOSE', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);

            let creditsConfig = {
                fontFamily: 'Courier',
                fontSize: '10px',
                backgroundColor: '#F3B141',
                color: '#843605',
                align: 'left',
                padding: {
                top: 5,
                bottom: 5,
                },
                fixedWidth: 0
            }
            this.add.text(game.config.width/2, game.config.height/2 + 128, 'Credits:\nBackground Music: https://www.youtube.com/watch?v=sfx7Q9XR4eU/ \nExplosion sfx: https://github.com/nathanaltice/ballPatrol/tree/master/assets \nBackground:https://www.pinterest.com/?show_error=true \nEnemy assets: https://pngtree.com/so/ \nHenry Picture:https://hero.fandom.com/wiki/Henry_Hill_(Goodfellas)?file=RayLiottaHenryHill.jpeg\n', creditsConfig).setOrigin(0.5);
            this.clock.remove();

            
        }


    }

    checkCollision(ball, defender) {
        // simple AABB checking
        if (ball.x < defender.x + defender.width && 
          ball.x + ball.width > defender.x && 
          ball.y < defender.y + defender.height &&
          ball.height + ball.y > defender. y) {
          return true;
        } else {
          return false;
        }
      }
    explode(defender) {
        defender.alpha = 0;
        let boom = this.add.sprite(defender.x, defender.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             
        boom.on('animationcomplete', () => {    
          defender.reset();                         
          defender.alpha = 1;                      
          boom.destroy();                      
          
        });

        this.scene.remove('musicScene')
        this.sound.play('sfx_explosion'); 
        this.sound.play('sfx_finalWhistle');        
      }  
      
}