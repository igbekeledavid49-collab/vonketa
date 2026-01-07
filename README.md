# Hacker News Top Stories

A modern, responsive web application that displays the top 100 stories from Hacker News using the Algolia HN API.

## Features

- 📰 Displays top 100 stories from Hacker News
- 🔍 Real-time search functionality to filter stories by title or author
- ⚡ Skeleton loading placeholders for better UX
- 🔗 Click "Read more" to open stories in a new tab
- 📱 Responsive design that works on all devices
- 🎨 Clean, modern UI with Hacker News orange branding

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS v4** for styling
- **Algolia HN API** for fetching stories

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm, yarn, or pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Header.tsx          # App header with branding
│   ├── SearchBar.tsx       # Search input component
│   ├── StoryCard.tsx       # Individual story display
│   └── SkeletonCard.tsx    # Loading placeholder
├── types.ts                # TypeScript type definitions
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
└── index.css              # Global styles and Tailwind imports
```

## API

This app uses the [Algolia Hacker News API](https://hn.algolia.com/api):
- Endpoint: `https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=100`
- Returns the top 100 front page stories

## License

MIT