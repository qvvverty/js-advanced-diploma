import PositionedCharacter from './PositionedCharacter';
import { generateTeam } from './generators';
import allowedTypes from './allowedTypes';
import { randomNumber } from './utils';

export const positionedCharacters = new Set();

export default class Team {
  constructor(alignment) {
    this.alignment = alignment;
    this.members = [];
    this.positionedMembers = [];
    this.occupiedPositions = new Set();
  }

  add(maxLevel, characterCount) {
    const team = generateTeam(allowedTypes[this.alignment], maxLevel, characterCount);
    for (const member of team) {
      this.members.unshift(member);
      this.positionedMembers.unshift(new PositionedCharacter(member, this.getStartPosition()));
      positionedCharacters.add(this.positionedMembers[0]);
    }
    this.occupiedPositions.clear();
  }

  getStartPosition() {
    for (const character of positionedCharacters) {
      this.occupiedPositions.add(character.position);
    }
    let position = randomNumber(63);
    if (this.alignment === 'good') {
      while (position % 8 > 1 || this.occupiedPositions.has(position)) {
        position = randomNumber(63);
      }
    }
    if (this.alignment === 'evil') {
      while (position % 8 < 6 || this.occupiedPositions.has(position)) {
        position = randomNumber(63);
      }
    }
    this.occupiedPositions.add(position);
    return position;
  }
}
