import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.css";
import "../styles/magazines.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LoadingPage from "../components/common/LoadingPage";
import ScrollToTop from "../components/common/ScrollToTop";
import { useState, useEffect } from "react";

const queryClient = new QueryClient(); // Create a query client instance

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
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh' }}>
      <QueryClientProvider client={queryClient}>
        {isLoading && <LoadingPage />}
        <Component {...pageProps} />
        <ScrollToTop />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default MyApp;
