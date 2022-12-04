const events = require('events');
const fs = require('fs');
const readline = require('readline');

const regex = /(\d*)-(\d*),(\d*)-(\d*)/;
let pairs = 0;


(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream('./day-4/input'),
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      const matches = line.match(regex);
      const rangeOneStart = parseInt(matches[1]);
      const rangeOneEnd = parseInt(matches[2]);
      const rangeTwoStart = parseInt(matches[3]);
      const rangeTwoEnd = parseInt(matches[4]);
      if ((rangeOneStart <= rangeTwoStart) && (rangeOneEnd >= rangeTwoEnd) ||
        (rangeTwoStart <= rangeOneStart) && (rangeTwoEnd >= rangeOneEnd)) pairs++;
    });

    await events.once(rl, 'close');
    console.log(`Total pairs: ${pairs}`);


  } catch (err) {
    console.error(err);
  }
})();