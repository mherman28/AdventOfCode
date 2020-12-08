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
    const program = [];
    rows.forEach(row => {
        const match = row.match(/^(\w{3})\s([+-]\d+)$/);
        const programLine = {
            operation: match[1],
            argument: parseInt(match[2])
        };
        program.push(programLine);
    });

    return fixProgram(program);
}

function fixProgram(program) {
    for (let programLine of program) {
        const originalOperation = programLine.operation;
        if (originalOperation === 'acc') {
            continue;
        }
        programLine.operation = originalOperation === 'jmp' ? 'nop' : 'jmp';
        const result = executeProgram(program);
        if (result > 0) {
            return result;
        }
        programLine.operation = originalOperation;
    }
    return -1;
}

function executeProgram(program) {
    let accumulator = 0;
    const visitedLines = new Set();
    let i=0;
    while (i < program.length) {
        if (visitedLines.has(i)){
            return -1;
        }
        visitedLines.add(i);
        const programLine = program[i];
        if (programLine.operation === 'acc') {
            accumulator += programLine.argument;
        }
        i += programLine.operation === 'jmp' ? programLine.argument : 1;
    }
    return accumulator;
}