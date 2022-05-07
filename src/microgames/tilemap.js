import eventsCenter from "../eventsCenter.js";
import microgame from "../scenes/microgame.js";

const HINT = 'tilemap!';

export default class tilemap extends microgame
{
    constructor()
    {
        super('tilemap');
    }

    // configure scene
    init()
    {
        
    }

    // queue assets to load
    preload()
    {
        this.load.tilemapTiledJSON('map', 'assets/tilemap.json');
        this.load.image('tiles', 'assets/tiles.png');
    }

    create()
    {   
        this.map = this.add.tilemap('map');
        this.tiles = this.map.addTilesetImage('test', 'tiles');
        this.layer = this.map.createLayer('Tile Layer 1', this.tiles, -300, -300);
        this.layer.setScale(2, 2);
        
        this.hazardsLayer = this.map.createLayer('hazards', this.tiles, -300, -300);
        this.hazardsLayer.setScale(2, 2);

        // TEMPLATE

        eventsCenter.on('resize', () => 
        {
            this.resizeScene();
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