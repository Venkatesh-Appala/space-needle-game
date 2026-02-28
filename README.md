# Reach the Needle

A single-page browser game set at the Seattle Space Needle. Tap to charge the tower and reach the observation deck.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwind-css)

## How to play

1. **Start** — Click *Start* on the intro screen.
2. **Charge** — Tap or click the Space Needle. Each tap adds a random charge (2–5%).
3. **Win** — Reach 100% to unlock the observation deck. Try to beat your best tap count.

The needle glows and scales up as you charge. Your best score is saved in the browser.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm (or yarn / pnpm)

### Install and run

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/space-needle.git
cd space-needle

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Start Next.js dev server |
| `npm run build`| Build for production     |
| `npm run start`| Run production build     |
| `npm run lint` | Run ESLint               |

## Tech stack

- **Next.js 15** — App Router, React 19
- **TypeScript** — Typed components and game logic
- **Tailwind CSS** — Styling and layout
- **Framer Motion** — Animations and transitions
- **Lucide React** — Icons (Zap, Trophy, RotateCcw)

## Project structure

```
space-needle/
├── src/
│   ├── app/
│   │   ├── page.tsx      # Game (start / play / win)
│   │   ├── layout.tsx
│   │   └── globals.css
│   └── components/
│       ├── SpaceNeedle.tsx   # Needle SVG + charge styling
│       ├── GlassCard.tsx
│       └── ...
├── public/
├── package.json
└── README.md
```

## License

MIT
