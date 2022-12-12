const events = require('events');
const fs = require('fs');
const readline = require('readline');

const elves = []
let currentElf = 0


async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream('test-1-input.txt'),
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      if (line == "") {
        elves.push(currentElf);
        currentElf = 0;
      } else {
        currentElf += parseInt(line);
      }
    });

    await events.once(rl, 'close');
  } catch (err) {
    console.error(err);
  }
}

processLineByLine().then (() => {
  const maxSnacks = Math.max(...elves);
  console.log(`The most snacks is: ${maxSnacks}`);

  elves.sort(function(a, b) {
    return b - a;
  });
  const threeTopSnacks = elves[0] + elves[1] + elves[2];
  console.log(`The combined snacks of the top three elves is: ${threeTopSnacks}`);
});