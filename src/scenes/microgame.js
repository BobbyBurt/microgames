import eventsCenter from "../eventsCenter.js";

/**
 * this was the first microgame I tried my hand at making. An icebreaker, if you will
 */

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
            eventsCenter.off('timer-end', null, this);
            eventsCenter.off('resize', null, this);
            this.scene.stop(this.scene.key);
        });


        this.cameras.main.setScroll(-this.w()/2, -this.h()/2);
    }

    update()
    {

    }

    resizeScene()
    {

    }

    /**
     * @returns current game window width
     */
    w()
    {
        return this.registry.values.w;
    }

    /**
     * @returns current game window height
     */
    h()
    {
        return this.registry.values.h;
    }
}