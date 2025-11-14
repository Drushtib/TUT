/**
 * Centralized Theme Configuration
 * 
 * This is the single source of truth for all colors, spacing, and styling values.
 * Change colors here to update the entire application theme.
 */

export const theme = {
  // Primary Brand Colors
  colors: {
    // Primary accent color (vibrant red)
    primary: "#bb0505",        // Main accent color - vibrant red
    primaryLight: "#bb0505",   // Using same red (no lighter variant)
    primaryDark: "#bb0505",    // Using same red (no darker variant)
    gold: "#bb0505",           // Accent color (red, keeping name for compatibility)
    goldLight: "#bb0505",      // Using same red
    
    // Background Colors
    background: "#171717",     // Main dark background
    backgroundDark: "#171717", // Very dark gray background
    backgroundLight: "#444444", // Dark gray background
    backgroundMedium: "#444444", // Medium dark gray
    backgroundCard: "#171717",  // Card background
    
    // Text Colors
    text: "#EDEDED",           // Primary light gray text
    textSecondary: "#EDEDED",  // Secondary light gray text
    textMuted: "#444444",      // Muted gray text
    textDark: "#171717",       // Dark text (for light backgrounds)
    
    // Border Colors
    border: "#444444",         // Default border (dark gray)
    borderLight: "#EDEDED",    // Light border
    borderGold: "#bb0505",     // Accent border (red)
    borderGoldLight: "rgba(218, 0, 55, 0.3)", // Light accent border with opacity
    
    // State Colors (all using accent red)
    success: "#bb0505",
    warning: "#bb0505",
    error: "#bb0505",
    info: "#bb0505",
    
    // Social Media Colors (all using accent red)
    facebook: "#bb0505",
    twitter: "#bb0505",
    youtube: "#bb0505",
    linkedin: "#bb0505",
    pinterest: "#bb0505",
    instagram: "#bb0505",
    vimeo: "#bb0505",
    twitch: "#bb0505",
    
    // Gray Scale (only using the 4 colors)
    gray: {
      dark: {
        key: "#171717",
        one: "#171717",
        two: "#444444",
        three: "#444444",      // Changed from #6b7074
        four: "#444444",       // Changed from #7b7b7b
        five: "#444444",
        six: "#EDEDED",
        seven: "#171717",
        eight: "#444444",
      },
      mid: "#444444",          // Changed from #c1c6c9
      light: {
        one: "#EDEDED",
        two: "#EDEDED",
        three: "#EDEDED",
      },
    },
    
    // Additional Colors
    white: "#EDEDED",
    black: "#171717",
    transparent: "transparent",
  },

  // Gradients (only using the 4 colors)
  gradients: {
    primary: "linear-gradient(135deg, #bb0505 0%, #bb0505 100%)",
    background: "linear-gradient(135deg, #171717 0%, #444444 100%)",
    gold: "linear-gradient(45deg, #bb0505, #bb0505)",
  },

  // Shadows
  shadows: {
    light: "0 2px 6px 0 rgba(0, 0, 0, 0.05)",
    medium: "0 4px 15px rgba(218, 0, 55, 0.3)",
    dark: "0 2px 6px 0 rgba(0, 0, 0, 0.2)",
    large: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
    gold: "0 4px 15px rgba(218, 0, 55, 0.3)",
    card: "0 4px 20px rgba(0, 0, 0, 0.3)",
  },

  // Opacity/RGBA Colors
  rgba: {
    white: {
      light: "rgba(237, 237, 237, 0.05)",
      medium: "rgba(237, 237, 237, 0.3)",
    },
    gold: {
      light: "rgba(218, 0, 55, 0.1)",
      medium: "rgba(218, 0, 55, 0.3)",
      dark: "rgba(218, 0, 55, 0.5)",
    },
    black: {
      light: "rgba(23, 23, 23, 0.25)",
      medium: "rgba(23, 23, 23, 0.5)",
      dark: "rgba(23, 23, 23, 0.8)",
    },
  },

  // Spacing
  spacing: {
    xs: "0.25rem",   // 4px
    sm: "0.5rem",    // 8px
    md: "1rem",      // 16px
    lg: "1.5rem",    // 24px
    xl: "2rem",      // 32px
    xxl: "3rem",     // 48px
  },

  // Border Radius
  borderRadius: {
    sm: "2px",
    md: "4px",
    lg: "6px",
    xl: "8px",
    full: "9999px",
    pill: "25px",
  },

  // Typography
  typography: {
    fontFamily: {
      primary: '"Poppins", sans-serif',
      secondary: '"Roboto", sans-serif',
      awesome: '"Font Awesome 5 Pro"',
    },
    fontSize: {
      xs: "0.75rem",    // 12px
      sm: "0.875rem",   // 14px
      base: "1rem",     // 16px
      lg: "1.125rem",   // 18px
      xl: "1.25rem",    // 20px
      "2xl": "1.5rem",  // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem",  // 36px
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
  },

  // Breakpoints (for reference, actual breakpoints in CSS)
  breakpoints: {
    sm: "480px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    xxl: "2000px",
  },

  // Z-index scale
  zIndex: {
    base: 1,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
};

// Export individual color groups for convenience
export const colors = theme.colors;
export const gradients = theme.gradients;
export const shadows = theme.shadows;
export const spacing = theme.spacing;
export const borderRadius = theme.borderRadius;
export const typography = theme.typography;

// Helper function to get color with opacity
export const withOpacity = (color, opacity) => {
  // Convert hex to rgba
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export default theme;

