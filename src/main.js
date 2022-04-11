// import Phaser from './lib/phaser.js'

    // scenes
import scalemanager from './scenes/scalemanager.js'
import menu from './scenes/menu.js'
import timer from './scenes/timer.js'

    // microgames
import icebreaker from './microgames/icebreaker.js'
import physics from './microgames/physics.js'

console.dir(Phaser)

window.game = new Phaser.Game({
    type: Phaser.WEBGL,
    backgroundColor: '#969fa3',
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