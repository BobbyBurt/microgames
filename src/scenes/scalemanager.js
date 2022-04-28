import eventsCenter from "../eventsCenter.js";

class scalemanager extends Phaser.Scene {

    constructor ()
    {
        super('boot');
    }

    create ()
    {
        // more setup stuff here
        // ...

        window.addEventListener('resize', this.resize.bind(this));

        this.scene.start('menu');
        this.scene.launch('newgroundsio');
    }

    resize ()
    {
        let w = window.innerWidth * window.devicePixelRatio;
        let h = window.innerHeight * window.devicePixelRatio;

        // manually resize the game with the Phaser 3.16 scalemanager
        this.scale.resize(w, h);
        // Check which scene is active.
        for (let scene of this.scene.manager.scenes) {
            if (scene.scene.settings.active) {
                // Scale the camera
                scene.cameras.main.setViewport(0, 0, w, h);
                scene.cameras.main.setScroll(-w/2, -h/2);
                if (scene.resizeField) {
                    // Scale/position stuff in the scene itself with this method, that the scene must implement.
                    // scene.resizeField(w, h);

                    eventsCenter.emit('resize', ({ w, h }));
                }
            }
        }
    }

}

export default scalemanager;