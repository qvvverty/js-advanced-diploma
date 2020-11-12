import themes from './themes';
import Team, { positionedCharacters } from './Team';
import GamePlay from './GamePlay';
// import GameState, { gameState } from './GameState';
import { calcAvailableMoves, calcAttackRange } from './utils';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.activeCharacter = null;
    this.availableMoves = [];
    this.attackRange = [];
  }

  set selectedCharacter(character) {
    this.activeCharacter = character;
    this.availableMoves = calcAvailableMoves(character);
    this.attackRange = calcAttackRange(character);
  }

  get selectedCharacter() {
    return this.activeCharacter;
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
    this.gamePlay.drawUi(themes.prairie);
    this.addEventListeners();
    const teamGood = new Team('good');
    teamGood.add(1, 3);
    const teamEvil = new Team('evil');
    teamEvil.add(1, 3);
    this.gamePlay.redrawPositions(positionedCharacters);
  }

  addEventListeners() {
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
  }

  onCellClick(index) {
    // TODO: react to click
    for (const character of positionedCharacters) {
      if (character.position === index) {
        if (character.character.alignment === 'good') {
          this.selectedCharacter = character;
          this.gamePlay.selectCell(index);
        } else {
          GamePlay.showError('Unplayable character!');
        }
      }
    }
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
    if (this.selectedCharacter) {
      if (this.availableMoves.includes(index)) {
        this.gamePlay.setCursor('pointer');
        this.gamePlay.selectCell(index, 'green');
      } else {
        this.gamePlay.setCursor('not-allowed');
      }
    }

    for (const character of positionedCharacters) {
      if (character.position === index) {
        this.gamePlay.showCellTooltip(`\uD83C\uDF96${character.character.level} \u2694${character.character.attack} \uD83D\uDEE1${character.character.defence} \u2764${character.character.health}`, index);
        // if (character.character.alignment === 'evil') {
        //   this.gamePlay.setCursor('not-allowed');
        // }
      }
    }
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
    this.gamePlay.setCursor('auto');
    if (this.selectedCharacter && index !== this.selectedCharacter.position) {
      this.gamePlay.deselectCell(index);
    }

    for (const character of positionedCharacters) {
      if (character.position === index) {
        this.gamePlay.hideCellTooltip(index);
      }
    }
  }
}
