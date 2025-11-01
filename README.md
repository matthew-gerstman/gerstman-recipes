# Recipe Collection App

A beautiful recipe collection built with React, TypeScript, Tailwind CSS, Jotai, and Bun.

## Tech Stack

- **Bun** - Fast all-in-one JavaScript runtime & bundler
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Jotai** - Atomic state management

## Development

\`\`\`bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
\`\`\`

## Deployment

This app is automatically deployed to GitHub Pages via GitHub Actions when pushing to the main branch.

## Project Structure

\`\`\`
recipe-app/
├── src/
│   ├── atoms/          # Jotai state atoms
│   ├── components/     # React components
│   ├── styles/         # CSS files
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── public/             # Static assets
├── index.html          # HTML template
└── build.ts            # Build configuration
\`\`\`
