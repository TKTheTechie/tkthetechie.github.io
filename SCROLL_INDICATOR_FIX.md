# Scroll Progress Indicator Background Fix

## Issue
The floating scroll progress indicator had a black background in light mode, making it poorly visible and inconsistent with the site's theming.

## Root Cause
The component was using Tailwind classes (`bg-white dark:bg-gray-800`) that were potentially being overridden by other CSS rules or not applying correctly due to specificity issues.

## Solution
Replaced Tailwind utility classes with component-specific CSS styles that have higher specificity and are guaranteed to apply correctly.

### Changes Made

1. **Added Custom CSS Class**
   - Added `.scroll-indicator` class to the button element
   - Removed Tailwind background and border classes from the HTML

2. **Enhanced Component Styles**
   - Added explicit background colors for light and dark modes
   - Added explicit border colors for both themes
   - Used higher specificity CSS rules to prevent overrides

3. **Improved Tooltip Styling**
   - Added `.tooltip` and `.tooltip-arrow` classes
   - Ensured tooltip backgrounds are properly themed
   - Fixed tooltip arrow colors for both modes

4. **Enhanced Progress Ring Colors**
   - Updated background ring color to be more visible in light mode
   - Maintained proper contrast in both themes

### CSS Implementation

```css
.scroll-indicator {
  background-color: white;
  border-color: rgb(229, 231, 235); /* gray-200 */
}

:global(.dark) .scroll-indicator {
  background-color: rgb(31, 41, 55); /* gray-800 */
  border-color: rgb(75, 85, 99); /* gray-600 */
}
```

## Result

- ✅ **Light Mode**: Clean white background with light gray border
- ✅ **Dark Mode**: Dark gray background with darker border  
- ✅ **Tooltip**: Properly themed in both modes
- ✅ **Progress Ring**: Better visibility and contrast
- ✅ **Consistent**: Matches the overall site theming

The scroll indicator now seamlessly integrates with both light and dark themes, providing excellent visibility and user experience across all viewing modes.