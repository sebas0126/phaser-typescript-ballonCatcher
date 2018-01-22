import { Ballon } from '../classes/ballon';
import { Cloud } from '../classes/cloud';
import { Timer } from '../classes/timer';
import { Score } from '../classes/score';
import { Utils } from '../classes/utils';

export class Level1 extends Phaser.State {

	private music: Phaser.Sound;

	private timer;
	private score;
	private ms;

	private decoCircle;

	private ballons;
	private clouds;
	private velocity = 200;

	create() {

		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.addBackground();

		this.clouds = new Phaser.Group(this.game);
		this.clouds.enableBody = true;

//		this.addClouds(5);

		this.createTimer();
		this.addDecoration();
		this.createScore();

		this.addName();

		this.ballons = new Phaser.Group(this.game);
		this.ballons.enableBody = true;

		this.addBallons(5);

		this.increaseDifficulty();

		this.gameStart();
		
	}

//	addClouds(count){
//		if (count == 0) {
//			count = Utils.randomInterval(10, 20);
//		}
//		for (var i = 0; i < count; i++) {
//			var cloud = new Cloud(this.game, 0, 0, "cloud");
//			this.clouds.add(cloud);
//			cloud.randomPosition();
//			var vel = this.velocity * Utils.randomInterval(2, 10) * 0.05;
//			cloud.velocity = vel;
//		}
//	}

	addName(){
		var name = this.game.add.text(this.world.width * 0.98, this.world.height * 0.08, Utils.playerName, { font: '24px Helvetica', fill: '#808080'});
		name.anchor.x = 1;
	}

	gameStart(){
		Utils.startCb("Inicio del juego");
	}

	addBackground(){
		this.game.stage.backgroundColor = "#FFFFFF";
		this.add.tileSprite(0, this.game.height/2, this.game.width, this.game.height/2, 'bg');
		this.add.sprite(0, 0, "logo-aniversary");
		var somosLogo = this.add.sprite(0, this.world.height * 0.9, "logo-somos");
		somosLogo.position.x = this.world.width/2 - somosLogo.width/2;
	}

	addDecoration(){
		var decoLine = this.add.sprite(0, this.game.height * (3/4), "deco-line");
		decoLine.width = this.world.width; 
		this.decoCircle = this.add.sprite(this.game.width/2, this.game.height * 0.63, "deco-circle");
		this.decoCircle.width = this.world.width * 0.2;
		this.decoCircle.height = this.world.width * 0.2;
		this.decoCircle.position.x = this.game.width/2 - this.decoCircle.width/2;
	}

	increaseDifficulty(){
		var countdown = this.game.time.create(false);
		countdown.loop(10000, function(){
			this.addBallons(Utils.randomInterval(3, 5));
		}, this);
		countdown.start();
	}

	addBallons(count){
		this.generateObjects(count, this.ballons, ['ballons']);
	}

	createTimer() {
		this.timer = new Timer(this.game, this.world.width * 0.76, this.world.height * 0.03, 'Tiempo: 00:00', { font: '42px Helvetica', fill: '#91C748', fontWeight: 'bold'});
		this.timer.start();
		
	}

	createScore() {
		this.score = new Score(this.game, this.decoCircle.position.x + this.decoCircle.width / 2, this.decoCircle.position.y + this.decoCircle.height * 0.33, '0', { font: '72px Helvetica', fill: '#00823E', fontWeight: 'bold'});
		var text = this.game.add.text(this.decoCircle.position.x + this.decoCircle.width / 2 , this.decoCircle.position.y + this.decoCircle.height * 0.6, "Globos", { font: '24px Helvetica', fill: '#91C748'});
		text.anchor.x = Math.round(text.width * 0.5) / text.width;
	}

	update() {
		if(this.ballons.children.some(x => x.dead)){
			this.gameEnd();
		}
	}

	gameEnd(){
		this.game.state.start('MainMenu', true, false);
		this.ms = this.timer.getMs();
		this.timer.stop();
		Utils.endCb({
			time: this.ms,
			count: this.score.getScore()
		});
		Utils.stopFullScreen(this.game);
	}

	generateObjects(count, group, image) {
		if (count == 0) {
			count = Utils.randomInterval(10, 20);
		}
		for (var i = 0; i < count; i++) {
			var ballon = new Ballon(this.game, 0, 0, image, this.score);
			ballon.randomPosition();
			group.add(ballon);
			var vel = this.velocity * Utils.randomInterval(10, 15) * 0.1;
			ballon.setVelocity(vel);
		}
	}

	moveObjects(group) {
		group.children.forEach(function (item) {
			item.body.velocity.y = item.velocity;
		});
	}

}
