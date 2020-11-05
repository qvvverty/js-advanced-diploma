import PositionedCharacter from './PositionedCharacter';
import { generateTeam } from './generators';
import allowedTypes from './allowedTypes';
import { randomNumber } from './utils';

export default class Team {
  constructor(alignment) {
    this.alignment = alignment;
    this.members = [];
    this.positionedMembers = [];
    this.usedStartPositions = new Set();
  }

  add(maxLevel, characterCount) {
    const team = generateTeam(allowedTypes[this.alignment], maxLevel, characterCount);
    for (const member of team) {
      this.members.push(member);
      this.positionedMembers.push(new PositionedCharacter(member, this.getStartPosition()));
    }
    this.usedStartPositions.clear();
  }

  getStartPosition() {
    let position = randomNumber(63);
    if (this.alignment === 'good') {
      while (position % 8 > 1 || this.usedStartPositions.has(position)) {
        position = randomNumber(63);
      }
    }
    if (this.alignment === 'evil') {
      while (position % 8 < 6 || this.usedStartPositions.has(position)) {
        position = randomNumber(63);
      }
    }
    this.usedStartPositions.add(position);
    return position;
  }
}
