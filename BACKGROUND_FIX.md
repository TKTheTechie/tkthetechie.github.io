# Background Fix for Experience and Portfolio Sections

## Issue
The Experience and Portfolio sections were not changing to white backgrounds in light mode, causing poor visual contrast and inconsistent theming.

## Root Cause
These sections were missing the proper CSS classes (`section-light` or `section-dark`) that control background colors in different themes.

## Solution
Added the appropriate section background classes to create a proper alternating pattern:

### Updated Components

1. **ExperienceFromData.svelte**
   - Added `section-dark` class
   - Now displays gray background in light mode, dark background in dark mode

2. **Portfolio.svelte** 
   - Added `section-dark` class
   - Now displays gray background in light mode, dark background in dark mode

3. **Education.svelte**
   - Added `section-dark` class  
   - Now displays gray background in light mode, dark background in dark mode

4. **Contact.svelte**
   - Added `section-dark` class
   - Now displays gray background in light mode, dark background in dark mode

### Final Section Pattern

The website now follows this alternating background pattern:

1. **Hero** - Dark gradient background
2. **About** - `section-light` (White in light mode, dark gray in dark mode)
3. **Experience** - `section-dark` (Light gray in light mode, darker gray in dark mode)
4. **Skills** - `section-light` (White in light mode, dark gray in dark mode)  
5. **Portfolio** - `section-dark` (Light gray in light mode, darker gray in dark mode)
6. **Education** - `section-dark` (Light gray in light mode, darker gray in dark mode)
7. **Blog** - `section-light` with custom styling (Custom light gray in light mode)
8. **Contact** - `section-dark` (Light gray in light mode, darker gray in dark mode)
9. **Footer** - Dark background

## CSS Classes Used

- `section-light`: Creates white background in light mode, dark background in dark mode
- `section-dark`: Creates light gray background in light mode, darker gray background in dark mode

These classes are defined in `src/app.css` and automatically handle theme switching.

## Result

- ✅ All sections now have proper backgrounds in both light and dark modes
- ✅ Visual hierarchy is maintained with alternating backgrounds  
- ✅ Text contrast is improved across all sections
- ✅ Theme switching works seamlessly without background issues