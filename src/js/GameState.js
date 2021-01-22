export default class GameState {
  // static from(object) {
  from(object) {
    // TODO: create object

    this.turn = object.turn;
    this.positionedCharacters = object.positionedCharacters; // ??
    // this.activeCharacter = object.activeCharacter;
    return null;
  }
}
