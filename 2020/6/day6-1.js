const fs = require('fs');


try {
    const data = fs.readFileSync('input', 'utf8');
    const fileRows = data.split('\n');
    const result = processFileRows(fileRows);
    console.info('Result: ' + result);
} catch (e) {
    console.error('Error:', e.stack);
}

function processFileRows(rows) {
    const groupAnswers = [];
    let answers = new Set();
    for (let i=0; i < rows.length+1; i++) {
        if (i >= rows.length || rows[i].length === 0) {
            groupAnswers.push(answers);
            answers = new Set();
        } else {
            [...rows[i]].forEach(answer => answers.add(answer));
        }
    }

    return groupAnswers.map(ga => ga.size)
        .reduce((a, b) => a+b, 0);
}