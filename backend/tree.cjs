// backend/tree.cjs
const fs = require('fs');
const path = require('path');

const IGNORE = ['node_modules', '.git', '.DS_Store', '.vscode', 'dist'];

// Start from backend directory
const backendRoot = path.resolve(__dirname);

// Recursive function to build the tree structure
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

// Generate and write to tree.txt in backend root
const output = generateTree(backendRoot).join('\n');
const outputPath = path.join(backendRoot, 'tree.txt');

fs.writeFileSync(outputPath, output);
console.log('✅ tree.txt generated successfully in backend root!');
