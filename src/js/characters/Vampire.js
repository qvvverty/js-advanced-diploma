import Character from './Character';

export default class Vampire extends Character {
  constructor(level, type = 'vampire') {
    super(type);
    this.attack = 25;
    this.defence = 25;
    this.getStartLevel(level);
    this.alignment = 'evil';
  }
}
