import eventsCenter from "../eventsCenter.js";

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
        this.instructionText = this.add.text(0, -30, 'microgame', {fontSize: 32});
        this.instructionText.setOrigin(0.5, 0.5);

            // MICROGAMES

        /** scene key / name for microgames */
        this.microgames = ['icebreaker', 'game-2', 'game-3']
        this.microgameIndex = 0;

            // MENU BUTTONS

        this.createButton(-60, 10, 220, 100, 'PLAY').on('pointerdown', () => {

            this.scene.launch(this.microgames[this.microgameIndex]);
            this.scene.launch('timer');
            this.scene.sleep(this.scene.key);
            
            this.instructionText.setColor('#ff0000');    
        });

        this.createButton(200, 10, 100, 100, '>').on('pointerdown', () => {

            this.updateSelection(true);
        });

        this.createButton(-200, 10, 100, 100, '<').on('pointerdown', () => {

            this.updateSelection(false);
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

        eventsCenter.on('resize', () => {

            this.resizeScene();
        });

        this.cameras.main.setScroll(-this.registry.values.w/2, -this.registry.values.h/2);
    }

    update()
    {
        
    }

    updateSelection(next)
    {
        this.microgameIndex += (next? 1 : -1);
        
            // wrap array index
        if (this.microgameIndex == -1)
        {
            this.microgameIndex = this.microgames.length -1;
        }
        if (this.microgameIndex == this.microgames.length)
        {
            this.microgameIndex = 0;
        }

        this.instructionText.text = 'microgame: ' + this.microgames[this.microgameIndex];
    }

    resizeScene()
    {
        this.cameras.main.setScroll(-this.registry.values.w/2, -this.registry.values.h/2);
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