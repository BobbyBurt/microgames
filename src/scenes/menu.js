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
        this.instructionText = this.add.text(0, 0, 'click / tap to start microgame', {fontSize: 32});
        this.instructionText.setOrigin(0.5, 0.5);

        this.input.on('pointerdown', () => {

            this.scene.launch('icebreaker');
            this.scene.launch('timer');
            this.scene.sleep(this.scene.key);
            
            this.instructionText.setColor('#ff0000');
        });

        this.resizeField(this.scale.width, this.scale.height);

        eventsCenter.on('win', () =>
        {
            this.instructionText.setColor('#00ff00');
        });
    }

    resizeField(w, h)
    {
        
    }
}