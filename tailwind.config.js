
module.exports = {
  content: [
    // These paths tell Tailwind CSS where to look for class names
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',      // Scans all files in src/app
    './src/components/**/*.{js,ts,jsx,tsx,mdx}', // Scans all files in src/components
    
  ],
  theme: {
    extend: {
      // You are using custom color names like 'border-border', 'bg-background', 'text-foreground'
      // in your globals.css. Tailwind needs these defined in the theme.
      colors: {
        // Define your custom colors using CSS variables. These names will become Tailwind utility classes.
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // If you use other custom colors like 'primary', define them here:
        // primary: {
        //   DEFAULT: 'hsl(var(--primary))',
        //   foreground: 'hsl(var(--primary-foreground))',
        // },
        // You can add more as needed, e.g., 'input', 'ring' etc.
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
    },
  },
  plugins: [],
};