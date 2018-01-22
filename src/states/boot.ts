import { Utils } from '../classes/utils';

export class Boot extends Phaser.State {

	preload() {
		this.game.scale.compatibility.scrollTo = null;
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.refresh();
		// if (Utils.detectMobile()) {
		// 	this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		// 	this.game.scale.refresh();
		// } else {
		// 	this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
		// 	this.game.scale.refresh();
		// }

		this.game.time.advancedTiming = true;

		this.load.image('logo-somos', Utils.path + 'assets/img/logo-somos.png');
		this.load.image('bg', Utils.path + 'assets/img/bg-city.png');

	}

	create() {

		//  Unless you specifically need to support multitouch I would recommend setting this to 1
		this.input.maxPointers = 1;

		//  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
		this.stage.disableVisibilityChange = true;

		if (this.game.device.desktop) {
			//  If you have any desktop specific settings, they can go in here
			this.scale.pageAlignHorizontally = true;
		}
		else {
			//  Same goes for mobile settings.
		}

		this.game.state.start('MainMenu', true, false);

	}

}
