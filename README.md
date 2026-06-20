<img width="15%" src="assets/icon.png" align="right" alt="Icon">

# ExpressReactPokedex

> **VŠB-TUO** — School project · Web Application Development (VAJ)

![TypeScript](https://img.shields.io/badge/TypeScript-blue) ![React](https://img.shields.io/badge/Frontend-React-61DAFB) ![Express](https://img.shields.io/badge/Backend-Express-green)

A Pokémon-themed full-stack web application. The backend is a Node.js/Express REST API with Prisma ORM; the frontend is a React SPA with routing, pagination, and lazy loading.

**Authors:** Pavel Mikula, Miroslav Osoba

## Features

- RESTful API with proper HTTP status codes and error handling
- Pokémon CRUD with paginated listing and detail views
- Trainer management with catch/release mechanics
- React Router navigation with component-based architecture
- Prisma ORM with SQLite (easily switchable to PostgreSQL)
- Docker Compose for one-command setup

## Requirements

- Node.js 18+ and npm
- Docker *(optional)*

## Setup

### With Docker (recommended)

1. Clone the repository:
   ```bash
   git clone https://github.com/Firestone82/ExpressReactPokedex.git
   cd ExpressReactPokedex
   ```

2. Start all services:
   ```bash
   docker-compose up --build
   ```

   - Frontend: `http://localhost:3000`
   - API: `http://localhost:4000`

### Manual

1. Clone the repository:
   ```bash
   git clone https://github.com/Firestone82/ExpressReactPokedex.git
   cd ExpressReactPokedex
   ```

2. Start the backend:
   ```bash
   cd backend
   npm install
   npx prisma migrate dev --name init
   npm run start
   ```

3. Start the frontend (new terminal):
   ```bash
   cd frontend
   npm install
   npm run start
   ```

## API Reference

**GET** `/pokemon?lazy=true` — Paginated Pokémon list
```json
{
  "entries": [{ "id": 1, "name": "Pikachu", "type": "Electric", ... }],
  "pagination": { "limit": 10, "offset": 0, "current": 10, "total": 11 }
}
```

**GET** `/pokemon/1` — Single Pokémon with actions and trainer

**POST** `/pokemon` — Create a new Pokémon
```json
{ "name": "Eevee", "type": "Normal", "weight": 6.5, "height": 0.3, "actions": [2], "trainer": 1 }
```

**GET** `/actions` — All available actions

**GET** `/trainers` — All trainers

**POST** `/trainers/1/catch/1` — Trainer catches a Pokémon

**POST** `/trainers/1/release/1` — Trainer releases a Pokémon

## License

This project was created as a school assignment at VŠB-TUO.
