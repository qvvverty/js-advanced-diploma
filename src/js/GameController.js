import themes from './themes';
import Team from './Team';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
    this.gamePlay.drawUi(themes.prairie);
    const teamGood = new Team('good');
    teamGood.add(1, 3);
    const teamEvil = new Team('evil');
    teamEvil.add(1, 3);
    const allPositionedCharacters = [...teamGood.positionedMembers, ...teamEvil.positionedMembers];
    this.gamePlay.redrawPositions(allPositionedCharacters);
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }
}
