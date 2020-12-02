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

    let foundChars = 0;
    for (let i=0; i < row.password.length; i++) {
        if (row.password[i] === row.validatedChar) {
            foundChars++;
            if (foundChars > row.maxOccurs) {
                return 0;
            }
        }
    }

    if (foundChars < row.minOccurs) {
        return 0;
    } else {
        return 1;
    }
}

function deserializeRow(fileRow) {
    const matches = fileRow.match(lineRegexp);
    if (matches == null || matches.length === 0) {
        console.error('Invalid input: ' + fileRow);
        return null;
    }
    return {
        minOccurs: parseInt(matches[1]),
        maxOccurs: parseInt(matches[2]),
        validatedChar: matches[3],
        password: matches[4],

        isValid: function () {
            return this.password != null && this.password.length > 0 && this.minOccurs < this.password.length;
        }
    };
}