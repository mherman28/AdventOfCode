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
    let currentPos = {x: 0, y: 0};
    const targetY = rows.length;
    const mapWidth = rows[0].length;
    let treesHit = 0;
    let sliding = true;
    while (sliding) {
        currentPos.x = (currentPos.x + 3) % mapWidth;
        currentPos.y += 1;
        if (currentPos.y >= targetY) {
            sliding = false;
        } else if (rows[currentPos.y][currentPos.x] === '#') {
            treesHit++;
        }
    }
    return treesHit;
}