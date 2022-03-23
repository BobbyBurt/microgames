import eventsCenter from "../eventsCenter.js";

export default class game extends Phaser.Scene
{
    constructor()
    {
        super('game'); // defining unique key
    }

    // configure scene
    init()
    {
        
    }

    // queue assets to load
    preload()
    {
        this.load.image('logo', 'assets/phaser3-logo.png');
    }

    create()
    {    
    //  CREATE IMAGE
        
        this.logo = this.add.image(0, 0, 'logo').setInteractive();

        this.logo.on('pointerdown', () => {

            this.logo.setTint(Math.random() * 16000000);
            
            eventsCenter.emit('win');
        });

        this.resizeField(this.scale.width, this.scale.height);

        eventsCenter.on('timer-end', () =>
        {
            this.scene.stop(this.scene.key);
        });
    }

    update()
    {

    }

    /** wraps character
     *  @param {Phaser.GameObjects.Sprite} sprite */
    startScene(sprite)
    {
        this.scene.start('game-over');
    }

    resizeField(w, h)
    {
        this.logo.setPosition(w / 2, h / 2);
    }
}