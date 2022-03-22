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
sadfasdfasdfasd
    // queue assets to load
    preload()
    {
        
    }

    create()
    {   
        this.instructionText = this.add.text(0, 0, 'click / tap to start microgame');
        this.instructionText.setOrigin(0.5, 0.5);

        this.input.on('pointerdown', () => {

            this.scene.launch('game');
            this.scene.stop(this.scene.key);
        });

        this.resizeField(this.scale.width, this.scale.height);
    }

    resizeField(w, h)
    {
        this.instructionText.setPosition(w / 2, h / 2);
    }
}