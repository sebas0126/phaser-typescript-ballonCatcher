
export class Utils {

	public static endCb;
	public static startCb;
	public static playerName;
	public static path;

	public static randomInterval(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	public static pad(n, z) {
		z = z || 2;
		return ('00' + n).slice(-z);
	}

	public static generateToken() {
		return Math.random().toString(36).slice(2);
	}

	public static goFullScreen(game) {
		game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.startFullScreen();
	}

	public static stopFullScreen(game) {
		game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.stopFullScreen();
	}

	public static detectMobile() {
		if (navigator.userAgent.match(/Android/i)
			|| navigator.userAgent.match(/webOS/i)
			|| navigator.userAgent.match(/iPhone/i)
			|| navigator.userAgent.match(/iPad/i)
			|| navigator.userAgent.match(/iPod/i)
			|| navigator.userAgent.match(/BlackBerry/i)
			|| navigator.userAgent.match(/Windows Phone/i)
		) {
			return true;
		}
		else {
			return false;
		}
	}

}


