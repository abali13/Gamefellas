/*
Aditya Bali
Frantic Futball Frenzy
30-40 Hours

Something intertsting I did was create a sperate scene to play the background music instead of playing in the current scene
so as to manage the music better and implement it in a such a way where it did not overlap or repeat if the game was restarted.
I also tried to implement the animation atlas to make the ball look like it was rolling, but even after falling the guide and looking 
at resources online, I could not get it to work so I implemented the explosion of a player on collission animation based on the code given
from Rocket Patrol

I personally do not think my game has amazing visual style since I am not very artically talented, but I am still very proud of it since this is the first time I have made
a game where all the art was drawn by me. Everything is very rough around the edges but I am used to just downloading assets from the 
internet and using them so I never feel connected to them but since I created all of these myself I do feel proud of this art and I know that a put 
in my best effort to try and make everything work.


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