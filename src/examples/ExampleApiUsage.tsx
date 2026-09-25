/**
 * Example - Using API Client to Connect with Backend
 */

'use client';

import { useEffect, useState } from 'react';
import { apiGet, apiPost } from '@/utils/apiClient';
import { getAuthorizedHeaders } from '@/utils/apiGetToken';
import { logServerEvent, logServerError } from '@/utils/frontLogUtils';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function ExampleApiUsage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  // Example 1: Simple GET request
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const authHeaders = await getAuthorizedHeaders();
        const headers = Object.entries(authHeaders).reduce(
          (acc, [key, value]) => {
            if (value) acc[key] = value;
            return acc;
          },
          {} as Record<string, string>
        );
        const result = await apiGet<User[]>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`,
          headers
        );

        if (result.ok) {
          setUsers(result.response || []);
          logServerEvent('Users fetched successfully', { count: result.response?.length });
        } else {
          logServerError('Failed to fetch users', undefined, { errors: result.errors });
        }
      } catch (error) {
        logServerError('Error fetching users', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Example 2: POST request with body
  const handleCreateUser = async (userData: Omit<User, 'id'>) => {
    try {
      const authHeaders = await getAuthorizedHeaders();
      const headers = Object.entries(authHeaders).reduce(
        (acc, [key, value]) => {
          if (value) acc[key] = value;
          return acc;
        },
        {} as Record<string, string>
      );
      const result = await apiPost<User>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`,
        userData,
        headers
      );

      if (result.ok && result.response) {
        setUsers([...users, result.response]);
        logServerEvent('User created', { userId: result.response.id });
      }
    } catch (error) {
      logServerError('Failed to create user', error);
    }
  };

  return (
    <div>
      <h2>Users List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name} ({user.email})</li>
          ))}
        </ul>
      )}
    </div>
  );
}
