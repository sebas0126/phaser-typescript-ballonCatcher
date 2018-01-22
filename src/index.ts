/// <reference path="../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../node_modules/phaser/typescript/pixi.d.ts"/>

import 'pixi';
import 'p2';
import * as Phaser from 'phaser';

import { Boot } from './states/boot';
import { Preloader } from './states/preloader';
import { MainMenu } from './states/mainmenu';
import { Level1 } from './states/level1';

import { Utils } from './classes/utils';

export class Game extends Phaser.Game {

  game: Phaser.Game;
  public static data;

  constructor(data) {

    super(1280, 960, Phaser.AUTO, 'content', null);

    this.state.add('Boot', Boot, false);
    this.state.add('Preloader', Preloader, false);
    this.state.add('MainMenu', MainMenu, false);
    this.state.add('Level1', Level1, false);

    Utils.endCb = data.end;
    Utils.startCb = data.start;
    Utils.playerName = data.name;
    Utils.path = data.path;

    this.state.start('Boot');

    var modInst = document.getElementById("instructions");
    var modMenu = document.getElementById("menu");
    var modTyc = document.getElementById("tyc");
    var modTop = document.getElementById("top");

    var initGame = Array.prototype.slice.call(document.getElementsByClassName("btnInit"));
    initGame.forEach(element => {
      element.onclick = () => {
        this.state.start('Preloader', true, false);
        modMenu.style.display = "none";
        modInst.style.display = "none";
        Utils.goFullScreen(this);
      }
    });

    var tyc = Array.prototype.slice.call(document.getElementsByClassName("terms"));
    tyc.forEach(element => {
      element.onclick = () => {
        modTyc.style.display = "initial";
      }
    });

    var inst = document.getElementById("btnGuide");
    inst.onclick = () => {
      modInst.style.display = "initial";
      modMenu.style.display = "none";
    }

    var close = Array.prototype.slice.call(document.getElementsByClassName("btnClose"));
    close.forEach(element => {
      element.onclick = () => {
        element.parentElement.style.display = "none";
      }
    });
  }


}
