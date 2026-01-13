// Example usage of ProtectedProvider

import React from 'react';
import ProtectedProvider from './ProtectedProvider';

// Example component that should only be accessible to users with 'admin' role
const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>This content is only visible to administrators.</p>
    </div>
  );
};

// Example component that should be accessible to both 'user' and 'admin'
const UserProfile = () => {
  return (
    <div>
      <h1>User Profile</h1>
      <p>This content is visible to both users and admins.</p>
    </div>
  );
};

// Example of wrapping components with ProtectedProvider
const AdminPageExample = () => {
  return (
    <ProtectedProvider allowedRoles={['admin']}>
      <AdminDashboard />
    </ProtectedProvider>
  );
};

const UserPageExample = () => {
  return (
    <ProtectedProvider allowedRoles={['user', 'admin']}>
      <UserProfile />
    </ProtectedProvider>
  );
};

export { AdminPageExample, UserPageExample };