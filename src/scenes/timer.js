import eventsCenter from "../eventsCenter.js";

export default class timer extends Phaser.Scene
{
    constructor()
    {
        super('timer'); // defining unique key
    }
    
    create()
    {
        // this.timerText = this.add.text(740, 150, '000', {color: 'white', fontSize: '30px '});
        
        this.graphics = this.add.graphics({ x: 100, y: this.scale.height - 50});

        this.timer = this.time.delayedCall(4500, () => {

            eventsCenter.emit('timer-end');
            this.scene.wake('menu');
            this.scene.stop(this.scene.key);
        });
    }

    update()
    {
        // this.timerText.text = this.timer.getProgress().toString().substr(0, 4);

        this.bar = Phaser.Math.Interpolation.Linear([this.scale.width - 200, 0], this.timer.getProgress());
        // this.timerText.text = this.bar;

        this.graphics.clear();
        this.color1 = new Phaser.Display.Color(102, 255, 102);
        this.color2 = new Phaser.Display.Color(255, 0, 0);
        this.graphics.fillStyle(Phaser.Display.Color.ComponentToHex(Phaser.Display.Color.Interpolate.ColorWithColor(this.color1, this.color2)));
        this.graphics.fillRect(0, 0, this.bar, 30);
    }
}