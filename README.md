<img width="15%" src="assets/icon.png" align="right" alt="Icon">
<br>

# Project for VAJ (Express REST with React)
- Author: Pavel Mikula (MIK0486)
- Author: Miroslav Osoba (OSO0008)
- Took approximately 5 hours

## Project Theme
This project is simple web page made by React, that communicates with NodeJS Express REST API.
Selected theme of this project, were pokemons. Using REST we are able to do basic CRUD operations containing pagination and lazy loading, next to there are special requests.

## System Requirements
- Prisma 5.11+
- Express 4.16.1+
- Node/NPM

## Project Requirements
- Back-end (NodeJS):
    - [x] 5 Functional requirements
        - At least 2 resources (2 tables connected to each other via key)
        - All CRUD operations on one resource
        - At least 2 operations on second resource
    - [x] 5 ORM Layer
        - Connection to the DB via a ORM library 
        - Error handling
    - [x] 5 Express REST API layer 
        - Valid API up to the REST specification for all operations on resources
        - Status handling & error messages
- Front-end (React):
    - [ ] 5 Functional requirements
        - App Layout with Navigation (Routing)
        - Main page with information about the app
        - All CRUD operations on one resource (Create Form, Edit Form, List/Table, Delete, Detail View) 
    - [ ] 5 Component structure
        - Split your application into several components. Don’t make huge ones. 
    - [ ] 5 Client-side routing
        - There should be proper routes for all pages
        - Best practices according to react router 
    - [ ] 5 Data fetching
        - Custom API functions
        - Proper loading states
        - Proper error handling / states 
- Overall:
    - 5 Code quality / project setup
        - README, Prettier, Able to run the whole project easily! 

## Instalation
Express JS (REST API)
```
TODO
```

React (Single Page)
```
TODO
```

## API Usage / Examples
**GET - http://localhost:3000/pokemons?lazy=true** - *Returns paginated lazy entries*
```json
{
    "entries": [
        {
            "id": 1,
            "name": "Pikachu",
            "type": "Electric",
            "description": "Pikachu, an Electric-type Pokémon, is known for its ability to generate powerful electric shocks. It's friendly and easily recognizable by its yellow fur and lightning-shaped tail.",
            "createdAt": "2024-03-21T00:00:00.000Z",
            "actions": [
                1
            ],
            "trainer": 1
        },
        ...
    ],
    "pagination": {
        "limit": 10,
        "offset": 0,
        "current": 10,
        "total": 11
    }
}
```
**GET - http://localhost:3000/pokemons/1** - *Returns single entry*
```json
{
    "id": 1,
    "name": "Pikachu",
    "type": "Electric",
    "description": "Pikachu, an Electric-type Pokémon, is known for its ability to generate powerful electric shocks. It's friendly and easily recognizable by its yellow fur and lightning-shaped tail.",
    "weight": 6,
    "height": 0.4,
    "image": "https://example.com/images/pikachu.jpg",
    "createdAt": "2024-03-21T00:00:00.000Z",
    "actions": [
        {
            "id": 1,
            "name": "Thunderbolt",
            "type": "Electric",
            "description": "A strong electric attack that may also leave the target with paralysis.",
            "damage": 90,
            "createdAt": "2024-03-21T00:00:00.000Z"
        }
    ],
    "trainer": {
        "id": 1,
        "name": "Ash Ketchum",
        "email": "ash.ketchum@example.com",
        "password": "securePassword123",
        "createdAt": "2024-03-21T00:00:00.000Z",
        "deletedAt": null
    }
}
```
**POST - http://localhost:3000/pokemons** - *Creates mew pokemon*
```json
{
    "name": "Eevee",
    "type": "Normal",
    "description": "Eevee has an unstable genetic makeup that suddenly mutates due to the environment in which it lives. Radiation from various stones causes this Pokémon to evolve.",
    "weight": 6.5,
    "height": 0.3,
    "image": "https://example.com/images/eevee.jpg",
    "actions": [2],
    "trainerId": 1
}
```
**POST - http://localhost:3000/trainers/1/catch/1 ** - *Catches new pokemon*
**POST - http://localhost:3000/trainers/1/release/1 ** - *Releases pokemon*