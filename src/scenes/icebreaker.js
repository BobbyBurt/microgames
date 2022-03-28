import eventsCenter from "../eventsCenter.js";
import microgame from "./microgame.js";

const HINT = 'break!';
const ICE_HEALTH = 9;

/**
 * this was the first microgame I tried my hand at making. An icebreaker, if you will
 */

export default class icebreaker extends microgame
{
    constructor()
    {
        // super('icebreaker');
        // the issue is that all microgames share a key with this method
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
                this.character.setVisible(false);
                this.characterUnfroze.setVisible(true);
                
                eventsCenter.emit('win');
            }
        });
    }

    update()
    {

    }

    resizeField(w, h)
    {
        this.hint.setPosition(w / 2, h / 3);
        this.character.setPosition(w / 2, h / 2);
        this.characterUnfroze.setPosition(w / 2, h / 2);
    }
}