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
        super('physics');
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

        this.test = this.physics.add.sprite(0, -100, 'ball').setGravityY(1000).setBounceY(0).setScale(4, 4);

        this.platform = this.physics.add.image(0, 100, 'logo').setFriction(0);

        this.physics.add.collider(this.test, this.platform);

        this.input.on("pointerdown", () =>
        {
            if (this.test.body.touching.down)
            {
                this.test.setVelocityY(-700);
            }
        })

        super.create(HINT);
    }

    update()
    {
        // this.platform.setPosition(this.platform.x - 5, this.platform.y);
        this.platform.setVelocityX(50);
        this.platform.body.allowGravity = false;
        this.platform.setImmovable(true);
    }

    resizeField(size)
    {
        this.cameras.main.setScroll(-size.w/2, -size.h/2);

        w = size.w;
        h = size.h;
    }
}