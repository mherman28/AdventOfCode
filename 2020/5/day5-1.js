const fs = require('fs');

try {
    const data = fs.readFileSync('input', 'utf8');
    const fileRows = data.split('\n');
    const result = processFileRows(fileRows);
    console.info('Result: ' + result);
} catch (e) {
    console.error('Error:', e.stack);
}

function processFileRows(fileRows) {
    const seatIds = [];
    fileRows.forEach(fileRow => {
        const binary = fileRow.replace(/[BR]/g, '1').replace(/[FL]/g, '0');
        const row = parseInt(binary.substr(0, 7), 2);
        const column = parseInt(binary.substr(7, 3), 2);
        seatIds.push(row * 8 + column);
    })

    return Math.max(...seatIds);
}