import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/AuthContext';
import { extractAuthCode } from '@/lib/auth/oauth2';
import { Loader2 } from 'lucide-react';

export default function Callback() {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleOAuth2Callback, error } = useAuth();

  useEffect(() => {
    const processCallback = async () => {
      try {
        // Exchange the code for tokens
        await handleOAuth2Callback(location.search);
        
        // Redirect to home on success
        navigate('/', { replace: true });
      } catch (err) {
        // Error handling is done by AuthContext
        console.error('OAuth2 callback failed:', err);
        navigate('/login', { replace: true });
      }
    };

    processCallback();
  }, [location.search, handleOAuth2Callback, navigate]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-2">Authentication Failed</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Completing Sign In</h2>
        <p className="text-gray-600">Please wait while we verify your credentials...</p>
      </div>
    </div>
  );
}
