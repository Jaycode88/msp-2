/**
 * @jest-environment jsdom
 */
const { JSDOM } = require("jsdom");
jest.mock('../game-script');

const {randomTime,
} = require("../game-script.js")


describe('randomTime', () => {
    test('should return a random time between min and max values', () => {
      const min = 200;
      const max = 2000;
      const result = randomTime(min, max);
      expect(result).toBeGreaterThanOrEqual(min);
      expect(result).toBeLessThanOrEqual(max);
    });
  });