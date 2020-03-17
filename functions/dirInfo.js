const fs = require('fs');
const path = require('path');

const dir = process.argv[2];
const items = fs.readdirSync(dir);

const output = [];
for (let item of items) {
  const itemPath = path.join(dir, item);
  const stats = fs.statSync(itemPath);
  output.push({
    path: itemPath,
    type: stats.isFile() ? 'File' : stats.isDirectory() ? 'Directory' : '',
    size: stats.size,
    mtime: stats.mtime
  });
}

console.log(JSON.stringify(output));
