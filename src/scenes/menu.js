import eventsCenter from "../eventsCenter.js";

let w = 0;
let h = 0;

var ngio = new Newgrounds.io.core('54370:8UALd0yw', '41Qr9LkSla9bfOkVxI6Hxg==');
ngio.debug = true;


/* vars to record any medals and scoreboards that get loaded */
var medals, scoreboards;

/* handle loaded medals */
function onMedalsLoaded(result) {
	if (result.success) medals = result.medals;
    console.log(result.medals);
}

/* handle loaded scores */
function onScoreboardsLoaded(result) {
	if (result.success) scoreboards = result.scoreboards;
    console.log(result.scoreboards)
}

function onLoggedIn() {
	console.log("Welcome " + ngio.user.name + "!");
}

function onLoginFailed() {
	console.log("There was a problem logging in: " . ngio.login_error.message );
}

function onLoginCancelled() {
	console.log("The user cancelled the login.");
}

/*
 * Before we do anything, we need to get a valid Passport session.  If the player
 * has previously logged in and selected 'remember me', we may have a valid session
 * already saved locally.
 */
function initSession() {
	ngio.getValidSession(function() {
		if (ngio.user) {
			/* 
			 * If we have a saved session, and it has not expired, 
			 * we will also have a user object we can access.
			 * We can go ahead and run our onLoggedIn handler here.
			 */
			onLoggedIn();
		} else {
			/*
			 * If we didn't have a saved session, or it has expired
			 * we should have been given a new one at this point.
			 * This is where you would draw a 'sign in' button and
			 * have it execute the following requestLogin function.
			 */
		}

	});
}

/* 
 * Call this when the user clicks a 'sign in' button from your game.  It MUST be called from
 * a mouse-click event or pop-up blockers will prevent the Newgrounds Passport page from loading.
 */
function requestLogin() {
	ngio.requestLogin(onLoggedIn, onLoginFailed, onLoginCancelled);
	/* you should also draw a 'cancel login' buton here */
}

/*
 * Call this when the user clicks a 'cancel login' button from your game.
 */
function cancelLogin() {
	/*
	 * This cancels the login request made in the previous function. 
	 * This will also trigger your onLoginCancelled callback.
	 */
	ngio.cancelLoginRequest();
}

/*
 * If your user is logged in, you should also draw a 'sign out' button for them
 * and have it call this.
 */
function logOut() {
	ngio.logOut(function() {
		/*
		 * Because we have to log the player out on the server, you will want
		 * to handle any post-logout stuff in this function, wich fires after
		 * the server has responded.
		 */
	});
}

/* You could use this function to draw the medal notification on-screen */
function onMedalUnlocked(medal) {
	console.log('MEDAL GET:', medal.name);
}

function unlockMedal(medal_name) {

	/* If there is no user attached to our ngio object, it means the user isn't logged in and we can't unlock anything */
	if (!ngio.user) return;

	var medal;

	for (var i = 0; i < medals.length; i++) {

		medal = medals[i];
		/* look for a matching medal name */
		if (medal.name == medal_name) {

			console.log(medal.unlocked);
            /* we can skip unlocking a medal that's already been earned */
			if (!medal.unlocked) {

				/* unlock the medal from the server */
				ngio.callComponent('Medal.unlock', {id:medal.id}, function(result) {

					if (result.success)
                    {
                        onMedalUnlocked(result.medal);
                        medal.unlocked = true;
                    }

				});
			}

			return;
		}
	}
}

function postScore(board_name, score_value) {

	/* If there is no user attached to our ngio object, it means the user isn't logged in and we can't post anything */
	if (!ngio.user) return;

	var score;
    var scoreboard;

	for (var i = 0; i < scoreboards.length; i++) {

		scoreboard = scoreboards[i];

		ngio.callComponent('ScoreBoard.postScore', {id:scoreboard.id, value:score_value});
	}
}


export default class menu extends Phaser.Scene
{
    constructor()
    {
        super('menu'); // defining unique key
    }

    // configure scene
    init()
    {
        
    }

    // queue assets to load
    preload()
    {
        
    }

    create()
    {   
        // NGio - official

        initSession();

        /* load our medals and scoreboards from the server */
        ngio.queueComponent("Medal.getList", {}, onMedalsLoaded);
        ngio.queueComponent("ScoreBoard.getBoards", {}, onScoreboardsLoaded);
        ngio.executeQueue();

        // SIZE

        this.resizeField({ w: this.scale.width, h: this.scale.height});

        eventsCenter.on('resize', (size) => {

            this.resizeField(size);
        });

        this.instructionText = this.add.text(0, -30, 'microgame', {fontSize: 32});
        this.instructionText.setOrigin(0.5, 0.5);

            // MICROGAMES

        /** scene key / name for microgames */
        this.microgames = ['icebreaker', 'game-2', 'game-3']
        this.microgameIndex = 0;

            // MENU BUTTONS

        this.createButton(-60, 10, 220, 100, 'PLAY').on('pointerdown', () => {

            this.scene.launch(this.microgames[this.microgameIndex]);
            this.scene.launch('timer');
            this.scene.sleep(this.scene.key);
            
            this.instructionText.setColor('#ff0000');    
        });

        this.createButton(200, 10, 100, 100, '>').on('pointerdown', () => {

            this.updateSelection(true);
            requestLogin();
            unlockMedal('test');

            postScore('test', 1234);
        });

        this.createButton(-200, 10, 100, 100, '<').on('pointerdown', () => {

            this.updateSelection(false);
        });

        // this.input.on('pointerdown', () => {

        //     this.scene.launch('icebreaker');
        //     this.scene.launch('timer');
        //     this.scene.sleep(this.scene.key);
            
        //     this.instructionText.setColor('#ff0000');
        // });

        eventsCenter.on('win', () =>
        {
            this.instructionText.setColor('#00ff00');
        });
    }

    updateSelection(next)
    {
        this.microgameIndex += (next? 1 : -1);
        
            // wrap array index
        if (this.microgameIndex == -1)
        {
            this.microgameIndex = this.microgames.length -1;
        }
        if (this.microgameIndex == this.microgames.length)
        {
            this.microgameIndex = 0;
        }

        this.instructionText.text = 'microgame: ' + this.microgames[this.microgameIndex];
    }

    resizeField(size)
    {
        this.cameras.main.setScroll(-size.w/2, -size.h/2);
        
        w = size.w;
        h = size.h;
    }

    createButton(x, y, w, h, label)
    {
        this.graphics = this.add.graphics();
        this.graphics.fillRoundedRect(0, 0, w, h, this.roundedCorners ? 15 : 0);
        this.graphics.fillStyle(0x3399ff);
        this.label = this.add.text(0, 0, label, {color: 'white', fontSize: '25px'});
        
        this.container = this.add.container(x, y, [this.graphics, this.label]);
        this.container.setInteractive(new Phaser.Geom.Rectangle(0, 0, w, h), Phaser.Geom.Rectangle.Contains);
        // this.container.on('pointerdown', () => {

        //     this.graphics.fillStyle(0x80bfff);
        // })
        // this.container.on('pointerup', () => {

        //     this.graphics.fillStyle(0x3399ff);
        //     // FIXME - this only effects the first button

        //     this.startScene(_questionIndex);
        // })

        this.label.setPosition(10, 10);

        return this.container;
    }
}