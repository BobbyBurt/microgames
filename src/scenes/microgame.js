import eventsCenter from "../eventsCenter.js";

/**
 * this was the first microgame I tried my hand at making. An icebreaker, if you will
 */

let w = 0;
let h = 0;

export default class game extends Phaser.Scene
{
    constructor(key)
    {
        super(key); // defining unique key
    }

    // configure scene
    init()
    {
        
    }

    // queue assets to load
    preload()
    {

    }

    create(hint)
    {
        // RESIZE

        this.resizeField({ w: this.scale.width, h: this.scale.height});

        eventsCenter.on('resize', (size) => {

            this.resizeField(size);
        });

        // HINT

        this.hint = this.add.text(0, 0, hint, {fontSize: 48});
        this.hint.setStroke('#262626', 20);
        this.hint.setOrigin(0.5, 0.5);
    
        this.hintTimer = this.time.delayedCall(1000, () => {

            this.hint.visible = false;
        });

        // TIMER END

        eventsCenter.on('timer-end', () =>
        {
            this.scene.stop(this.scene.key);
        });
    }

    resizeField(size)
    {
        this.cameras.main.setScroll(-size.w/2, -size.h/2);

        w = size.w;
        h = size.h;
    }

    update()
    {

    }
}