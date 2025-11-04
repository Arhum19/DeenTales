# Tailwind CSS Installation Guide for DeenTales Frontend

## Installation Steps

### 1. Install Tailwind CSS and dependencies

Open PowerShell and run:

```powershell
cd d:\deentales\frontend
npm install -D tailwindcss postcss autoprefixer
```

### 2. Initialize Tailwind (Optional - Already Done)

The configuration files have been created for you:

- `tailwind.config.js`
- `postcss.config.js`

If you need to recreate them, run:

```powershell
npx tailwindcss init -p
```

### 3. Configuration Files

#### tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#667eea",
        secondary: "#764ba2",
        success: "#4CAF50",
        error: "#c62828",
      },
    },
  },
  plugins: [],
};
```

#### postcss.config.js

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### 4. Add Tailwind Directives to CSS

The `src/index.css` file has been updated with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 5. Start the Development Server

```powershell
npm run dev
```

## Using Tailwind CSS

### Example Component with Tailwind

```jsx
export default function Button() {
  return (
    <button className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Click me
    </button>
  );
}
```

### Custom Colors (Already Configured)

You can use these custom colors:

- `bg-primary` - #667eea
- `bg-secondary` - #764ba2
- `bg-success` - #4CAF50
- `bg-error` - #c62828

### Common Tailwind Classes

**Layout:**

- `flex`, `grid`, `block`, `hidden`
- `container`, `mx-auto`
- `w-full`, `h-screen`

**Spacing:**

- `p-4`, `px-4`, `py-4` (padding)
- `m-4`, `mx-4`, `my-4` (margin)
- `gap-4`, `space-x-4`

**Typography:**

- `text-xl`, `text-2xl`, `text-3xl`
- `font-bold`, `font-semibold`
- `text-center`, `text-left`

**Colors:**

- `bg-blue-500`, `text-white`
- `bg-primary`, `text-gray-600`

**Borders:**

- `border`, `border-2`
- `rounded`, `rounded-lg`, `rounded-full`

**Effects:**

- `shadow`, `shadow-lg`
- `hover:bg-blue-700`
- `transition`, `duration-300`

## Updating Existing Components

You can now replace your CSS files with Tailwind classes. For example:

### Before (CSS):

```css
.button {
  background-color: #667eea;
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 8px;
}
```

### After (Tailwind):

```jsx
<button className="bg-primary text-white py-3 px-8 rounded-lg">Button</button>
```

## VSCode Extension (Recommended)

Install "Tailwind CSS IntelliSense" extension for:

- Autocomplete
- Syntax highlighting
- Linting

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)

## Troubleshooting

If styles don't load:

1. Make sure you ran `npm install -D tailwindcss postcss autoprefixer`
2. Restart the dev server
3. Check that `@tailwind` directives are in `src/index.css`
4. Verify `tailwind.config.js` content array includes your files

## Notes

The CSS lint errors for `@tailwind` are expected and will work fine when running the app. They disappear once Tailwind processes the CSS.
