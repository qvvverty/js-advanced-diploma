import Character from './Character';

export default class Vampire extends Character {
  constructor(level, type = 'vampire') {
    super(type);
    this.getStartLevel(level);
    this.move = 2;
    this.attack = 25;
    this.defence = 25;
    this.alignment = 'evil';
  }
}
