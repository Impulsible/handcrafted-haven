// scripts/build.js
const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Starting custom build process...');

// Backup tsconfig
if (fs.existsSync('tsconfig.json')) {
  fs.copyFileSync('tsconfig.json', 'tsconfig.json.backup');
  console.log('✅ Backed up tsconfig.json');
}

// Modify tsconfig temporarily
const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
tsconfig.compilerOptions.jsx = 'react-jsx';
tsconfig.compilerOptions.skipLibCheck = true;
tsconfig.compilerOptions.noEmit = true;
fs.writeFileSync('tsconfig.json', JSON.stringify(tsconfig, null, 2));
console.log('✅ Modified tsconfig.json for build');

try {
  // Run Next.js build
  execSync('next build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
} finally {
  // Restore original tsconfig
  if (fs.existsSync('tsconfig.json.backup')) {
    fs.copyFileSync('tsconfig.json.backup', 'tsconfig.json');
    fs.unlinkSync('tsconfig.json.backup');
    console.log('✅ Restored original tsconfig.json');
  }
}
