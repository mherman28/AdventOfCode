const fs = require('fs');

const preambleSize = 25;
try {
    const fileRows = fs.readFileSync('input', 'utf8');
    const data = fileRows.split('\n').map(data => parseInt(data));
    const result = processFileRows(data);
    console.info('Result: ' + result);
} catch (e) {
    console.error('Error:', e.stack);
}

function processFileRows(data) {
    for (let i=preambleSize; i < data.length; i++) {
        if (!containsPair(data[i], data.slice(i - preambleSize, i))){
            return data[i];
        }
    }
    return -1;
}

function containsPair(sum, collection) {
    const visited = new Set();
    for (const number of collection) {
        if (visited.has(sum - number)) {
            return true;
        }
        visited.add(number);
    }
    return false;
}