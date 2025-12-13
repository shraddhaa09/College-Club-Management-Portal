# Club Management Portal

Overview
This is the frontend for the Club Management Portal—a React SPA that talks to a PHP/MySQL backend. It provides the admin dashboard, member/workshop/event management views, and analytics visualizations.

Quick start
1. Install dependencies:

```bash
cd frontend
npm install
```

2. Start development server:

```bash
npm start
```

3. Build for production:

```bash
npm run build
```

Project structure (important paths)
- `public/`: static HTML and icons
- `src/`: React source files (components, pages, API helpers)
- `src/api/`: helper functions that call backend PHP endpoints

Backend
The frontend expects the backend API in the sibling `backend/api` folder. Ensure the backend server (PHP + MySQL) is running and `api/api_init.php` is reachable.

Notes
- Environment variables: use a `.env` file in `frontend/` when needed (this repo ignores `.env`).
- Tests: run `npm test` if present.

Maintainers
- Keep frontend API paths in `src/api` in sync with `backend/api` endpoints.

