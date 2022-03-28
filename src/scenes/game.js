import eventsCenter from "../eventsCenter.js";

const HINT = 'break!';

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
        this.load.image('character', 'assets/frozen.png');
    }

    create()
    {
        // BG

        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#cce5ff");

        //  CREATE IMAGE
        
        this.character = this.add.image(0, 0, 'character');
        this.character.setOrigin(0.5, 0.5);

        this.ice = this.add.graphics();
        this.ice.fillStyle(0x80bdff, .3);
        this.ice.fillRect((this.scale.width / 2) - 100, (this.scale.height / 2) - 100, 200, 200);


        // this.logo.on('pointerdown', () => {

        //     this.logo.setTint(Math.random() * 16000000);
            
        //     eventsCenter.emit('win');
        // });

        // HINT

        this.hint = this.add.text(0, 0, HINT, {fontSize: 48});
        this.hint.setStroke('#262626', 20);
        this.hint.setOrigin(0.5, 0.5);
    
        this.hintTimer = this.time.delayedCall(1000, () => {

            this.hint.visible = false;
        });

        // TIMER END

        eventsCenter.on('timer-end', () =>
        {
            this.scene.stop(this.scene.key);
        });

        // RESIZE

        this.resizeField(this.scale.width, this.scale.height);
    }

    update()
    {

    }

    resizeField(w, h)
    {
        this.hint.setPosition(w / 2, h / 3);
        this.character.setPosition(w / 2, h / 2);
    }
}