import eventsCenter from "../eventsCenter.js";
import microgame from "../scenes/microgame.js";

const HINT = 'animate, please.';
const ICE_HEALTH = 9;

/**
 * this was the first microgame I tried my hand at making. An icebreaker, if you will
 */
export default class icebreaker extends microgame
{
    constructor()
    {
        super('spine');
    }

    init()
    {
        
    }

    preload()
    {
        this.load.spine('boy', 'assets/skeleton.json', 'assets/skeleton.atlas');

        this.load.image('ball', 'assets/blue-ball.png');
        
        this.load.audio('yeah', 'assets/wario.wav');
    }

    create()
    {   
        this.yeahAudio = this.sound.add('yeah');
        
        // SPINE CREATE

        this.spineTest = this.add.spine(0, 0, 'boy', 'animation', true);
        // console.log(this.spineTest.state);

        this.origin = this.add.image(0, 0, 'ball');
        this.origin.setOrigin(0.5, 0.5);

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
            
    }

    resizeScene()
    {
        this.cameras.main.setScroll(-this.registry.values.w/2, -this.registry.values.h/2);

    }
}