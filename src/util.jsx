import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Authentication utilities
export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const authToken = localStorage.getItem('authToken');
  const authUser = localStorage.getItem('authUser');
  
  // Check if all required authentication data exists
  return isLoggedIn === 'true' && authToken && authUser;
};

export const clearAuthData = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('authToken');
  localStorage.removeItem('authUser');
};

export const getAuthUser = () => {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('authUser');
  try {
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
};

// Function to handle authentication errors (e.g., expired token)
export const handleAuthError = () => {
  clearAuthData();
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};
