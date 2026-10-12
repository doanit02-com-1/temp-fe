import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProviderWrapper } from './ThemeProviderWrapper';
import './globals.css';

export const metadata: Metadata = {
  title: 'Source FE',
  description: 'Enterprise frontend application',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-100 font-sans text-neutral-800">
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
