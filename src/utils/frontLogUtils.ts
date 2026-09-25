/**
 * Front-end Logging Utilities
 * Send logs to backend for monitoring
 */

interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  message: string;
  context?: Record<string, any>;
  userAgent?: string;
  url?: string;
}

async function sendLog(entry: LogEntry): Promise<void> {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    await fetch(`${backendUrl}/api/logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    }).catch(() => {
      // Silently fail if logging fails
    });
  } catch (error) {
    console.error('Failed to send log:', error);
  }
}

export async function logServerEvent(
  message: string,
  context?: Record<string, any>
): Promise<void> {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level: 'INFO',
    message,
    context,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    url: typeof window !== 'undefined' ? window.location.href : undefined,
  };

  console.log('[EVENT]', message, context);
  await sendLog(entry);
}

export async function logServerError(
  message: string,
  error?: Error | unknown,
  context?: Record<string, any>
): Promise<void> {
  const errorMessage = error instanceof Error ? error.message : String(error);
  
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level: 'ERROR',
    message,
    context: {
      ...context,
      errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
    },
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    url: typeof window !== 'undefined' ? window.location.href : undefined,
  };

  console.error('[ERROR]', message, error, context);
  await sendLog(entry);
}

export function logClientError(
  message: string,
  error?: Error | unknown
): void {
  console.error('[CLIENT_ERROR]', message, error);
}
