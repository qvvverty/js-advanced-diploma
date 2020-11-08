import Character from './Character';

export default class Magician extends Character {
  constructor(level, type = 'magician') {
    super(type);
    this.getStartLevel(level);
    this.move = 1;
    this.attack = 10;
    this.defence = 40;
    this.alignment = 'good';
  }
}
