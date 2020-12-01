const fs = require('fs');

try {
    const data = fs.readFileSync('input', 'utf8');
    const entries = data.split('\n');
    const multipliedPair = processEntries(entries);
    console.info('Multiplied pair: ' + multipliedPair);
} catch (e) {
    console.error('Error:', e.stack);
}

function processEntries(entries) {
    console.info('Implement me :(');
}