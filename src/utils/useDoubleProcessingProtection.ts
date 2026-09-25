/**
 * Double Processing Protection Hook
 * Prevents duplicate form submissions
 */

import { useState, useCallback, useRef } from 'react';

export function useDoubleProcessingProtection(timeout: number = 1000) {
  const [isProcessing, setIsProcessing] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const execute = useCallback(
    async (callback: () => Promise<void> | void): Promise<void> => {
      if (isProcessing) return;

      setIsProcessing(true);

      try {
        await callback();
      } finally {
        timerRef.current = setTimeout(() => {
          setIsProcessing(false);
        }, timeout);
      }
    },
    [isProcessing, timeout]
  );

  const reset = useCallback(() => {
    setIsProcessing(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  return { isProcessing, execute, reset };
}
