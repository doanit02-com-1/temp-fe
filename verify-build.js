/**
 * BUILD VERIFICATION CHECKLIST
 * Run this to verify all components exist
 */

const fs = require('fs');
const path = require('path');

const requiredFiles = [
  // Config
  'next.config.ts',
  'tsconfig.json',
  'jest.config.js',
  'tailwind.config.js',
  'eslint.config.mjs',

  // App
  'src/app/layout.tsx',
  'src/app/page.tsx',
  'src/app/globals.css',
  'src/app/top/page.tsx',
  'src/app/top/TopPageClient.tsx',

  // Components
  'src/components/atoms/Button.tsx',
  'src/components/atoms/Input.tsx',
  'src/components/atoms/Label.tsx',
  'src/components/atoms/Spinner.tsx',
  'src/components/molecules/Card.tsx',
  'src/components/organisms/Dialog.tsx',
  'src/components/organisms/ErrorBoundary.tsx',
  'src/components/organisms/DialogProvider.tsx',

  // Stores & Hooks
  'src/stores/userStore.ts',
  'src/hooks/useUserRole.ts',

  // Utils
  'src/utils/apiClient.ts',
  'src/utils/apiGetToken.ts',
  'src/utils/sessionStorageUtils.ts',

  // Constants & Data
  'src/constants/Constants.ts',
  'src/constants/Messages.ts',
  'src/data/screenPermissions.ts',

  // Services
  'src/services/baseService.ts',
  'src/services/authService.ts',
  'src/services/userService.ts',

  // Types
  'src/types/index.ts',

  // Middleware
  'src/middleware.ts',
  'src/lib/auth/backend.ts',
  'src/lib/auth/redisSession.ts',
  'src/app/api/auth/login/route.ts',
  'src/app/api/auth/logout/route.ts',
  'src/app/api/auth/me/route.ts',
  'src/app/api/auth/refresh/route.ts',
];

const missing = [];
const found = [];

requiredFiles.forEach((file) => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    found.push(file);
  } else {
    missing.push(file);
  }
});

console.log('\n✅ BUILD VERIFICATION REPORT\n');
console.log(`📁 Found: ${found.length}/${requiredFiles.length} files\n`);

if (missing.length > 0) {
  console.log('❌ Missing files:');
  missing.forEach((f) => console.log(`   - ${f}`));
  process.exit(1);
} else {
  console.log('✅ All required files found!');
  console.log('\n📊 Summary:');
  console.log(`   - Config files: 5`);
  console.log(`   - App files: 4`);
  console.log(`   - Components: 7`);
  console.log(`   - Utils & Services: 8`);
  console.log(`   - Other: 5`);
  console.log(`\n✨ Ready to build!\n`);
}
