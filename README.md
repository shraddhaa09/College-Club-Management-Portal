# VIT Club Connect

![Institute Project](https://img.shields.io/badge/Project-Institute%20Sponsored-blue)
![React](https://img.shields.io/badge/React-19-61DAFB)
![PHP](https://img.shields.io/badge/PHP-8.x-777BB4)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1)
![JWT](https://img.shields.io/badge/Auth-JWT-green)

## Overview
Full-stack web application to manage college clubs, members, events, notices, and workshops.
- **Frontend:** React + Tailwind
- **Backend:** PHP + MySQL
- **Auth:** JWT
- **Deployment:** Local / XAMPP

## Project Background

This project was developed as **VIT Club Connect**, an **official institute-sponsored software project** for **Vishwakarma Institute of Technology (VIT), Pune** during the Academic Year **2025–2026**.

The project was completed under faculty guidance to redesign the **LIFE@VIT Official Website** and develop the **VIT Club Connect – Club Coordination System**, enabling centralized management of clubs, events, workshops, notices, and student memberships.

📄 **Project Completion Certificate:**  
[View Certificate](docs/Project_Completion_Certificate.png)

---

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
