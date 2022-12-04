const events = require('events');
const fs = require('fs');
const readline = require('readline');

const matches = [];
let totalScore = 0;
let lineNumber = 0;
let groupItems = [];
const badgeItems = [];
(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream('./day-3/input'),
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      lineNumber++;
      groupItems.push(line);
      console.log(line);
      const compartmentSize = ((line.length) / 2)
      const compartmentOne = line.substring(0, compartmentSize);
      const compartmentTwo = line.substring(compartmentSize);
      console.log(`Compartment 1: ${compartmentOne}`);
      console.log(`Compartment 2: ${compartmentTwo}`);

      let alreadyMatched = [];
      [...compartmentOne].forEach(char => {
        if (!alreadyMatched.includes(char) && compartmentTwo.includes(char)) {
          matches.push(char);
          alreadyMatched.push(char);
          console.log(`Matched: ${char}`);
        }
      });

      if (lineNumber === 3){
        const deDuplicatedItems = []
        const counts = {}
        for (let i = 0; i<3; i++){
          deDuplicatedItems.push(...new Set(groupItems[i]));
        }
        deDuplicatedItems.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        for (const item in counts) {
          if (counts[item]===3) {
            badgeItems.push(item);
          };
        };
        lineNumber = 0;
        groupItems = [];
      }
    });

    await events.once(rl, 'close');
    [...matches].forEach(match => {
      let score = match.charCodeAt(0)-96;
      if (score < 1) score += 58;
      totalScore += score;
    });
    console.log(`Final Score: ${totalScore}`);
    totalScore = 0;
    [...badgeItems].forEach(match => {
      let score = match.charCodeAt(0)-96;
      if (score < 1) score += 58;
      totalScore += score;
    });
    console.log(`Final Badge Score: ${totalScore}`);

  } catch (err) {
    console.error(err);
  }
})();