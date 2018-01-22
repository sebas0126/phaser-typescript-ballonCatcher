import { Utils } from './utils';

export class Score extends Phaser.Text{

  private scoreCounter = 0;

  constructor(game: Phaser.Game, x:number, y:number, text:string, style:any){
    super(game, x, y, text, style);

    this.game.add.existing(this);

    this.anchor.x = Math.round(this.width * 0.5) / this.width;
  }

  increment(){
    this.scoreCounter++;
    this.setText("" + this.scoreCounter);
  }

  getScore(){
    return this.scoreCounter;
  }

}