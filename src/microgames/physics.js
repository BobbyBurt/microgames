import eventsCenter from "../eventsCenter.js";
import microgame from "../scenes/microgame.js";

const HINT = 'do the thing!';

/**
 * this was the first microgame I tried my hand at making. An icebreaker, if you will
 */

let w = 0;
let h = 0;

export default class physics extends microgame
{
    constructor()
    {
        super('game-2');
    }

    // configure scene
    init()
    {
        
    }

    // queue assets to load
    preload()
    {
        this.load.image('ball', 'assets/blue-ball.png');
        this.load.image('logo', 'assets/phaser3-logo.png');
    }

    create()
    {
        // RESIZE

        this.resizeField({ w: this.scale.width, h: this.scale.height});

        eventsCenter.on('resize', (size) => {

            this.resizeField(size);
        });

        var test = this.physics.add.sprite(0, -100, 'ball').setGravityY(300).setBounceY(.7);

        var platform = this.physics.add.staticImage(0, 100, 'logo');

        this.physics.add.collider(test, platform);

        super.create(HINT);
    }

    update()
    {
        // this.character.setPosition(w / 3, h / 3);
            // example of using width & height
    }

    resizeField(size)
    {
        this.cameras.main.setScroll(-size.w/2, -size.h/2);

        w = size.w;
        h = size.h;
    }
}