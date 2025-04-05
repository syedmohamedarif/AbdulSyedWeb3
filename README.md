## Medical Practice Website

This is a modern, responsive website for a medical practice built with React, TypeScript, and Tailwind CSS.

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Visual Studio Code

### Getting Started

1. Clone the repository
2. Open the project in VSCode
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### VSCode Extensions

Install these recommended extensions for the best development experience:

1. ESLint
2. Prettier
3. Tailwind CSS IntelliSense
4. ES7+ React/Redux/React-Native snippets

### Project Structure

```
src/
├── components/
│   ├── layout/     # Layout components (Header, Footer, etc.)
│   ├── ui/         # Reusable UI components
│   └── sections/   # Page sections
├── utils/          # Utility functions and constants
├── types/          # TypeScript type definitions
└── styles/         # Global styles
```

### Development Workflow

1. Make sure the dev server is running (`npm run dev`)
2. Edit components in the `src/components` directory
3. Use the browser's dev tools to inspect changes
4. Format code using Prettier (Alt+Shift+F)

### Best Practices

- Keep components small and focused
- Use TypeScript for better type safety
- Follow the established folder structure
- Use Tailwind CSS utility classes
- Extract reusable components to the ui/ folder
- Keep business logic separate from UI components