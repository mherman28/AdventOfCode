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
    const slopes = [
        {x: 1, y: 1},
        {x: 3, y: 1},
        {x: 5, y: 1},
        {x: 7, y: 1},
        {x: 1, y: 2}
    ];
    let result = 1;
    for (let i=0; i < slopes.length; i++) {
        result *= countTrees(rows, slopes[i]);
    }
    return result;
}

function countTrees(rows, slope) {
    let currentPos = {x: 0, y: 0};
    const targetY = rows.length;
    const mapWidth = rows[0].length;
    let treesHit = 0;
    let sliding = true;
    while (sliding) {
        currentPos.x = (currentPos.x + slope.x) % mapWidth;
        currentPos.y += slope.y;
        if (currentPos.y >= targetY) {
            sliding = false;
        } else if (rows[currentPos.y][currentPos.x] === '#') {
            treesHit++;
        }
    }
    return treesHit;
}