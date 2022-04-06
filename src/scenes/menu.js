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

            // MENU BUTTONS

        this.createButton(-60, 10, 220, 100, 'PLAY').on('pointerdown', () => {

            this.scene.launch('icebreaker');
            this.scene.launch('timer');
            this.scene.sleep(this.scene.key);
            
            this.instructionText.setColor('#ff0000');    
        });

        this.createButton(200, 10, 100, 100, '>').on('pointerdown', () => {


        });

        this.createButton(-200, 10, 100, 100, '<').on('pointerdown', () => {

            
        });

        // this.input.on('pointerdown', () => {

        //     this.scene.launch('icebreaker');
        //     this.scene.launch('timer');
        //     this.scene.sleep(this.scene.key);
            
        //     this.instructionText.setColor('#ff0000');
        // });

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

    createButton(x, y, w, h, label)
    {
        this.graphics = this.add.graphics();
        this.graphics.fillRoundedRect(0, 0, w, h, this.roundedCorners ? 15 : 0);
        this.graphics.fillStyle(0x3399ff);
        this.label = this.add.text(0, 0, label, {color: 'white', fontSize: '25px'});
        
        this.container = this.add.container(x, y, [this.graphics, this.label]);
        this.container.setInteractive(new Phaser.Geom.Rectangle(0, 0, w, h), Phaser.Geom.Rectangle.Contains);
        // this.container.on('pointerdown', () => {

        //     this.graphics.fillStyle(0x80bfff);
        // })
        // this.container.on('pointerup', () => {

        //     this.graphics.fillStyle(0x3399ff);
        //     // FIXME - this only effects the first button

        //     this.startScene(_questionIndex);
        // })

        this.label.setPosition(10, 10);

        return this.container;
    }
}