import Character from '../Character';
import Bowman from '../Bowman';

test('Expect Character to throw error from constructor', () => {
  expect(() => new Character()).toThrow(new Error('Unable to create new Character. Use a subclass.'));
});

test('Expect Character subclass to return character object without error', () => {
  const bowmanExpected = {
    attack: 25,
    defence: 25,
    health: 100,
    level: 1,
    type: 'bowman',
  };

  const bowman = new Bowman();
  expect(bowman).toEqual(bowmanExpected);
});
