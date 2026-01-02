# Loading Indicator Implementation

## Overview
This implementation adds a loading indicator to prevent the flash of unstyled content (FOUC) that can occur when the website loads and applies styling.

## Components Added

### 1. LoadingIndicator.svelte
- **Location**: `src/lib/components/LoadingIndicator.svelte`
- **Purpose**: Displays a smooth loading animation with branded colors
- **Features**:
  - Animated spinner with brand colors (blue and green)
  - Fade-out animation for smooth transition
  - Accessible with proper ARIA labels
  - Matches the site's dark theme aesthetic

### 2. Theme Initialization Script
- **Location**: `src/app.html`
- **Purpose**: Prevents FOUC by setting the theme before any components load
- **Implementation**: Inline script that runs immediately when the HTML loads

### 3. Enhanced Layout
- **Location**: `src/routes/+layout.svelte`
- **Purpose**: Coordinates the loading state with resource loading
- **Features**:
  - Waits for fonts to load (`document.fonts.ready`)
  - Waits for page resources to load
  - Includes fallback timeout (2 seconds) to prevent hanging
  - Error handling to ensure content always shows

### 4. Improved Theme Store
- **Location**: `src/lib/stores/theme.ts`
- **Purpose**: Better theme management with exposed `set` method
- **Features**: Synchronous theme application to prevent flashing

## How It Works

1. **Initial Load**: The HTML loads with a dark background and theme script
2. **Theme Application**: Theme is applied immediately via inline script
3. **Component Loading**: Svelte components load while loading indicator shows
4. **Resource Waiting**: System waits for fonts and critical resources
5. **Smooth Transition**: Loading indicator fades out, revealing the content

## Benefits

- **No FOUC**: Eliminates flash of unstyled content
- **Better UX**: Smooth loading experience with branded animation
- **Performance**: Minimal impact on load times
- **Accessibility**: Proper ARIA labels and semantic markup
- **Reliability**: Fallback mechanisms prevent hanging states

## Customization

### Timing
- Adjust fade-out timing in `LoadingIndicator.svelte`
- Modify fallback timeout in `+layout.svelte` (currently 2 seconds)

### Styling
- Update colors in the spinner animation
- Modify background gradient
- Change animation duration and easing

### Loading Conditions
- Add additional resource loading checks
- Modify the Promise.all conditions in `+layout.svelte`

## Testing
Visit the site and observe:
1. No flash of unstyled content on initial load
2. Smooth loading animation appears briefly
3. Content appears with proper styling applied
4. Theme switching works without flashing