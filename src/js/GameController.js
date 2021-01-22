import themes from './themes';
import Team, { positionedCharacters } from './Team';
import GamePlay from './GamePlay';
// import GameState, { gameState } from './GameState';
import { calcAvailableMoves, calcAttackRange } from './utils';
// import GameState from './GameState';
import AI from './AI';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    // this.gameState = new GameState();

    this.activeCharacter = null;
    this.availableMoves = [];
    this.attackRange = [];
  }

  getFields(character) {
    this.availableMoves = calcAvailableMoves(character);
    for (const char of positionedCharacters) {
      const occupiedIndex = this.availableMoves.indexOf(char.position);
      if (occupiedIndex > -1) {
        this.availableMoves.splice(occupiedIndex, 1);
      }
    }
    this.attackRange = calcAttackRange(character);
  }

  set selectedCharacter(character) {
    if (character === null) {
      this.activeCharacter = null;
      return;
    }

    if (this.activeCharacter) {
      this.gamePlay.deselectCell(this.activeCharacter.position);
    }
    this.activeCharacter = character;
    this.gamePlay.selectCell(character.position);
    this.getFields(character);
  }

  get selectedCharacter() {
    return this.activeCharacter;
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
    this.gamePlay.drawUi(themes.prairie);
    this.addEventListeners();
    this.teamGood = new Team('good');
    this.teamGood.add(1, 3);
    this.teamEvil = new Team('evil');
    this.teamEvil.add(1, 3);
    this.ai = new AI(this.teamEvil, this.teamGood);

    this.gamePlay.redrawPositions(positionedCharacters);
  }

  addEventListeners() {
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
  }

  static charOn(position) {
    for (const character of positionedCharacters) {
      if (character.position === position) {
        return character;
      }
    }
    return null;
  }

  async onCellClick(index) {
    // TODO: react to click
    const charOnCell = GameController.charOn(index);
    if (this.selectedCharacter) {
      if (charOnCell) {
        if (charOnCell.character.alignment === 'good') {
          this.selectedCharacter = charOnCell;
        } else if (charOnCell.character.alignment === 'evil') {
          if (this.attackRange.includes(charOnCell.position)) {
            const damageDone = this.selectedCharacter.character.charge(charOnCell);
            this.gamePlay.redrawPositions(positionedCharacters);
            await this.gamePlay.showDamage(charOnCell.position, damageDone);

            // this.ai.makeMove();
          } else {
            GamePlay.showError('Unplayable character!');
          }
        }
      } else if (this.availableMoves.includes(index)) {
        this.gamePlay.deselectCell(this.selectedCharacter.position);
        this.selectedCharacter.position = index;
        this.gamePlay.deselectCell(index);
        this.gamePlay.redrawPositions(positionedCharacters);

        this.selectedCharacter = null;

        // this.ai.makeMove();
      }
    } else {
      this.selectedCharacter = charOnCell;
    }
  }

  /* async onCellClick(index) {
    // TODO: react to click
    if (this.activeCharacter) {
      if (this.availableMoves.includes(index)) {
        this.gamePlay.deselectCell(this.activeCharacter.position);
        this.activeCharacter.position = index;
        this.gamePlay.redrawPositions(positionedCharacters);
        this.getFields(this.activeCharacter);
      }

      const charOnCell = GameController.charOn(index);
      if (charOnCell && charOnCell.character.alignment === 'evil' && this.attackRange.includes(charOnCell.position)) {
        // const damage = Math.max(this.activeCharacter.character.attack - charOnCell.character.defence, this.activeCharacter.character.attack * 0.1);
        // charOnCell.character.health -= damage;
        const damageDone = this.activeCharacter.character.charge(charOnCell);
        this.gamePlay.redrawPositions(positionedCharacters);
        await this.gamePlay.showDamage(charOnCell.position, damageDone);
      } else {
        this.gamePlay.deselectCell(this.activeCharacter.position);
        this.activeCharacter = null;
      }
    }

    if (!this.activeCharacter) {
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
  } */

  onCellEnter(index) {
    // TODO: react to mouse enter
    for (const character of positionedCharacters) {
      if (character.position === index) {
        this.gamePlay.showCellTooltip(`\uD83C\uDF96${character.character.level} \u2694${character.character.attack} \uD83D\uDEE1${character.character.defence} \u2764${character.character.health}`, index);
        if (character.character.alignment === 'good') {
          this.gamePlay.setCursor('pointer');
        } else {
          this.gamePlay.setCursor('not-allowed');
        }
      }
    }

    if (this.selectedCharacter) {
      if (this.availableMoves.includes(index)) {
        this.gamePlay.setCursor('pointer');
        this.gamePlay.selectCell(index, 'green');
      }
      for (const character of positionedCharacters) {
        // eslint-disable-next-line max-len
        if (character.position === index && character.character.alignment !== this.selectedCharacter.character.alignment && this.attackRange.includes(character.position)) {
          this.gamePlay.setCursor('crosshair');
          this.gamePlay.selectCell(index, 'red');
        }
      }
      // this.gamePlay.setCursor('not-allowed');
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
