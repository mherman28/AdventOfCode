const fs = require('fs');

const preambleSize = 25;
try {
    const fileRows = fs.readFileSync('input', 'utf8');
    const data = fileRows.split('\n').map((data) => parseInt(data));
    const result = processInput(data);
    console.info('Result: ' + result);
} catch (e) {
    console.error('Error:', e.stack);
}

function processInput(data) {
    const number = findNumberWithoutPair(data);
    const sliceWithSum = findSliceWithSum(data, number);
    return Math.min(...sliceWithSum) + Math.max(...sliceWithSum);
}

function findNumberWithoutPair(data) {
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

function findSliceWithSum(collection, sum) {
    let i = 0, j = 1, sliceSum = 0;
    let slice = [];
    while (sliceSum !== sum) {
        slice = collection.slice(i, j);
        sliceSum = slice.reduce((a,b) => a+b, 0);
        sliceSum > sum ? i++ : j++;
    }
    return slice;
}