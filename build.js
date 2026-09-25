#!/usr/bin/env node

/**
 * Build script for the project
 * Runs Next.js build and checks for errors
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('\n📦 Starting Build Process...\n');

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('⏳ Installing dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit', cwd: __dirname });
  } catch (error) {
    console.error('❌ Failed to install dependencies');
    process.exit(1);
  }
}

// Run the build
console.log('\n🔨 Running Next.js build...\n');
try {
  execSync('npx next build', { stdio: 'inherit', cwd: __dirname });
  console.log('\n✅ Build completed successfully!\n');
  console.log('📊 Next steps:');
  console.log('  1. Run: npm run start');
  console.log('  2. Or: npm run dev\n');
} catch {
  console.error('\n❌ Build failed!');
  console.error('🔍 Check the error messages above.\n');
  process.exit(1);
}
