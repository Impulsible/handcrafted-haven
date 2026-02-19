// debug-search-params.js
// Run this with: node debug-search-params.js

const fs = require('fs');
const path = require('path');

function scanDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else if (file === 'page.tsx' || file === 'page.jsx') {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('useSearchParams') && !content.includes('<Suspense')) {
        console.log('? Missing Suspense:', fullPath.replace(/.*src[\\/]app[\\/]/, ''));
      }
    }
  });
}

console.log('?? Scanning for missing Suspense boundaries...');
scanDirectory('./src/app');
console.log('? Scan complete');
