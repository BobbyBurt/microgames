import eventsCenter from "../eventsCenter.js";

let w = 0;
let h = 0;

export default class menu extends Phaser.Scene
{
    constructor()
    {
        super('menu'); // defining unique key
    }

    // configure scene
    init()
    {
        
    }

    // queue assets to load
    preload()
    {
        
    }

    create()
    {   
        // SIZE

        this.resizeField({ w: this.scale.width, h: this.scale.height});

        eventsCenter.on('resize', (size) => {

            this.resizeField(size);
        });

        this.instructionText = this.add.text(0, 0, 'click / tap to start microgame', {fontSize: 32});
        this.instructionText.setOrigin(0.5, 0.5);

        this.input.on('pointerdown', () => {

            this.scene.launch('icebreaker');
            this.scene.launch('timer');
            this.scene.sleep(this.scene.key);
            
            this.instructionText.setColor('#ff0000');
        });

        eventsCenter.on('win', () =>
        {
            this.instructionText.setColor('#00ff00');
        });
    }

    resizeField(size)
    {
        this.cameras.main.setScroll(-size.w/2, -size.h/2);
        
        w = size.w;
        h = size.h;
    }
}