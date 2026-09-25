/**
 * Dialog/Toast Provider Component
 * Manages toast notifications globally
 */

'use client';

import { createContext, ReactNode, useContext } from 'react';
import { useDialogMessage, DialogMessage } from '@/utils/useDialogMessage';

interface DialogContextType {
  success: (message: string, duration?: number) => string;
  error: (message: string, duration?: number) => string;
  info: (message: string, duration?: number) => string;
  warning: (message: string, duration?: number) => string;
  dismiss: (id: string) => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function DialogProvider({ children }: { children: ReactNode }) {
  const dialog = useDialogMessage();

  return (
    <DialogContext.Provider value={dialog}>
      {children}
      <ToastContainer messages={dialog.messages} onDismiss={dialog.dismiss} />
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within DialogProvider');
  }
  return context;
}

/**
 * Toast Display Container
 */
function ToastContainer({
  messages,
  onDismiss,
}: {
  messages: DialogMessage[];
  onDismiss: (id: string) => void;
}): React.ReactNode {
  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {messages.map((msg) => (
        <Toast key={msg.id} message={msg} onDismiss={() => onDismiss(msg.id)} />
      ))}
    </div>
  );
}

function Toast({
  message,
  onDismiss,
}: {
  message: DialogMessage;
  onDismiss: () => void;
}): React.ReactNode {
  const bgColor = {
    success: '#4caf50',
    error: '#f44336',
    info: '#2196f3',
    warning: '#ff9800',
  }[message.type] || '#2196f3';

  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: 'white',
        padding: '16px',
        borderRadius: '4px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        maxWidth: '400px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        animation: 'slideIn 0.3s ease-in-out',
      }}
    >
      <span>{message.message}</span>
      <button
        onClick={onDismiss}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          fontSize: '20px',
          marginLeft: '10px',
        }}
      >
        ✕
      </button>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
