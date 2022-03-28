import eventsCenter from "../eventsCenter.js";

const HINT = 'break!';
const ICE_HEALTH = 9;

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

        // CHARACTER
        
        this.character = this.add.image(0, 0, 'character');
        this.character.setOrigin(0.5, 0.5);

        // ICE
        
        this.ice = this.add.graphics().setInteractive(new Phaser.Geom.Rectangle((this.scale.width / 2) - 150, (this.scale.height / 2) - 150, 300, 300), Phaser.Geom.Rectangle.Contains);
        this.ice.fillStyle(0x80bdff, .9);
        this.ice.fillRoundedRect((this.scale.width / 2) - 150, (this.scale.height / 2) - 150, 300, 300, 10);
        
        this.iceHealth = ICE_HEALTH;
        this.ice.on('pointerdown', () => {

            if (this.iceHealth == 0) return;

            this.iceHealth--;
            this.ice.clear();
            this.ice.fillStyle(0x80bdff, '.' + this.iceHealth); // this non-typed language is freeing
            this.ice.fillRoundedRect((this.scale.width / 2) - 150, (this.scale.height / 2) - 150, 300, 300, 10);

            if (this.iceHealth == 0)
            {
                eventsCenter.emit('win');
            }
        });


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