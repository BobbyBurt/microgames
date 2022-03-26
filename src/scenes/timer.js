import eventsCenter from "../eventsCenter.js";

export default class timer extends Phaser.Scene
{
    constructor()
    {
        super('timer'); // defining unique key
    }
    
    create()
    {
        this.timerText = this.add.text(740, 465, '000', {color: 'white', fontSize: '30px '});
        
        this.timer = this.time.delayedCall(4500, () => {

            eventsCenter.emit('timer-end');
            this.scene.wake('menu');
            this.scene.stop(this.scene.key);
        });
    }

    update()
    {
        this.timerText.text = this.timer.getProgress().toString().substr(0, 4);
    }
}