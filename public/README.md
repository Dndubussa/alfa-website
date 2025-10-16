# Public Assets Folder

This folder contains all the public assets for the Alfa Specialized Hospital website.

## Folder Structure

```
public/
├── images/
│   ├── logo/           # Hospital logos and branding assets
│   ├── doctors/        # Doctor profile photos
│   └── hospital/       # Hospital building and interior photos
├── css/               # Additional CSS files (if needed)
├── js/                # Additional JavaScript files (if needed)
└── README.md          # This file
```

## Logo Assets

Place your Alfa Hospitals logo files in the `images/logo/` folder:

- `alfa-logo.png` - Main logo (recommended: 200x80px)
- `alfa-logo.svg` - Vector logo (recommended for scalability)
- `alfa-logo-white.png` - White version for dark backgrounds
- `alfa-favicon.ico` - Website favicon (16x16px or 32x32px)

## Doctor Photos

Place doctor profile photos in the `images/doctors/` folder:

- `dr-sarah-johnson.jpg`
- `dr-michael-chen.jpg`
- `dr-emily-rodriguez.jpg`
- `dr-david-thompson.jpg`

## Hospital Images

Place hospital photos in the `images/hospital/` folder:

- `hospital-exterior.jpg`
- `hospital-interior.jpg`
- `hospital-lobby.jpg`
- `hospital-rooms.jpg`

## Usage

After adding your assets, update the HTML file to reference them:

```html
<!-- Logo -->
<img src="public/images/logo/alfa-logo.png" alt="Alfa Hospitals Logo">

<!-- Doctor Photos -->
<img src="public/images/doctors/dr-sarah-johnson.jpg" alt="Dr. Sarah Johnson">

<!-- Hospital Images -->
<img src="public/images/hospital/hospital-exterior.jpg" alt="Alfa Hospitals Building">
```

## File Naming Convention

- Use lowercase letters
- Use hyphens (-) instead of spaces
- Use descriptive names
- Include file extensions (.jpg, .png, .svg, .ico)

## Image Optimization

For best performance:
- Compress images before uploading
- Use appropriate formats (PNG for logos, JPG for photos)
- Consider using WebP format for better compression
- Optimize for web (72-96 DPI)
