/**
 * Example - Using Components
 */

'use client';

import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Label } from '@/components/atoms/Label';
import { Card } from '@/components/molecules/Card';
import { TitleBar } from '@/components/organisms/Bar/TitleBar';
import { useState } from 'react';

export function ExampleComponentUsage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Invalid email');
      return;
    }
    setError('');
    console.log('Email:', email);
  };

  return (
    <div>
      <TitleBar 
        title="User Form" 
        subtitle="Create or edit user"
        actions={<Button>Download</Button>}
      />

      <Card title="User Information">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <Label htmlFor="email" required>
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              error={error}
              required
              placeholder="user@example.com"
            />
            {error && <span style={{ color: 'red' }}>{error}</span>}
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button type="submit" variant="primary">
              Submit
            </Button>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
