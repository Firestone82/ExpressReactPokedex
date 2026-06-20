# ExpressReactPokedex

> **VŠB-TUO** — School project · Web Application Development (VAJ)

![TypeScript](https://img.shields.io/badge/TypeScript-blue) ![React](https://img.shields.io/badge/Frontend-React-61DAFB) ![Express](https://img.shields.io/badge/Backend-Express-green)

## About

A Pokémon-themed full-stack web application. The backend is a Node.js/Express REST API with Prisma ORM; the frontend is a React SPA with routing, pagination, and lazy loading. Supports full CRUD on Pokémon, Trainers, and Actions.

**Authors:** Pavel Mikula, Miroslav Osoba

## Features

- RESTful API with proper HTTP status codes and error handling
- Pokémon CRUD with paginated listing and detail views
- Trainer management with catch/release mechanics
- React Router navigation with component-based architecture
- Prisma ORM with SQLite (easily switchable to PostgreSQL)
- Docker Compose for one-command setup

## Requirements

- Node.js 18+
- npm
- Docker *(optional)*

## Setup

### With Docker (recommended)

```bash
git clone https://github.com/Firestone82/ExpressReactPokedex.git
cd ExpressReactPokedex
docker-compose up --build
```

- Frontend: `http://localhost:3000`
- API: `http://localhost:4000`

### Manual

```bash
git clone https://github.com/Firestone82/ExpressReactPokedex.git
cd ExpressReactPokedex

# Backend
cd backend
npm install
npx prisma migrate dev --name init
npm run start

# Frontend (new terminal)
cd ../frontend
npm install
npm run start
```

## License

This project was created as a school assignment at VŠB-TUO.
