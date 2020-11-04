/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */

import { randomNumber } from './utils';

export function* characterGenerator(allowedTypes, maxLevel) {
  // TODO: write logic here
  while (true) {
    yield new allowedTypes[randomNumber(allowedTypes.length - 1)](randomNumber(maxLevel));
  }
}

export function generateTeam(allowedTypes, maxLevel, characterCount) {
  // TODO: write logic here
  const team = [];
  const charGen = characterGenerator(allowedTypes, maxLevel);
  for (let i = characterCount; i > 0; i -= 1) {
    team.push(charGen.next().value);
  }
  return team;
}
