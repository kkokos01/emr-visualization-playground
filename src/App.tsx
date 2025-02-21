import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { createQueryClient } from "./lib/config/queryClient";
import { router } from "./routes";
import { ErrorBoundary } from "react-error-boundary";

/**
 * Global error fallback component
 * Displays when an unhandled error occurs in the app
 */
const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="rounded-lg bg-destructive/10 p-6 text-destructive">
      <h2 className="text-lg font-semibold">Something went wrong</h2>
      <p className="mt-2">{error.message}</p>
    </div>
  </div>
);

// Initialize React Query client with our configuration
const queryClient = createQueryClient();

/**
 * Root App component
 * Provider hierarchy (outside to inside):
 * 1. ErrorBoundary - Catches unhandled errors
 * 2. QueryClientProvider - Manages API data fetching and caching
 * 3. TooltipProvider - Provides tooltip functionality
 * 4. Toaster/Sonner - Toast notifications
 * 5. RouterProvider - Application routing
 */
const App = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
