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
        this.load.image('stall', 'assets/stall.png');
    }

    create()
    {    
        // BG

        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#333333");

        //  CREATE IMAGE
        
        this.logo = this.add.image(0, 0, 'stall').setInteractive();
        this.logo.setOrigin(0.5, 0.5);

        this.logo.on('pointerdown', () => {

            this.logo.setTint(Math.random() * 16000000);
            
            eventsCenter.emit('win');
        });

        eventsCenter.on('timer-end', () =>
        {
            this.scene.stop(this.scene.key);
        });

        // HINT

        this.hint = this.add.text(0, 0, 'Tap!', {fontSize: 48});
        this.hint.setOrigin(0.5, 0.5);
    
        this.hintTimer = this.time.delayedCall(1000, () => {

            this.hint.visible = false;
        });

        // RESIZE

        this.resizeField(this.scale.width, this.scale.height);
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
        this.hint.setPosition(w / 2, h / 2);
        this.logo.setPosition(w / 2, h / 3);
    }
}