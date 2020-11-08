import Character from './Character';

export default class Bowman extends Character {
  constructor(level, type = 'bowman') {
    super(type);
    this.getStartLevel(level);
    this.move = 2;
    this.attack = 25;
    this.defence = 25;
    this.alignment = 'good';
  }
}
