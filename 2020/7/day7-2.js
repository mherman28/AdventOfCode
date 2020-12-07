const fs = require('fs');

const bags = {};

try {
    const data = fs.readFileSync('input', 'utf8');
    const fileRows = data.split('\n');
    const result = processFileRows(fileRows);
    console.info('Result: ' + result);
} catch (e) {
    console.error('Error:', e.stack);
}

function processFileRows(rows) {

    rows.forEach(row => {
       const matches = [...row.matchAll(/(?<amount>\d?)\s?(?<name>\w+\s\w+)\sbag/g)];
       const containerBagMatch = matches[0];
       const containedBags = [];
       for (let i=1; i<matches.length; i++) {
           if (matches[i].groups.name === 'no other') {
               continue;
           }
           containedBags.push({
              'name': matches[i].groups.name,
              'amount': parseInt(matches[i].groups.amount)
           });
       }
       bags[containerBagMatch.groups.name] = containedBags;
    });
    return getContainedBagsAmount('shiny gold');
}

function getContainedBagsAmount(container) {
    if (!bags[container] || bags[container].length === 0) {
        return 0;
    }
    let containedBagsAmount = 0;
    for (const containedBag of bags[container]) {
        containedBagsAmount += containedBag.amount;
        containedBagsAmount += containedBag.amount * getContainedBagsAmount(containedBag.name);
    }
    return containedBagsAmount;
}