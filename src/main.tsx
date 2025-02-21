import { createRoot } from 'react-dom/client'
import { AuthProvider } from './hooks/AuthContext'
import App from './App.tsx'
import './index.css'

/**
 * Application entry point
 * Provider hierarchy (outside to inside):
 * 1. AuthProvider - Global authentication state
 * 2. App component - Contains all other providers and routing
 *
 * Note: AuthProvider is placed at the root to ensure authentication
 * state is available throughout the entire application, including
 * error boundaries and data fetching logic.
 */

const root = document.getElementById("root");
if (!root) throw new Error('Root element not found');

createRoot(root).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
