/**
 * Script to verify all components are built successfully
 * Add to package.json: "verify": "node verify-build.js"
 */

const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'src');

function checkFile(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

function checkDir(dirPath) {
  try {
    return fs.statSync(dirPath).isDirectory();
  } catch {
    return false;
  }
}

const checks = {
  '✅ Configuration': [
    'next.config.ts',
    'tsconfig.json',
    'jest.config.js',
    'tailwind.config.js',
    'eslint.config.mjs',
  ],
  '✅ App & Pages': [
    'src/app/layout.tsx',
    'src/app/page.tsx',
    'src/app/globals.css',
    'src/app/GlobalLayout.tsx',
    'src/app/top/page.tsx',
  ],
  '✅ Components': [
    'src/components/atoms/Button.tsx',
    'src/components/atoms/Input.tsx',
    'src/components/atoms/Label.tsx',
    'src/components/atoms/Spinner.tsx',
    'src/components/molecules/Card.tsx',
    'src/components/organisms/Dialog.tsx',
    'src/components/organisms/ErrorBoundary.tsx',
    'src/components/organisms/DialogProvider.tsx',
  ],
  '✅ Services': [
    'src/services/baseService.ts',
    'src/services/authService.ts',
    'src/services/userService.ts',
  ],
  '✅ Utils': [
    'src/utils/apiClient.ts',
    'src/utils/apiGetToken.ts',
    'src/utils/sessionStorageUtils.ts',
    'src/utils/frontLogUtils.ts',
  ],
  '✅ Core': [
    'src/stores/userStore.ts',
    'src/hooks/useUserRole.ts',
    'src/constants/Constants.ts',
    'src/data/screenPermissions.ts',
    'src/middleware.ts',
    'src/types/index.ts',
  ],
};

console.log('\n📋 BUILD VERIFICATION REPORT\n');
console.log('=' .repeat(60));

let totalFiles = 0;
let foundFiles = 0;
let allGood = true;

Object.entries(checks).forEach(([category, files]) => {
  console.log(`\n${category}`);
  console.log('-'.repeat(60));

  files.forEach((file) => {
    totalFiles++;
    const filePath = path.join(__dirname, file);
    const exists = checkFile(filePath);

    if (exists) {
      console.log(`  ✓ ${file}`);
      foundFiles++;
    } else {
      console.log(`  ✗ ${file}`);
      allGood = false;
    }
  });
});

console.log('\n' + '='.repeat(60));
console.log(`\n📊 Summary: ${foundFiles}/${totalFiles} files found\n`);

if (allGood) {
  console.log('✅ BUILD VERIFICATION PASSED ✅\n');
  console.log('All required files exist. Ready to build!\n');
  console.log('Next steps:');
  console.log('  1. npm install');
  console.log('  2. npm run build\n');
} else {
  console.log('❌ BUILD VERIFICATION FAILED ❌\n');
  console.log('Some files are missing. Please create them.\n');
  process.exit(1);
}
