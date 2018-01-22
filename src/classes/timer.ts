import { Utils } from './utils';

export class Timer extends Phaser.Text{

  private elapsedTime;

  private timeCounter = 0;

  constructor(game: Phaser.Game, x:number, y:number, text:string, style:any){
    super(game, x, y, text, style);

    this.game.add.existing(this);

    this.createTimer();
  }

  createTimer(){
    this.elapsedTime = this.game.time.create(false);
    this.elapsedTime.loop(1000, function () {
			this.timeCounter++;
			var min = Math.floor(this.timeCounter / 60);
			this.setText("Tiempo: " + Utils.pad(min, 2) + ":" + Utils.pad(this.timeCounter - (min * 60), 2));
		}, this);
  }

  getMs(){
    return this.timeCounter * 1000 + parseInt(this.elapsedTime.duration.toFixed(0));
  }

  getTime(){

  }

  start(){
		this.elapsedTime.start();
  }

  stop(){
    this.elapsedTime.stop();
  }

  restart(){
    this.timeCounter = 0;
  }

}