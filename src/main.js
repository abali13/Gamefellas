/*
5 major phaser elements used: Particle effects, texts, timers, music, collisions

The extra polish credit is something I am going to be honest about and I dont think 
I have anything particularly unique because I have been doing an interhsip the last two-three
weeks and did not have enough time to go the extra mile. But the most basic stuff about the game 
following the movies themes and gameplay reflecting scenes from the movie


*/
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [ Menu, Play, Music],
    backgroundColor: '#33C027'//'#00FF11'
}
let game = new Phaser.Game(config);
let keyF, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN;
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let currScore = 0;