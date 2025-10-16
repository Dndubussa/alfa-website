# Logo Setup Guide

## Quick Setup Instructions

### 1. Add Your Logo Files

Place your Alfa Hospitals logo files in the `public/images/logo/` folder:

- **Main Logo**: `alfa-logo.png` (recommended: 200x80px)
- **White Logo**: `alfa-logo-white.png` (for dark backgrounds)
- **Favicon**: `alfa-favicon.ico` (16x16px or 32x32px)
- **Vector Logo**: `alfa-logo.svg` (for scalability)

### 2. Enable Logo Images

To use your actual logo images instead of the CSS-created logo, uncomment these lines in `index.html`:

#### In the Navigation (around line 20):
```html
<!-- Replace this line: -->
<!-- <img src="public/images/logo/alfa-logo.png" alt="Alfa Hospitals Logo" class="logo-image"> -->

<!-- With this (uncomment): -->
<img src="public/images/logo/alfa-logo.png" alt="Alfa Hospitals Logo" class="logo-image">
```

#### In the Footer (around line 589):
```html
<!-- Replace this line: -->
<!-- <img src="public/images/logo/alfa-logo-white.png" alt="Alfa Hospitals Logo" class="logo-image"> -->

<!-- With this (uncomment): -->
<img src="public/images/logo/alfa-logo-white.png" alt="Alfa Hospitals Logo" class="logo-image">
```

### 3. Hide CSS Logo Elements

When using image logos, you can hide the CSS-created logo elements by adding this CSS:

```css
/* Add this to styles.css to hide CSS logo when using image */
.eye-outer,
.eye-inner,
.medical-cross {
    display: none;
}
```

### 4. Logo Specifications

- **Format**: PNG, SVG, or ICO
- **Size**: 200x80px for main logo, 16x16px for favicon
- **Background**: Transparent for PNG, or white version for dark backgrounds
- **Quality**: High resolution for crisp display

### 5. Testing

After adding your logo files:
1. Refresh the website
2. Check that the logo displays correctly
3. Test on different screen sizes
4. Verify favicon appears in browser tab

## Current Status

✅ Public folder structure created
✅ Logo placeholders ready
✅ Fallback images configured
✅ CSS styling prepared
⏳ Add your actual logo files
⏳ Uncomment logo image references
