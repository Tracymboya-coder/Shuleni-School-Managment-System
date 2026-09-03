# Shuleni frontend

Shuleni is a Vite + React school management frontend with role-aware flows for school owners, educators, and students.

## Setup

```bash
cd shuleni-frontend
npm install
```

## Commands

```bash
npm run dev
npm test -- --runInBand
npm run build
npm run preview
```

The development server runs on port `5173` by default. Set `VITE_API_URL` when the API is served somewhere other than `http://localhost:4000/api`.

## Project structure

- `src/` — canonical React application source, screens, Redux Toolkit store, and tests
- `public/assets/` — static image assets
- `docs/shuleni-mvp-design.md` — preserved MVP design brief
- `vite.config.js` — Vite and Tailwind CSS configuration
- `jest.config.js` — Jest and Testing Library configuration

There is one supported project root: `shuleni-frontend/`.
