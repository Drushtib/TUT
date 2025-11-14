/**
 * Error Fallback Component
 * Simple error display component
 */

import { commonStyles, getColor, getSpacing } from "../../lib/utils/theme";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div
      role="alert"
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
        {error?.message || "An unexpected error occurred"}
      </p>
      {resetErrorBoundary && (
        <button
          onClick={resetErrorBoundary}
          style={commonStyles.buttonPrimary}
        >
          Try again
        </button>
      )}
    </div>
  );
};

export default ErrorFallback;

