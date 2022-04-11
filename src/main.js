// import Phaser from './lib/phaser.js'

    // scenes
import scalemanager from './scenes/scalemanager.js'
import menu from './scenes/menu.js'
import timer from './scenes/timer.js'

    // microgames
import icebreaker from './microgames/icebreaker.js'
import physics from './microgames/physics.js'

window.game = new Phaser.Game({
    type: Phaser.WEBGL,
    backgroundColor: '#969fa3',
    title: 'Microgames',
    url: 'https://www.newgrounds.com/portal/view/project/1855162',
    version: '2.0 pre alpha',
    banner: {
        // text: '#ffffff',
        // background: [
        //     '#fff200',
        //     '#38f0e8',
        //     '#00bff3',
        //     '#ff0066'
        // ],
        hidePhaser: false
    },
    input: {
        gamepad: true
    },
    parent: 'body',
    dom: {
        createContainer: true
    },
    scale: {
        mode: Phaser.Scale.NONE,
        // autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth * window.devicePixelRatio,
        height: window.innerHeight * window.devicePixelRatio,
        zoom: 1 / window.devicePixelRatio
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 150 }
        }
    },
    scene: [scalemanager, timer, menu,
        icebreaker, physics
    ]
    });