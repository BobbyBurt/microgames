import eventsCenter from "../eventsCenter.js";
import microgame from "../scenes/microgame.js";

const HINT = 'break!';
const ICE_HEALTH = 9;

/**
 * this was the first microgame I tried my hand at making. An icebreaker, if you will
 */
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
        // this.load.image('character', 'assets/frozen.png');
        // this.load.image('character-win', 'assets/not-frozen.png');
        
        this.load.atlas('character', 'assets/character.png', 'assets/character.json');
        this.load.atlas('ice', 'assets/ice.png', 'assets/ice.json');

        this.load.image('shard', 'assets/shard.png');

        this.load.audio('ice-audio', 'assets/chik.wav');
        this.load.audio('yeah', 'assets/wario.wav');
    }

    create()
    {   
        this.yeahAudio = this.sound.add('yeah');
        
        // CHARACTER
    
        const characterAnimConfig =
        {
            key: 'character',
            frames: 'character'
        }
        this.characterAnim = this.anims.create(characterAnimConfig);
        this.character = this.add.sprite(0, 0, 'character').setOrigin(0.5, 0.5);

        // this.characterUnfroze = this.add.image(0, 0, 'character-win');
        // this.characterUnfroze.setOrigin(0.5, 0.5);
        // this.characterUnfroze.setVisible(false);

        // TODO - these shouldn't be two images, but im a baby programmer waah its too hard :(

        // PARTICLES

        this.particles = this.add.particles('shard');

        this.emmiter = this.particles.createEmitter();

        this.emmiter.setPosition(0, 0);
        this.emmiter.setSpeed(400);
        this.emmiter.setBlendMode(Phaser.BlendModes.NORMAL);
        this.emmiter.setGravityY(1000);
        this.emmiter.explode(0, 0, 0);
        this.emmiter.setLifespan(2000);

        // ICE
        
        const iceAnimConfig =
        {
            key: 'ice',
            frames: 'ice',
            frameRate: 12,
            repeat: -1
        };
        this.iceAnim = this.anims.create(iceAnimConfig);
        this.ice = this.add.sprite(0, 0, 'ice').setInteractive().setOrigin(0.5, 0.5);
        // this.input.enableDebug(this.ice);

        this.iceAudio = this.sound.add('ice-audio');
        
        this.iceHealth = 0;
        this.ice.on('pointerdown', (object) => 
        { 
            if (this.iceHealth == ICE_HEALTH) return;

            this.iceHealth++;
            // this.ice.clear();
            // this.ice.fillStyle(0x80bdff, '.' + this.iceHealth); // this non-typed language is freeing
            // this.ice.fillRoundedRect(-150, -150, 300, 300, 10);

            this.emmiter.explode(3, object.worldX, object.worldY);
            this.tween.play();

            this.ice.setFrame('ice/000' + this.iceHealth);

            this.iceAudio.play();

            if (this.iceHealth == ICE_HEALTH)
            {
                this.character.setFrame('character/0001');

                this.yeahAudio.play()

                this.ice.setVisible(false);
                
                eventsCenter.emit('win');
            }
        });

        this.particles.setDepth(1);

        // TWEEN

        this.tween = this.tweens.add
        ({
            targets: [this.character, this.ice],
            x: 10,
            ease: 'Sine.easeInOut',
            repeat: 0,
            duration: 50,
            yoyo: true
        });
        this.tween.stop();

        // TEMPLATE

        eventsCenter.on('resize', () => 
        {
            this.resizeScene();
            console.log('icebreaker resize');
        });

        super.create(HINT);

    }

    update()
    {
            // example of using width & height
    }

    resizeScene()
    {
        this.cameras.main.setScroll(-this.registry.values.w/2, -this.registry.values.h/2);

    }
}