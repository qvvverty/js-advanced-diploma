import { randomNumber } from '../utils';

export default class Character {
  constructor(type = 'generic') {
    if (new.target.name === 'Character') {
      throw new Error('Unable to create new Character. Use a subclass.');
    }
    this.level = 1;
    this.health = 100;
    this.type = type;
  }

  levelUp(health = this.health) {
    this.level += 1;
    this.attack = Math.max(this.attack, Math.round(this.attack * (0.8 + (health / 100))));
    this.defence = Math.max(this.defence, Math.round(this.defence * (0.8 + (health / 100))));
    this.health += 80;
    if (this.health > 100) this.health = 100;
  }

  getStartLevel(level) {
    if (level > 1) {
      for (let i = level; i > 1; i -= 1) {
        this.levelUp(randomNumber(100, 50));
      }
    }
  }

  // с этим пока неясно
  // damage(points) {
  //   if (this.health > 0) this.health -= points * (1 - this.defence / 100);
  // }
}
