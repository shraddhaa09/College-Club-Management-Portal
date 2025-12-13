# College Club Management Portal

## Overview
Full-stack web application to manage college clubs, members, events, notices, and workshops.
- **Frontend:** React + Tailwind
- **Backend:** PHP + MySQL
- **Auth:** JWT
- **Deployment:** Local / XAMPP

## Features
- Club registration & login
- Admin dashboard with stats
- Member approval workflow
- Event & workshop management
- Notice board
- Reports & exports

## Project Structure

### Frontend
- `frontend/src/`: React components, pages, API helpers
- `frontend/public/`: static HTML and icons
- `frontend/src/api/`: helper functions calling backend endpoints

### Backend
- `backend/api/`: REST API endpoints
- `backend/config/`: database configuration
- `backend/utils/`: auth & token helpers
- `backend/uploads/`: file uploads (ignored in Git)

### Database
- `database/create_tables.sql`: schema & initial tables

## Quick Start

### Frontend
```bash
cd frontend
npm install
npm start       # runs dev server
npm run build   # production build
