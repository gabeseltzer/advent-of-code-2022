const events = require('events');
const fs = require('fs');
const readline = require('readline');

const stackRegEx = /(?: |\[)( |[A-Z])(?: |\]) /g;
const numberOfStacksRegEx = /(\d) +$/g;
const movementRegEx = /move (\d+) from (\d+) to (\d+)/;
const rows = [];
let stacksPartOne = [];
let stacksPartTwo = [];
let columns = 0;

/* 
  Note: I added an extra space at the end of the input lines
  for the stacks to make parsing easier
  I also removed a blank line between the stack inputs and the movement inputs
*/

(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream('./day-5/input'),
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      const cargo = line.match(stackRegEx);
      if (cargo){
        const currentRow = [];
        cargo.forEach((match) => {
          currentRow.push(match.substring(1,2));

        });
        rows.push(currentRow);
      }
      const numberOfColumns = line.match(numberOfStacksRegEx);
      if (numberOfColumns) {
        columns = parseInt(numberOfColumns[0].substring(0,numberOfColumns[0].length-2));
        formStacks();
      }
      const moveCommand = line.match(movementRegEx);
      if (moveCommand) {
        const numberOfMoves = parseInt(moveCommand[1]);
        const sourceColumn = parseInt(moveCommand[2]);
        const destColumn = parseInt(moveCommand[3]);
        for (let i = 1; i <= numberOfMoves; i++) {
          const movingCrate = stacksPartOne[sourceColumn-1].pop();
          stacksPartOne[destColumn-1].push(movingCrate);
        }
        const stackLength = stacksPartTwo[sourceColumn-1].length;
        const movingCrates = stacksPartTwo[sourceColumn-1].splice(stackLength-(numberOfMoves));
        stacksPartTwo[destColumn-1].push(...movingCrates);
      }
    });

    await events.once(rl, 'close');
    console.log("Final stacks for part one: ")
    console.log(stacksPartOne);
    let solution = '';
    stacksPartOne.forEach((stack) => {
      solution += stack[stack.length-1];
    });
    console.log(`Solution for part one: ${solution}`);
    console.log("Final stacks for part Two: ")
    console.log(stacksPartTwo);
    solution = '';
    stacksPartTwo.forEach((stack) => {
      solution += stack[stack.length-1];
    });
    console.log(`Solution for part two: ${solution}`);


  } catch (err) {
    console.error(err);
  }
})();

function formStacks() {
  stacksPartOne = Array.from(Array(columns),() => new Array(0));
  for (let i = rows.length-1; i>=0; i--) {
    const currentRow = rows[i];
    currentRow.forEach((value, index) => {
      if (value !== ' '){
        stacksPartOne[index].push(value);
      };
    });
  }
  stacksPartTwo = JSON.parse(JSON.stringify(stacksPartOne));

}