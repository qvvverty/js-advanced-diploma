import { calcTileType } from '../utils';

test.each`
index | expected
${0}  | ${'top-left'}
${1}  | ${'top'}
${6}  | ${'top'}
${7}  | ${'top-right'}
${8}  | ${'left'}
${9}  | ${'center'}
${14} | ${'center'}
${15} | ${'right'}
${56} | ${'bottom-left'}
${57} | ${'bottom'}
${62} | ${'bottom'}
${63} | ${'bottom-right'}
`('Expect calc to return $expected for index $index', ({ index, expected }) => {
  expect(calcTileType(index, 8)).toBe(expected);
});
