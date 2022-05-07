import eventsCenter from "../eventsCenter.js";
import microgame from "../scenes/microgame.js";

const HINT = 'render svg!';
const ICE_HEALTH = 9;

/**
 * @classdesc
 * svg gap issue is present
 * there's a slight dark outline on all svg images rendered
 */
export default class pool extends microgame
{
    constructor()
    {
        super('pool');
    }

    // configure scene
    init()
    {
        
    }

    // queue assets to load
    preload()
    {
        this.load.svg('rusty', 'assets/tDRSpaceman.svg');
        this.load.svg('rusty2', 'assets/tDRSpaceman.svg', { scale: 10});
    }

    create()
    {   

        this.svg0 = this.add.image(-200, -200, 'rusty').setScale(1).setOrigin(0);
        this.svg1 = this.add.image(-200, -200, 'rusty').setScale(2).setOrigin(0);
        this.svg2 = this.add.image(-0, -0, 'rusty2').setScale(1).setOrigin(0);

        // TEMPLATE

        eventsCenter.on('resize', () => 
        {
            this.resizeScene();
            console.log('icebreaker resize');
        });

        super.create(HINT);

    }

    update()
    {
            // example of using width & height
    }

    resizeScene()
    {
        this.cameras.main.setScroll(-this.registry.values.w/2, -this.registry.values.h/2);

    }
}