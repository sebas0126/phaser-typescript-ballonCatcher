import { Utils } from '../classes/utils';

export class Cloud extends Phaser.Sprite {

  public velocity = 0;

  constructor(game: Phaser.Game, x: number, y: number, image: string) {
    super(game, x, y, image);
    this
    game.add.existing(this);
  }

  randomPosition() {
    var rdmW = Utils.randomInterval(this.game.world.width, this.game.world.width * 2);
    var rdmH = Utils.randomInterval(0, this.game.world.height * 0.6);
    this.position = new Phaser.Point(rdmW, rdmH);
  }

  update() {
    this.body.velocity.x = -this.velocity;
    if (this.position.x < -100) {
      this.randomPosition();
    }
  }

}
