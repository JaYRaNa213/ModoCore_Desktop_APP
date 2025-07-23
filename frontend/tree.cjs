const fs = require('fs');
const path = require('path');

const IGNORE = ['node_modules', '.git', '.DS_Store', '.vscode', ];

function generateTree(dir, prefix = '') {
  const files = fs.readdirSync(dir).filter(f => !IGNORE.includes(f));
  const lines = [];

  

  files.forEach((file, index) => {
    const fullPath = path.join(dir, file);
    const isDir = fs.statSync(fullPath).isDirectory();
    const connector = index === files.length - 1 ? '└── ' : '├── ';

    lines.push(prefix + connector + file);

    if (isDir) {
      const nextPrefix = prefix + (index === files.length - 1 ? '    ' : '│   ');
      lines.push(...generateTree(fullPath, nextPrefix));
    }
  });

  return lines;
}

const targetDir = __dirname;
const output = generateTree(targetDir).join('\n');

fs.writeFileSync('tree.txt', output);
console.log('✅ tree.txt generated successfully!');
