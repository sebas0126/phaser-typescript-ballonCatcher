
export class MainMenu extends Phaser.State {

    create() {

        this.addBackground();

    }

    addBackground(){
		this.game.stage.backgroundColor = "#FFFFFF";
		this.add.tileSprite(0, this.game.height/2, this.game.width, this.game.height/2, 'bg');
		var somosLogo = this.add.sprite(0, this.world.height * 0.9, "logo-somos");
		somosLogo.position.x = this.world.width/2 - somosLogo.width/2;
	}

}
