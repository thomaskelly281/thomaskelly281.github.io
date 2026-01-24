# Fonts Directory

This directory contains custom font files for the application.

## Structure

- `font-family-1/` - First font family
- `font-family-2/` - Second font family  
- `font-family-3/` - Third font family

## Font File Formats

Supported formats:
- `.woff2` (recommended - best compression)
- `.woff` (fallback)
- `.ttf` (TrueType)
- `.otf` (OpenType)

## Usage

### Option 1: Using CSS @font-face

Add font declarations in `app/globals.css`:

```css
@font-face {
  font-family: 'Font Family 1';
  src: url('/fonts/font-family-1/font-name.woff2') format('woff2'),
       url('/fonts/font-family-1/font-name.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

### Option 2: Using Next.js localFont

In your component or layout:

```typescript
import localFont from 'next/font/local';

const fontFamily1 = localFont({
  src: [
    {
      path: '../public/fonts/font-family-1/font-name-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/font-family-1/font-name-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-family-1',
  display: 'swap',
});
```

## Notes

- Rename the folders (`font-family-1`, `font-family-2`, `font-family-3`) to match your actual font names
- Include all font weights and styles (regular, bold, italic, etc.) in each folder
- Use `font-display: swap` for better performance
