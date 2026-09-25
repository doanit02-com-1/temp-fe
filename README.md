/**
 * README - Project Setup Guide
 */

# Source FE - Frontend Project

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create `.env.local` from `.env.example`:
```bash
cp .env.example .env.local
```

Start the local backend and Redis/Valkey, then configure:
```env
BACKEND_API_BASE_URL=http://localhost:8080
REDIS_URL=redis://localhost:6379
AUTH_SESSION_TTL_SECONDS=604800
```

The backend contract is documented in [`spec/AUTH_API_CONTRACT.md`](spec/AUTH_API_CONTRACT.md).

### 3. Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint and output JSON report
- `npm run test` - Run Jest tests with coverage
- `npm run test:e2e` - Run Playwright E2E tests

## Project Structure

```
src/
├── app/           # Next.js App Router pages
├── components/    # UI components (atoms, molecules, organisms)
├── constants/     # Application constants
├── data/          # RBAC & routing config
├── hooks/         # Custom React hooks
├── interface/     # TypeScript interfaces
├── middleware.ts  # Auth gateway
├── stores/        # Zustand state management
├── utils/         # Utility functions
└── validation/    # Form validation rules
```

## Backend API Connection

The frontend is designed to connect with a public backend:

1. **Base URL**: Configure `NEXT_PUBLIC_API_BASE_URL` in `.env.local`
2. **API Client**: Use `apiClient.ts` for HTTP requests
3. **Headers**: Automatically injected headers include JWT tokens via `apiGetToken.ts`
4. **Response Format**: All API responses follow `{ ok, status, response?, errors? }` format

### Example API Call

```typescript
import { apiGet, getAuthorizedHeaders } from '@/utils/apiClient';

// Get with auth headers
const headers = await getAuthorizedHeaders();
const result = await apiGet('/api/users', headers);

if (result.ok) {
  console.log(result.response);
} else {
  console.error(result.errors);
}
```

## Authentication Flow

1. User submits credentials on `/`; Next.js calls the local backend from its server route.
2. Backend tokens are stored in local Redis/Valkey, not in browser storage.
3. Browser receives an opaque `HttpOnly` session cookie.
4. Middleware redirects requests without the cookie; protected server pages verify the session and role from Redis.
5. The BFF refreshes tokens server-side and clears expired sessions.

## RBAC System

Role-based access controlled via `src/data/screenPermissions.ts`:

```typescript
export const screenPermissions: ScreenPermissionConfig = {
  '/dashboard': [ROLE_CODES.ADMIN, ROLE_CODES.MANAGER],
  '/settings': [ROLE_CODES.ADMIN],
  '/top': [ROLE_CODES.ADMIN, ROLE_CODES.MANAGER, ROLE_CODES.USER],
};
```

## Key Technologies

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Material-UI** - Component library
- **Zustand** - State management
- **Jest** - Testing
- **Playwright** - E2E testing
- **ESLint** - Code quality

## Development Guidelines

1. **New Pages**: Create in `src/app/[route]/page.tsx`
2. **New Components**: Follow atomic structure (atoms → molecules → organisms)
3. **API Calls**: Always use `apiClient.ts` functions
4. **State**: Use Zustand stores for global state
5. **Validation**: Use rules from `src/validation/index.ts`

## Production Build

```bash
npm run build
npm run start
```

The application will be optimized and ready for deployment.
