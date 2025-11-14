# Theme Configuration Guide

## Overview

All colors, spacing, and styling values are now centralized in `src/config/theme.js`. This allows you to change the entire application's color scheme from a single file.

## Quick Start

### Changing Colors

To change colors across the entire application, edit `src/config/theme.js`:

```javascript
export const theme = {
  colors: {
    primary: "#ae8625",        // Change this to update primary gold color
    background: "#000000",     // Change this to update background
    text: "#ffffff",           // Change this to update text color
    // ... etc
  }
}
```

### Using Theme in Components

#### Option 1: Using Theme Utilities (Recommended)

```jsx
import { getColor, getSpacing, getGradient, getShadow } from "../lib/utils/theme";

const MyComponent = () => {
  return (
    <div style={{
      background: getColor("background"),
      color: getColor("text"),
      padding: getSpacing("lg"),
      boxShadow: getShadow("medium"),
    }}>
      <h1 style={{ color: getColor("primary") }}>Title</h1>
    </div>
  );
};
```

#### Option 2: Using Common Styles

```jsx
import { commonStyles } from "../lib/utils/theme";

const MyComponent = () => {
  return (
    <div style={commonStyles.pageContainer}>
      <button style={commonStyles.buttonPrimary}>Click Me</button>
    </div>
  );
};
```

#### Option 3: Using CSS Variables

In CSS files, use CSS variables:

```css
.my-class {
  background: var(--background);
  color: var(--text);
  border: 1px solid var(--border);
}
```

## Theme Structure

### Colors

All colors are organized in `theme.colors`:

- **Primary Colors**: `primary`, `primaryLight`, `primaryDark`, `gold`, `goldLight`
- **Background Colors**: `background`, `backgroundDark`, `backgroundLight`, `backgroundMedium`, `backgroundCard`
- **Text Colors**: `text`, `textSecondary`, `textMuted`, `textDark`
- **Border Colors**: `border`, `borderLight`, `borderGold`
- **State Colors**: `success`, `warning`, `error`, `info`
- **Social Media Colors**: `facebook`, `twitter`, `youtube`, etc.
- **Gray Scale**: `gray.dark.*`, `gray.mid`, `gray.light.*`

### Gradients

Pre-defined gradients in `theme.gradients`:
- `primary`: Gold gradient
- `background`: Dark gradient
- `gold`: Gold accent gradient

### Shadows

Pre-defined shadows in `theme.shadows`:
- `light`, `medium`, `dark`, `large`, `gold`, `card`

### Spacing

Consistent spacing values in `theme.spacing`:
- `xs`, `sm`, `md`, `lg`, `xl`, `xxl`

### Border Radius

Border radius values in `theme.borderRadius`:
- `sm`, `md`, `lg`, `xl`, `full`, `pill`

## Available Utility Functions

### `getColor(path)`
Get a color value by path (supports nested paths).

```javascript
getColor("primary")              // "#ae8625"
getColor("gray.dark.one")        // "#121213"
getColor("text")                 // "#ffffff"
```

### `getGradient(name)`
Get a gradient value.

```javascript
getGradient("primary")           // "linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%)"
```

### `getShadow(name)`
Get a shadow value.

```javascript
getShadow("medium")              // "0 4px 15px rgba(174, 134, 37, 0.3)"
```

### `getSpacing(size)`
Get a spacing value.

```javascript
getSpacing("md")                 // "1rem"
```

### `getBorderRadius(size)`
Get a border radius value.

```javascript
getBorderRadius("md")            // "4px"
```

### `getRgba(color, opacity)`
Get an RGBA color with opacity.

```javascript
getRgba("gold", "light")         // "rgba(212, 175, 55, 0.1)"
getRgba("white", "medium")       // "rgba(255, 255, 255, 0.3)"
```

### `withOpacity(color, opacity)`
Convert a hex color to RGBA.

```javascript
withOpacity("#ae8625", 0.5)      // "rgba(174, 134, 37, 0.5)"
```

## Common Style Objects

Pre-defined style objects for common patterns:

```javascript
import { commonStyles } from "../lib/utils/theme";

// Page container
commonStyles.pageContainer

// Card
commonStyles.card

// Input field
commonStyles.input

// Primary button
commonStyles.buttonPrimary

// Section container
commonStyles.section
```

## CSS Variables

CSS variables are automatically synced with the theme. Use them in CSS:

```css
.my-element {
  background: var(--background);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-medium);
}
```

Available CSS variables:
- `--background`, `--text`, `--primary-color`, `--gold`
- `--border`, `--border-gold`
- `--radius`, `--radius-big`, `--radius-xl`
- `--shadow-light`, `--shadow-medium`, `--shadow-dark`, `--shadow-gold`
- And many more (see `src/styles/style.css`)

## Migration Checklist

When updating existing components:

1. ✅ Import theme utilities: `import { getColor, getSpacing } from "../lib/utils/theme"`
2. ✅ Replace hardcoded colors: `#000` → `getColor("background")`
3. ✅ Replace hardcoded spacing: `"2rem"` → `getSpacing("xl")`
4. ✅ Use common styles where applicable: `commonStyles.pageContainer`
5. ✅ Update CSS to use CSS variables: `var(--background)`

## Examples

### Before (Hardcoded)
```jsx
<div style={{ background: '#000', color: '#fff', padding: '2rem' }}>
  <h1 style={{ color: '#ae8625' }}>Title</h1>
</div>
```

### After (Theme-based)
```jsx
import { getColor, getSpacing } from "../lib/utils/theme";

<div style={{ 
  background: getColor("background"), 
  color: getColor("text"), 
  padding: getSpacing("xl") 
}}>
  <h1 style={{ color: getColor("primary") }}>Title</h1>
</div>
```

## Changing the Entire Color Scheme

To change the entire color scheme:

1. Open `src/config/theme.js`
2. Update the color values in the `colors` object
3. Save the file
4. All components using theme utilities will automatically update

Example: Change from gold to blue theme:

```javascript
colors: {
  primary: "#1e40af",        // Changed from gold to blue
  primaryLight: "#3b82f6",
  gold: "#1e40af",           // Update gold references too
  // ... etc
}
```

## Best Practices

1. **Always use theme utilities** instead of hardcoded colors
2. **Use CSS variables** in CSS files
3. **Use common styles** for frequently used patterns
4. **Keep theme.js organized** - add comments for new color additions
5. **Test color changes** - ensure sufficient contrast for accessibility

## Troubleshooting

### Colors not updating?
- Make sure you're using theme utilities, not hardcoded values
- Check that CSS variables are synced in `style.css`
- Clear browser cache and rebuild

### Need a new color?
1. Add it to `src/config/theme.js` in the appropriate section
2. Add corresponding CSS variable in `src/styles/style.css`
3. Use it via `getColor("yourNewColor")`

## Support

For questions or issues with the theme system, refer to:
- `src/config/theme.js` - Theme configuration
- `src/lib/utils/theme.js` - Theme utilities
- `src/styles/style.css` - CSS variables

