import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.css";
import "../styles/magazines.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LoadingPage from "../components/common/LoadingPage";
import ErrorBoundary from "../components/common/ErrorBoundary";
import { useState, useEffect } from "react";
import { commonStyles } from "../lib/utils/theme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loading page for initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary>
      <div style={commonStyles.pageContainer}>
        <QueryClientProvider client={queryClient}>
          {isLoading && <LoadingPage />}
          <Component {...pageProps} />
          {process.env.NODE_ENV === 'development' && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </QueryClientProvider>
      </div>
    </ErrorBoundary>
  );
}

export default MyApp;
