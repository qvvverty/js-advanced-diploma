import Character from './Character';

export default class Daemon extends Character {
  constructor(level, type = 'daemon') {
    super(type);
    this.attack = 10;
    this.defence = 40;
    this.getStartLevel(level);
    this.alignment = 'evil';
  }
}
