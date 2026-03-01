const fs = require('fs');
const path = require('path');

const RESULTS_DIR = path.join(__dirname, '../test-results');
const FRONTEND_PUBLIC_DATA = path.join(__dirname, '../../frontend/public/data');
const SCREENSHOTS_DEST = path.join(FRONTEND_PUBLIC_DATA, 'screenshots');

// Ensure directories exist
if (!fs.existsSync(SCREENSHOTS_DEST)) {
  fs.mkdirSync(SCREENSHOTS_DEST, { recursive: true });
}

console.log('Processing test results...');

function copyScreenshots(dir) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      copyScreenshots(fullPath);
    } else if (file.endsWith('.png')) {
      const destPath = path.join(SCREENSHOTS_DEST, file);
      fs.copyFileSync(fullPath, destPath);
      console.log(`Copied screenshot: ${file}`);
    }
  }
}

copyScreenshots(RESULTS_DIR);
console.log('Results processing complete.');
