const events = require('events');
const fs = require('fs');
const readline = require('readline');

/* 
  Note: I added an extra space at the end of the input lines
  for the stacks to make parsing easier
  I also removed a blank line between the stack inputs and the movement inputs
*/

let partOneSolution = -1;

(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream('./day-6/input'),
      crlfDelay: Infinity
    });
    let solutionPartOne = 4;

    rl.on('line', (line) => {
      for (let i=0; i<line.length-4; i++){
        let testPacket = line.substring(i,i+4);
        const testSet = new Set(testPacket);
        if (testSet.size === 4) {
          partOneSolution = i+4;
          break;
        }
      }
    });

    await events.once(rl, 'close');
    console.log(`Solution for part one: ${partOneSolution}`);


  } catch (err) {
    console.error(err);
  }
})();