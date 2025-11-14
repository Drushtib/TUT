/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 */

import React from "react";
import { commonStyles, getColor, getSpacing, getBorderRadius } from "../../lib/utils/theme";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console or error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            padding: getSpacing("xl"),
            textAlign: "center",
            background: getColor("background"),
            color: getColor("text"),
            minHeight: "50vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2 style={{ color: getColor("primary"), marginBottom: getSpacing("md") }}>
            Something went wrong
          </h2>
          <p style={{ marginBottom: getSpacing("md") }}>
            We're sorry, but something unexpected happened.
          </p>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <details style={{ marginTop: getSpacing("md"), textAlign: "left", maxWidth: "600px" }}>
              <summary style={{ cursor: "pointer", marginBottom: getSpacing("sm") }}>
                Error Details (Development Only)
              </summary>
              <pre
                style={{
                  background: getColor("backgroundLight"),
                  padding: getSpacing("md"),
                  borderRadius: getBorderRadius("md"),
                  overflow: "auto",
                  fontSize: "0.875rem",
                }}
              >
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null, errorInfo: null });
              window.location.reload();
            }}
            style={commonStyles.buttonPrimary}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

