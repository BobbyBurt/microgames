// import Phaser from './lib/phaser.js'

import game from './scenes/icebreaker'
import boot from './scenes/boot.js'
import menu from './scenes/menu.js'
import timer from './scenes/timer.js'

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
    scene: [boot, game, menu, timer]
    });