import eventsCenter from "../eventsCenter.js";
import microgame from "../scenes/microgame.js";

const HINT = 'break!';
const ICE_HEALTH = 9;

/**
 * this was the first microgame I tried my hand at making. An icebreaker, if you will
 */

let w = 0;
let h = 0;

export default class icebreaker extends microgame
{
    constructor()
    {
        super('icebreaker');
    }

    // configure scene
    init()
    {
        
    }

    // queue assets to load
    preload()
    {
        this.load.image('character', 'assets/frozen.png');
        this.load.image('character-win', 'assets/not-frozen.png');
    }

    create()
    {
        // RESIZE

        this.resizeField({ w: this.scale.width, h: this.scale.height});

        eventsCenter.on('resize', (size) => {

            this.resizeField(size);
        });
        
        // BG

        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#cce5ff");

        // CHARACTER
        
        this.character = this.add.image(0, 0, 'character');
        this.character.setOrigin(0.5, 0.5);

        this.characterUnfroze = this.add.image(0, 0, 'character-win');
        this.characterUnfroze.setOrigin(0.5, 0.5);
        this.characterUnfroze.setVisible(false);
        // TODO - these shouldn't be two images, but im a baby programmer waah its too hard :(

        // ICE
        
        this.ice = this.add.graphics().setInteractive(new Phaser.Geom.Rectangle(-150, -150, 300, 300), Phaser.Geom.Rectangle.Contains);
        this.ice.fillStyle(0x80bdff, .9);
        this.ice.fillRoundedRect(-150, -150, 300, 300, 10);
        
        this.iceHealth = ICE_HEALTH;
        this.ice.on('pointerdown', () => {

            if (this.iceHealth == 0) return;

            this.iceHealth--;
            this.ice.clear();
            this.ice.fillStyle(0x80bdff, '.' + this.iceHealth); // this non-typed language is freeing
            this.ice.fillRoundedRect(-150, -150, 300, 300, 10);

            if (this.iceHealth == 0)
            {
                this.character.setVisible(false);
                this.characterUnfroze.setVisible(true);
                
                eventsCenter.emit('win');
            }
        });

        super.create(HINT);
    }

    update()
    {
        // this.character.setPosition(w / 3, h / 3);
            // example of using width & height
    }

    resizeField(size)
    {
        this.cameras.main.setScroll(-size.w/2, -size.h/2);

        w = size.w;
        h = size.h;
    }
}