# Experience Management Guide

Your professional experience is now driven by data files, making it easy to update and maintain without touching the component code.

## 📁 File Structure

```
src/lib/
├── data/
│   └── experience.json          # Main experience data (JSON format)
├── content/
│   └── experience.md           # Alternative markdown format
├── components/
│   ├── ExperienceFromData.svelte    # Uses JSON data (currently active)
│   └── ExperienceMarkdown.svelte    # Uses markdown (alternative)
└── layouts/
    └── ExperienceLayout.svelte      # Layout for markdown version
```

## 🎯 Current Setup

The website currently uses **JSON-driven experience** (`ExperienceFromData.svelte`) which loads data from `src/lib/data/experience.json`.

## ✏️ How to Update Your Experience

### Adding a New Job

Edit `src/lib/data/experience.json` and add a new entry to the `experiences` array:

```json
{
  "company": "New Company",
  "position": "Your New Position",
  "location": "City, State/Remote",
  "period": "2024 - Present",
  "description": "Brief description of your role and responsibilities.",
  "achievements": [
    "First major achievement",
    "Second accomplishment",
    "Third success story"
  ],
  "technologies": [
    "Technology 1",
    "Technology 2",
    "Framework 3"
  ]
}
```

### Updating Existing Experience

Simply edit the relevant fields in the JSON file. Changes will be reflected immediately when you save.

### Reordering Experience

The experiences are displayed in the order they appear in the JSON array. Move entries up or down in the array to reorder them.

## 🔄 Alternative: Markdown Version

If you prefer writing in Markdown, you can switch to the markdown version:

1. **Switch the component** in `src/routes/+page.svelte`:
   ```svelte
   <!-- Replace this line -->
   import ExperienceFromData from '$lib/components/ExperienceFromData.svelte';
   <!-- With this -->
   import ExperienceMarkdown from '$lib/components/ExperienceMarkdown.svelte';
   
   <!-- And update the component usage -->
   <ExperienceMarkdown />
   ```

2. **Edit the markdown file** at `src/lib/content/experience.md`:
   ```markdown
   ## Company Name
   **Position Title**
   *Location • Date Range*
   
   Description paragraph...
   
   ### Key Achievements
   - Achievement 1
   - Achievement 2
   
   ### Technologies
   `Tech 1` `Tech 2` `Tech 3`
   
   ---
   ```

## 🎨 Styling

Both versions use the same visual styling:
- **Timeline layout** with alternating left/right positioning
- **Glass morphism cards** with dark mode support
- **Technology badges** with proper contrast
- **Responsive design** for mobile and desktop

## 🚀 Benefits

- **Easy Updates**: No need to touch component code
- **Version Control**: Track changes to your experience over time
- **Flexible**: Choose between JSON (structured) or Markdown (readable)
- **Maintainable**: Separate content from presentation logic

## 💡 Tips

- Keep descriptions concise but impactful
- Use action verbs in achievements ("Led", "Implemented", "Scaled")
- Group related technologies together
- Update regularly as you gain new skills and accomplishments