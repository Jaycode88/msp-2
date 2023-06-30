/**
 * @jest-environment jsdom
 */

jest.spyOn(window, "alert").mockImplementation(() => { });

const {
  startButton,
  scoreBoard,
  timerElement,
  timeUp,
  score,
  randomTime,
  checkCollision,
} = require("../game-script.js")


beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe('Variable existence tests', () => {
  test('startButton should be defined', () => {
    expect(startButton).toBeDefined();
  });

  test('scoreBoard should be defined', () => {
    expect(scoreBoard).toBeDefined();
  });

  test('timerElement should be defined', () => {
    expect(timerElement).toBeDefined();
  });

  test('timeUp should be defined', () => {
    expect(timeUp).toBeDefined();
  });

  test('score should be defined', () => {
    expect(score).toBeDefined();
  });
});

describe('Game functions', () => {
  test('randomTime should return a number within the specified range', () => {
    let min = 1000;
    let max = 2000;
    let result = randomTime(min, max);
    expect(result).not.toBeFalsy();
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
    
  });

  test('checkCollision returns true when collision detected', () => {
    // Arrange
    const bin = document.createElement('div');
    bin.innerHTML = `
      <div class="rat up"></div>
      <div class="mouse"></div>
      <div class="frog"></div>
    `;
  
    // Act
    const result = checkCollision(bin);
  
    expect(result).toBe(true);
  });

   
});
