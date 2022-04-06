import eventsCenter from "../eventsCenter.js";

let w = 0;
let h = 0;

export default class timer extends Phaser.Scene
{
    constructor()
    {
        super('timer'); // defining unique key
    }
    
    create()
    {
        // SIZE

        this.resizeField({ w: this.scale.width, h: this.scale.height});

        eventsCenter.on('resize', (size) => {

            this.resizeField(size);
        });
        
        // this.timerText = this.add.text(740, 150, '000', {color: 'white', fontSize: '30px '});
        
        this.graphics = this.add.graphics({ x: -(w/2) + 100, y: (h/2) - 75});

        this.timer = this.time.delayedCall(4000, () => {

            eventsCenter.emit('timer-end');
            this.scene.wake('menu');
            this.scene.stop(this.scene.key);
        });
    }

    update()
    {
        // this.timerText.text = this.timer.getProgress().toString().substr(0, 4);

        this.bar = Phaser.Math.Interpolation.Linear([w - 200, 0], this.timer.getProgress());
        // this.timerText.text = this.bar;

        this.color1 = new Phaser.Display.Color(51, 153, 255);
        this.color2 = new Phaser.Display.Color(255, 0, 0);

        Phaser.Display.Color.RGBToString(this.color1.red, this.color1.green, this.color1.blue);

        this.interpolateColor = Phaser.Display.Color.Interpolate.ColorWithColor(this.color1, this.color2, 1, this.timer.getProgress());
        this.stringColor = Phaser.Display.Color.RGBToString(this.interpolateColor.r, this.interpolateColor.g, this.interpolateColor.b);
        this.stringColor = '0x' + this.stringColor.substring(1);

        if (this.timer.getProgress() > .2)
        {
            this.graphics.clear();
            this.graphics.fillStyle(this.stringColor);
            this.graphics.fillRect(0, 0, this.bar, 30);
        }
    }

    resizeField(size)
    {
        this.cameras.main.setScroll(-size.w/2, -size.h/2);
        
        w = size.w;
        h = size.h;
    }
}