'use client';

import { ReactNode } from 'react';
import styles from './scroll.module.css';

export function ScrollWrapper({ children }: { children: ReactNode }) {
  return (
    <div className={styles.scrollContainer}>
      {children}
    </div>
  );
}
