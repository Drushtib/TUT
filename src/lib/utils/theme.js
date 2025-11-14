/**
 * Theme Utility Functions
 * Helper functions for accessing theme values in React components
 */

import theme from "../../config/theme";

/**
 * Get a color value from the theme
 * @param {string} path - Dot notation path to the color (e.g., 'primary', 'gray.dark.one')
 * @returns {string} Color value
 */
export const getColor = (path) => {
  const keys = path.split(".");
  let value = theme.colors;
  
  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = value[key];
    } else {
      console.warn(`Theme color not found: ${path}`);
      return theme.colors.text; // Fallback to default text color
    }
  }
  
  return typeof value === "string" ? value : theme.colors.text;
};

/**
 * Get a gradient value from the theme
 * @param {string} name - Gradient name
 * @returns {string} Gradient value
 */
export const getGradient = (name) => {
  return theme.gradients[name] || theme.gradients.primary;
};

/**
 * Get a shadow value from the theme
 * @param {string} name - Shadow name
 * @returns {string} Shadow value
 */
export const getShadow = (name) => {
  return theme.shadows[name] || theme.shadows.medium;
};

/**
 * Get a spacing value from the theme
 * @param {string} size - Spacing size
 * @returns {string} Spacing value
 */
export const getSpacing = (size) => {
  return theme.spacing[size] || theme.spacing.md;
};

/**
 * Get a border radius value from the theme
 * @param {string} size - Border radius size
 * @returns {string} Border radius value
 */
export const getBorderRadius = (size) => {
  return theme.borderRadius[size] || theme.borderRadius.md;
};

/**
 * Get an RGBA color from the theme
 * @param {string} color - Color name (e.g., 'white', 'gold', 'black')
 * @param {string} opacity - Opacity level ('light', 'medium', 'dark')
 * @returns {string} RGBA color value
 */
export const getRgba = (color, opacity = "light") => {
  if (theme.rgba[color] && theme.rgba[color][opacity]) {
    return theme.rgba[color][opacity];
  }
  return `rgba(0, 0, 0, 0.1)`; // Fallback
};

/**
 * Create a style object with theme colors
 * Useful for inline styles in React components
 */
export const createThemeStyles = {
  // Background styles
  background: {
    primary: { background: theme.colors.background },
    dark: { background: theme.colors.backgroundDark },
    light: { background: theme.colors.backgroundLight },
    card: { background: theme.colors.backgroundCard },
    gold: { background: theme.colors.primary },
  },
  
  // Text styles
  text: {
    primary: { color: theme.colors.text },
    secondary: { color: theme.colors.textSecondary },
    muted: { color: theme.colors.textMuted },
    gold: { color: theme.colors.primary },
    dark: { color: theme.colors.textDark },
  },
  
  // Border styles
  border: {
    default: { borderColor: theme.colors.border },
    light: { borderColor: theme.colors.borderLight },
    gold: { borderColor: theme.colors.borderGold },
  },
  
  // Button styles
  button: {
    primary: {
      background: theme.gradients.primary,
      color: theme.colors.textDark,
      border: `1px solid ${theme.colors.borderGold}`,
    },
    secondary: {
      background: theme.colors.backgroundLight,
      color: theme.colors.text,
      border: `1px solid ${theme.colors.border}`,
    },
  },
};

/**
 * Get common style objects for frequently used patterns
 */
export const commonStyles = {
  // Page container
  pageContainer: {
    background: theme.colors.background,
    color: theme.colors.text,
    minHeight: "100vh",
  },
  
  // Card container
  card: {
    background: theme.colors.backgroundCard,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    boxShadow: theme.shadows.card,
  },
  
  // Input field
  input: {
    background: theme.colors.background,
    color: theme.colors.text,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.xl,
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
  },
  
  // Button primary
  buttonPrimary: {
    background: theme.gradients.primary,
    color: theme.colors.textDark,
    border: "none",
    borderRadius: theme.borderRadius.md,
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    cursor: "pointer",
    fontWeight: theme.typography.fontWeight.bold,
    boxShadow: theme.shadows.gold,
  },
  
  // Section container
  section: {
    background: theme.colors.background,
    color: theme.colors.text,
    padding: `${theme.spacing.xl} 0`,
  },
};

export default theme;

