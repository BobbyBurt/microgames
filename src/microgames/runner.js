import eventsCenter from "../eventsCenter.js";
import microgame from "../scenes/microgame.js";

const HINT = 'Jump!';

/**
 * this was the first microgame I tried my hand at making. An icebreaker, if you will
 */

let w = 0;
let h = 0;

export default class runner extends microgame
{
    constructor()
    {
        super('runner');
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

        this.test = this.physics.add.sprite(0, -100, 'ball')
        .setGravityY(1000)
        .setBounceY(0)
        .setScale(4, 4)
        .setPosition(-300, 0);

        this.platforms = this.physics.add.group({
            key: 'logo',
            frameQuantity: 5,
            setXY: { x: 0, y: 200, stepX: 1200 },
            velocityX: -600,
        });

        for(var i = 0; i < this.platforms.getLength(); i++)
        {
            this.platforms.getChildren()[i].setFriction(0)
            .setImmovable(true)
            .setScale(2, 1)
            .body.allowGravity = false;
        }
        
        // this.physics.add.image(0, 100, 'logo').setFriction(0);

        this.physics.add.collider(this.test, this.platforms);

        this.input.on("pointerdown", () => {
            if (this.test.body.touching.down)
            {
                this.test.setVelocityY(-700);
            }
        });

        eventsCenter.on('timer-end', () =>
        {
            if (this.test.y < 2)
            {
                eventsCenter.emit('win');
            }
        });

        super.create(HINT);
    }

    update()
    {

    }

    resizeField(size)
    {
        this.cameras.main.setScroll(-size.w/2, -size.h/2);

        w = size.w;
        h = size.h;
    }
}