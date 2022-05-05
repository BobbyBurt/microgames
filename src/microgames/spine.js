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

        this.spineTest = this.add.spine(0, 200, 'boy', 'animation', true).setInteractive();
        // object needs to be interactive to listen for events
        this.spineTest.state.addListener({
            event: function (entry, event) {
                console.log(event.data.name, event.stringValue, event.floatValue);
            }
        });
        // this.spineTest.drawDebug = true;
        this.spineTest.setSkinByName('mouthClosed');
        this.spineTest.setMix('animation', 'jump', .25);


        this.origin = this.add.image(0, 200, 'ball');
        this.origin.setOrigin(0.5, 0.5);

        this.height = this.add.image(0, -100, 'ball');
        this.height.setOrigin(0.5, 0.5);

        this.input.on('pointerdown', () => {
            this.spineTest.setAnimation(2, 'jump', false);
            // this.spineTest.play('jump', false);
            this.spineTest.addAnimation(0, 'animation', true, 0);
        })

        

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