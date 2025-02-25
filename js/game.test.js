const { switchPlayer } = require('./game');

describe('switchPlayer function', () => {
  test('should switch to the next player in a two-player game', () => {
    expect(switchPlayer(0, 2)).toBe(1);
    expect(switchPlayer(1, 2)).toBe(0);
  });

  test('should cycle through players correctly in a multi-player game', () => {
    expect(switchPlayer(0, 3)).toBe(1);
    expect(switchPlayer(1, 3)).toBe(2);
    expect(switchPlayer(2, 3)).toBe(0);
  });

  test('should return correct player index for a 4-player game', () => {
    expect(switchPlayer(2, 4)).toBe(3);
    expect(switchPlayer(3, 4)).toBe(0);
    expect(switchPlayer(0, 4)).toBe(1);
  });
});

