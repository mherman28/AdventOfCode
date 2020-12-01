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
        for (let i=0; i < entries.length; i++) {
            const entry1 = entries[i];
            const tripletComplement = 2020 - entry1;
            const visited = new Set();
            for (let j=i+1; j < entries.length; j++) {
                const entry2 = parseInt(entries[j]);
                const pairComplement = tripletComplement - entry2;
                if (visited.has(pairComplement)) {
                    return entry1 * entry2 * pairComplement;
                }
                visited.add(entry2);
            }
        }
        throw 'Triplet summing to 2020 not found!';
    } else {
        throw 'Entries are empty!';
    }
}
