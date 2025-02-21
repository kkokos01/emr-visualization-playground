
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, User, AlertCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from '@/hooks/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, loginWithOAuth2, error, isLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">OpenEMR Login</h1>
          <p className="text-muted-foreground">Welcome back! Please sign in to continue.</p>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form className="space-y-4" onSubmit={async (e) => {
          e.preventDefault();
          try {
            await login(username, password);
            navigate('/');
          } catch (err) {
            // Error is handled by AuthContext
          }
        }}>
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="username"
                type="text"
                className="pl-9"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                className="pl-9"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded border-gray-300"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
              />
              <span className="text-sm text-muted-foreground">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading || !username || !password}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              'Sign In with Password'
            )}
          </Button>
        </form>

        <div className="mt-4">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            size="lg"
            onClick={() => loginWithOAuth2()}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Redirecting...
              </>
            ) : (
              'Sign In with OpenEMR'
            )}
          </Button>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Having trouble logging in? Contact your system administrator.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
