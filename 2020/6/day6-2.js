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
    const groupAnswerSums = [];
    let groupAnswers = {};
    let peopleInGroup = 0;
    for (let i=0; i < rows.length+1; i++) {
        if (i >= rows.length || rows[i].length === 0) {
            let answeredQuestions = 0;
            for (const [answers, occurrences] of Object.entries(groupAnswers)) {
                if (occurrences === peopleInGroup) {
                    answeredQuestions++;
                }
            }
            groupAnswerSums.push(answeredQuestions);
            groupAnswers = {};
            peopleInGroup = 0;
        } else {
            [...rows[i]].forEach(answer => groupAnswers[answer] ? groupAnswers[answer]++ : groupAnswers[answer] = 1);
            peopleInGroup++;
        }
    }

    return groupAnswerSums.reduce((a, b) => a+b, 0);
}