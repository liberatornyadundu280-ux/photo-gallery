# 📷 Photo Gallery

A responsive photo gallery web app built with React + Vite + Tailwind CSS.

## Features

- Fetches 30 photos from the Picsum Photos API
- Real-time search filter by author name
- Favourite photos with heart toggle
- Favourites persist across page refreshes via localStorage
- Responsive grid — 4 columns / 2 columns / 1 column
- Glassmorphism UI design

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS v4

## Key Concepts Used

- `useFetchPhotos` — custom hook for data fetching
- `useReducer` — manages favourites state
- `useCallback` — stable function references
- `useMemo` — optimised filtering of photo list
- `localStorage` — persists favourites across sessions

## Getting Started

```bash
npm install
npm run dev
```

## API

Photos are fetched from [Picsum Photos](https://picsum.photos/v2/list?limit=30)
