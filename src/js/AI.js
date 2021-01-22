import { calcAvailableMoves, calcAttackRange } from './utils';

export default class AI {
  constructor(teamEvil, teamGood) {
    this.teamEvil = teamEvil;
    this.teamGood = teamGood;
  }

  makeMove() {
    for (const member of this.teamEvil.positionedMembers) {
      const targetsArr = [];
      const attackRange = calcAttackRange(member);
      for (const char of this.teamGood.positionedMembers) {
        if (attackRange.includes(char.position)) {
          targetsArr.push(char);
        }
      }
      if (targetsArr.length > 0) {
        const target = AI.getWeakest(targetsArr);
        member.character.charge(target);
      }
    }
  }

  static getWeakest(targetsArr) {
    let weakest = targetsArr[0];
    for (const char of targetsArr) {
      if (char.character.health < weakest.character.health) weakest = char;
    }
    return weakest;
  }
}
