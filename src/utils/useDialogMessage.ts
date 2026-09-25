/**
 * Dialog/Toast Message Hook
 * Manage notification state
 */

import { useState, useCallback } from 'react';

export interface DialogMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

export function useDialogMessage() {
  const [messages, setMessages] = useState<DialogMessage[]>([]);

  const dismiss = useCallback((id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  }, []);

  const show = useCallback((
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info',
    duration: number = 3000
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newMessage: DialogMessage = { id, message, type, duration };

    setMessages((prev) => [...prev, newMessage]);

    if (duration > 0) {
      setTimeout(() => {
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
      }, duration);
    }

    return id;
  }, []);

  const success = useCallback((message: string, duration?: number) => {
    return show(message, 'success', duration);
  }, [show]);

  const error = useCallback((message: string, duration?: number) => {
    return show(message, 'error', duration);
  }, [show]);

  const info = useCallback((message: string, duration?: number) => {
    return show(message, 'info', duration);
  }, [show]);

  const warning = useCallback((message: string, duration?: number) => {
    return show(message, 'warning', duration);
  }, [show]);

  return {
    messages,
    show,
    dismiss,
    success,
    error,
    info,
    warning,
  };
}
