import themes from './themes';
import Team, { positionedCharacters } from './Team';
import GamePlay from './GamePlay';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
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
      this.gamePlay.deselectCell(character.position);
      if (character.position === index) {
        if (character.character.alignment === 'good') {
          this.gamePlay.selectCell(index);
        } else {
          GamePlay.showError('Unplayable character!');
        }
      }
    }
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
    for (const character of positionedCharacters) {
      if (character.position === index) {
        this.gamePlay.showCellTooltip(`\uD83C\uDF96${character.character.level} \u2694${character.character.attack} \uD83D\uDEE1${character.character.defence} \u2764${character.character.health}`, index);
      }
    }
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
    for (const character of positionedCharacters) {
      if (character.position === index) {
        this.gamePlay.hideCellTooltip(index);
      }
    }
  }
}
