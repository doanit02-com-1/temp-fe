#!/usr/bin/env node
/**
 * Dev Server Launcher
 */

const { execSync } = require('child_process');

console.log('\n🚀 Starting Next.js Dev Server...\n');

try {
  execSync('npx next dev', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });
} catch (error) {
  console.error('\n❌ Dev server failed to start\n');
  process.exit(1);
}
