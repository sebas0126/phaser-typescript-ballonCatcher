import { Utils } from '../classes/utils';

export class Ballon extends Phaser.Sprite {

  public velocity = 0;
  public baseVelocity;
  public dead: boolean = false;

  private fps = false;

  private explodeEmitter1;
  private explodeEmitter2;

  private bounds = 0;
  private bouncing = false;
  private multiplier = 3;

  private score;

  constructor(game: Phaser.Game, x: number, y: number, image: string, score: any) {
    super(game, x, y, image);

    this.score = score;

    this.inputEnabled = true;
    this.events.onInputDown.add(this.onClick, this);

    this.frame = Utils.randomInterval(0, 4);

    this.addExplodeEmitter();

    setTimeout(() => {
      this.bouncing = true;
    }, Utils.randomInterval(0, 1000));

    setTimeout(() => {
      this.fps = true;
    }, 1500);
  }
  
  checkFrames(){
    if(!this.fps) return;
    if(this.game.time.fps > 0 && this.game.time.fps < 45){
      this.velocity = this.baseVelocity * 3; 
    }else if(this.game.time.fps > 45 && this.game.time.fps < 50){
      this.velocity = this.baseVelocity * 2;
    }else if(this.game.time.fps > 50 && this.game.time.fps < 55){
      this.velocity = this.baseVelocity * 1.5;
    }else{
      this.velocity = this.baseVelocity;
    }
  }

  addExplodeEmitter() {
    this.explodeEmitter1 = this.game.add.emitter(30, 30, 15);
    this.explodeEmitter1.makeParticles('conf1');
    this.explodeEmitter1.setRotation(0, 120);
    this.explodeEmitter1.setAlpha(0.5, 1);
    this.explodeEmitter1.setScale(0.3, 0.5, 1, 2);
    this.explodeEmitter1.maxParticleSpeed = new Phaser.Point(-200, -200);
    this.explodeEmitter1.minParticleSpeed = new Phaser.Point(200, 200);
    this.explodeEmitter2 = this.game.add.emitter(30, 30, 15);
    this.explodeEmitter2.makeParticles('conf2');
    this.explodeEmitter2.setRotation(0, 120);
    this.explodeEmitter2.setAlpha(0.5, 1);
    this.explodeEmitter2.gravity = 200;
    this.explodeEmitter2.setScale(0.5, 0.8, 0.5, 0.8);
    this.explodeEmitter2.maxParticleSpeed = new Phaser.Point(-100, -100);
    this.explodeEmitter2.minParticleSpeed = new Phaser.Point(100, 100);
  }

  onClick() {
    this.explosion(this.position);
    this.randomPosition();
    this.score.increment();
  }

  explosion(ballonPosition){
    this.explodeEmitter1.position = ballonPosition;
    this.explodeEmitter1.start(true, 400, 0, 20);
    this.explodeEmitter2.position = ballonPosition;
    this.explodeEmitter2.start(true, 600, 0, 30);
  }

  randomPosition() {
    var rdmW = Utils.randomInterval(0, this.game.world.width - this.width);
    var rdmH = Utils.randomInterval(-this.game.world.height, -this.height);
    this.position = new Phaser.Point(rdmW, rdmH);
  }

  setVelocity(vel){
    this.velocity = vel;
    this.baseVelocity = vel;
  }

  addBounce(){
    if(!this.bouncing){
      return;
    }
    this.bounds += this.multiplier;
    if(this.bounds > 100 || this.bounds < -100){
      this.multiplier *= -1;
    }
    this.body.velocity.x = Math.sin(this.bounds * 0.01) * 100;
  }

  update() {
    this.body.velocity.y = this.velocity;
    if (this.position.y > this.game.world.height - 50) {
      this.dead = true;
    }
    this.addBounce();
    this.checkFrames();
  }

}
