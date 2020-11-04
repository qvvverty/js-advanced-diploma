import Character from './Character';

export default class Undead extends Character {
  constructor(level, type = 'undead') {
    super(type);
    this.attack = 40;
    this.defence = 10;
    this.getStartLevel(level);
  }
}
