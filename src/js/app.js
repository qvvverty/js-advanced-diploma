/**
 * Entry point of app: don't change this
 */
import GamePlay from './GamePlay';
import GameController from './GameController';
import GameStateService from './GameStateService';

const gamePlay = new GamePlay();
gamePlay.bindToDOM(document.querySelector('#game-container'));

const stateService = new GameStateService(localStorage);

const gameCtrl = new GameController(gamePlay, stateService);
gameCtrl.init();

// don't write your code here
// import Bowman from './characters/Bowman';
// import allowedTypes from './allowedTypes';
// import { generateTeam } from './generators';

// const team = generateTeam(allowedTypes.evil, 2, 3);
// console.log(team);
