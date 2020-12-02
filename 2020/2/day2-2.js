const fs = require('fs');

const lineRegexp = /(\d+)-(\d+)\s(\w):\s(\w*)/;

try {
    const data = fs.readFileSync('input', 'utf8');
    const fileRows = data.split('\n');
    const result = processFileRows(fileRows);
    console.info('Result: ' + result);
} catch (e) {
    console.error('Error: ', e.stack);
}

function processFileRows(rows) {
    let result = 0;
    for (let i=0; i < rows.length; i++) {
        const row = deserializeRow(rows[i]);
        result += validatePolicy(row);
    }
    return result;
}

function validatePolicy(row) {
    if (row == null || !row.isValid()) {
        return 0;
    }

    const char1 = row.password[row.firstIndex-1];
    const char2 = row.password[row.secondIndex-1];

    if (char1 === row.validatedChar && char2 !== char1
        || char2 === row.validatedChar && char2 !== char1) {
        return 1;
    }

    return 0;
}

function deserializeRow(entry) {
    const matches = entry.match(lineRegexp);
    if (matches == null || matches.length === 0) {
        console.error('Invalid input: ' + entry);
        return null;
    }
    return {
        firstIndex: parseInt(matches[1]),
        secondIndex: parseInt(matches[2]),
        validatedChar: matches[3],
        password: matches[4],

        isValid: function () {
            return this.password != null && this.password.length > 0
                && this.firstIndex <= this.password.length
                && this.secondIndex <= this.password.length;
        }
    };
}