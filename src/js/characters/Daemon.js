import Character from './Character';

export default class Daemon extends Character {
  constructor(level, type = 'daemon') {
    super(type);
    this.getStartLevel(level);
    this.move = 1;
    this.attack = 10;
    this.defence = 40;
    this.alignment = 'evil';
  }
}
