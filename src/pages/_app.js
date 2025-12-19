import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.css";
import "../styles/magazines.css";
import "../styles/home.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ErrorBoundary from "../components/common/ErrorBoundary";
import NewsletterPopup from "../components/common/NewsletterPopup";
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
  return (
    <ErrorBoundary>
      <div style={commonStyles.pageContainer}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <NewsletterPopup />
          {process.env.NODE_ENV === 'development' && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </QueryClientProvider>
      </div>
    </ErrorBoundary>
  );
}

export default MyApp;
