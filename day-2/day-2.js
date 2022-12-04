const events = require('events');
const fs = require('fs');
const readline = require('readline');

let scorePartOne = 0;
let scorePartTwo = 0;
const scoreMatrixPartOne = {
  "A X": 4,
  "A Y": 8,
  "A Z": 3,
  "B X": 1,
  "B Y": 5,
  "B Z": 9,
  "C X": 7,
  "C Y": 2,
  "C Z": 6
}; 

const scoreMatrixPartTwo = {
  "A X": 3,
  "A Y": 4,
  "A Z": 8,
  "B X": 1,
  "B Y": 5,
  "B Z": 9,
  "C X": 2,
  "C Y": 6,
  "C Z": 7
};

(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream('input'),
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      scorePartOne += scoreMatrixPartOne[line];
      scorePartTwo += scoreMatrixPartTwo[line];
    });

    await events.once(rl, 'close');
    console.log(`final score for part one: ${scorePartOne}`);
    console.log(`final score for part two: ${scorePartTwo}`);
  } catch (err) {
    console.error(err);
  }
})();