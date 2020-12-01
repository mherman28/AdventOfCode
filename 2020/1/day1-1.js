const fs = require('fs');

try {
    const data = fs.readFileSync('input', 'utf8');
    const entries = data.split('\n');
    const result = processEntries(entries);
    console.info('Result: ' + result);
} catch (e) {
    console.error('Error:', e.stack);
}

function processEntries(entries) {
    if (entries.length > 0) {
        const visited = new Set();
        for (let i=0; i < entries.length; i++) {
            const entry = parseInt(entries[i]);
            const complement = 2020 - entry;
            if (visited.has(complement)) {
                return entry * complement;
            }
            visited.add(entry);
        }
        throw 'Pair summing to 2020 not found!';
    } else {
        throw 'Entries are empty!';
    }
}
