import { Utils } from '../classes/utils';

export class Preloader extends Phaser.State {

    preloadBar: Phaser.Sprite;

    preload() {

        //  Set-up our preloader sprite
        this.preloadBar = this.add.sprite(0, 0, 'logo-somos');
        this.preloadBar.position.x = this.world.width / 2 - this.preloadBar.width / 2;
        this.preloadBar.position.y = this.world.height / 2 - this.preloadBar.height / 2;
        this.load.setPreloadSprite(this.preloadBar);

        //  Load our actual games assets
        this.load.image('logo-aniversary', Utils.path + 'assets/img/logo-aniversary.png');
        this.load.image('conf1', Utils.path + 'assets/img/confetti1.png');
        this.load.image('conf2', Utils.path + 'assets/img/confetti2.png');
        this.load.image('cloud', Utils.path + 'assets/img/cloud.png');
        this.load.spritesheet('ballons', Utils.path + 'assets/img/ballons.png', 96, 113, 5);

        this.load.image('deco-line', Utils.path + 'assets/img/decoration.png');
        this.load.image('deco-circle', Utils.path + 'assets/img/circle-decoration.png');

    }

    create() {
        var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(this.startMainMenu, this);
    }

    startMainMenu() {
        this.game.state.start('Level1', true, false);
    }

}