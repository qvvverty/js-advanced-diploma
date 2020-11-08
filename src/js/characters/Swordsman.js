import Character from './Character';

export default class Swordsman extends Character {
  constructor(level, type = 'swordsman') {
    super(type);
    this.getStartLevel(level);
    this.move = 4;
    this.attack = 40;
    this.defence = 10;
    this.alignment = 'good';
  }
}
