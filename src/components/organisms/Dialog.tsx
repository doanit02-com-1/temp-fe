/**
 * Modal/Dialog Component
 */

interface DialogProps {
  isOpen: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  actions?: React.ReactNode;
}

export function Dialog({
  isOpen,
  title,
  children,
  onClose,
  actions,
}: DialogProps): React.ReactNode {
  if (!isOpen) return null;

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={onClose}
      >
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px',
              borderBottom: '1px solid #e0e0e0',
            }}
          >
            <h2 style={{ margin: 0 }}>{title}</h2>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666',
              }}
            >
              ✕
            </button>
          </div>

          <div style={{ padding: '20px' }}>{children}</div>

          {actions && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '10px',
                padding: '20px',
                borderTop: '1px solid #e0e0e0',
              }}
            >
              {actions}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
