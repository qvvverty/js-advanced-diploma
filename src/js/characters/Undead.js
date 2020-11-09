import Character from './Character';

export default class Undead extends Character {
  constructor(level, type = 'undead') {
    super(type);
    this.getStartLevel(level);
    this.move = 4;
    this.attackRange = 1;
    this.attack = 40;
    this.defence = 10;
    this.alignment = 'evil';
  }
}
