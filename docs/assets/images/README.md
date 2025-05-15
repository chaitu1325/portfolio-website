# Images Directory

This directory is for storing image assets used in the portfolio website.

## Usage Instructions

1. Place your profile image (profile.jpg) in this directory
2. Reference it in your components using the relative path:

```html
<!-- In HTML templates -->
<img src="assets/images/profile.jpg" alt="Profile Picture">
```

```scss
/* In SCSS files */
.profile-image {
  background-image: url('/assets/images/profile.jpg');
}
```

```typescript
// In TypeScript files
profileImagePath = 'assets/images/profile.jpg';
```

## Image Optimization

For better performance, consider optimizing your images before adding them to this directory:

1. Resize images to the appropriate dimensions for their intended use
2. Compress images to reduce file size
3. Consider using modern formats like WebP with fallbacks for older browsers

## Recommended Image Sizes

- Profile/Avatar: 300x300px (1:1 ratio)
- Hero/Banner: 1920x1080px (16:9 ratio)
- Project thumbnails: 800x600px (4:3 ratio)
- Icons: 64x64px or SVG format

## File Naming Conventions

- Use lowercase letters
- Use hyphens instead of spaces
- Include descriptive names
- Example: `profile-picture-john-doe.jpg`