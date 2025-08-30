# Authentication System

This document explains how the authentication system works in the Arabian Sky application.

## Overview

The authentication system uses localStorage to manage user login state and provides route protection for the dashboard.

## How It Works

### 1. Login Process
- User enters credentials on `/login` page
- On successful login, the following data is stored in localStorage:
  - `isLoggedIn`: Set to `true`
  - `authToken`: JWT or session token from the server
  - `authUser`: User information object
- User is redirected to `/dashboard`

### 2. Route Protection
- **Dashboard Routes**: All dashboard pages (`/dashboard/*`) are protected
- **Login Page**: Redirects to dashboard if user is already authenticated
- **Unauthorized Access**: Redirects to login page if trying to access dashboard without authentication

### 3. Logout Process
- Clicking logout button clears all authentication data from localStorage
- User is redirected to login page
- All dashboard routes become inaccessible

## Authentication Utilities

### `isAuthenticated()`
- Checks if user is logged in by verifying all required localStorage items exist
- Returns `true` if authenticated, `false` otherwise

### `clearAuthData()`
- Removes all authentication data from localStorage
- Used during logout

### `getAuthUser()`
- Retrieves and parses user information from localStorage
- Returns user object or `null` if not found

### `handleAuthError()`
- Clears authentication data and redirects to login
- Useful for handling expired tokens or authentication failures

## Protected Routes

The following routes are protected and require authentication:
- `/dashboard` - Main dashboard
- `/dashboard/careers` - Career management
- `/dashboard/orders` - Order management
- `/dashboard/applications` - Job applications
- `/dashboard/user-management` - User management

## Implementation Details

### Dashboard Layout
- Uses `ProtectedRoute` component to wrap all dashboard content
- Provides sidebar navigation with logout functionality
- Automatically redirects unauthorized users

### Login Page
- Checks authentication status on load
- Redirects authenticated users to dashboard
- Shows loading state while checking authentication

### Authentication Check
- Runs on every dashboard page load
- Prevents unauthorized access
- Provides smooth user experience with loading states

## Security Considerations

- Authentication is client-side only (localStorage)
- No server-side session validation
- Tokens should be validated on the server for sensitive operations
- Consider implementing token expiration and refresh mechanisms

## Usage Examples

```javascript
// Check if user is authenticated
if (isAuthenticated()) {
  // Allow access to protected content
}

// Handle logout
const handleLogout = () => {
  clearAuthData();
  router.push('/login');
};

// Get current user
const user = getAuthUser();
```

## Troubleshooting

### Common Issues
1. **User stuck on login page**: Check if `isLoggedIn` is properly set in localStorage
2. **Dashboard not accessible**: Verify all authentication data exists in localStorage
3. **Logout not working**: Ensure `clearAuthData()` is called properly

### Debug Steps
1. Check localStorage in browser dev tools
2. Verify authentication state with `isAuthenticated()`
3. Check console for any JavaScript errors
4. Ensure proper imports of authentication utilities
