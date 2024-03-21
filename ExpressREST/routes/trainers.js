const express = require('express');
const router = express.Router();

const {PrismaClient} = require('@prisma/client');
const {Trainer} = require("../model/Trainer");
const {Pokemon} = require("../model/Pokemon");
const prisma = new PrismaClient();

// GET all trainers
router.get('/', async function (req, res, next) {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const offset = req.query.offset ? parseInt(req.query.offset) : 0;
        const lazy = req.query.lazy === 'true';

        const total = prisma.trainer.count();
        let entries = [];

        if (lazy) {
            entries = await prisma.trainer.findMany({
                select: { // Select all
                    id: true,
                    name: true,
                    email: true,
                    password: true,
                    createdAt: true,
                    deletedAt: true,
                    pokemons: {
                        select: { // Select only the id
                            id: true
                        }
                    }
                },
                take: limit,
                skip: offset,
            });
        } else {
            entries = await prisma.trainer.findMany({
                include: {
                    pokemons: true
                },
                take: limit,
                skip: offset,
            });
        }

        // Map actions to object
        entries = entries.map(Trainer.fromDatabase);

        res.status(200).json({
            entries: entries.map(Trainer.toJSON(lazy)),
            pagination: {
                limit: limit,
                offset: offset,
                current: entries.length,
                total: total
            }
        });
    } catch (err) {
        console.error(err)
        res.status(500).json({error: "We are sorry, but something went wrong"});
    }
});

// GET specific trainer
router.get('/:id', async function (req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const lazy = req.query.lazy === 'true';
        let trainer = null;

        if (lazy) {
            trainer = await prisma.trainer.findUnique({
                where: {
                    id: id
                },
                select: { // Select all
                    id: true,
                    name: true,
                    email: true,
                    password: true,
                    createdAt: true,
                    deletedAt: true,
                    pokemons: {
                        select: { // Select only the id
                            id: true
                        }
                    }
                }
            });
        } else {
            trainer = await prisma.trainer.findUnique({
                where: {
                    id: id
                },
                include: {
                    pokemons: true
                }
            });
        }

        if (!trainer) {
            res.status(404).json({ error: "Trainer not found" });
            return;
        }

        trainer = Trainer.fromDatabase(trainer);
        res.json(Trainer.toJSON(lazy)(trainer));
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "We are sorry, but something went wrong" });
    }
});

// POST - catch a pokemon
router.post('/:id/catch/:pokemon', async function (req, res, next) {
    try {
        const trainerId = parseInt(req.params.id);
        const pokemonId = parseInt(req.params.pokemon);

        // Get Trainer
        let trainer = await prisma.trainer.findUnique({
            where: {
                id: trainerId,
                deletedAt: null
            },
            include: {
                pokemons: true
            }
        });

        if (trainer) {
            trainer = Trainer.fromDatabase(trainer);

            if (trainer.pokemons.length >= 6) {
                res.status(400).json({ error: "Trainer can have max 6 pokemons!" });
                return;
            }
        } else {
            res.status(404).json({ error: "Trainer not found" });
            return;
        }

        // Get Pokemon
        let pokemon = await prisma.pokemon.findUnique({
            where: {
                id: pokemonId
            },
            include: {
                trainer: true
            }
        });

        if (pokemon) {
            pokemon = Pokemon.fromDatabase(pokemon);

            if (pokemon.trainer !== null) {
                res.status(400).json({ error: "Pokemon already caught" });
                return;
            }
        } else {
            res.status(404).json({ error: "Pokemon not found" });
            return;
        }

        // Update Trainer
        const updatedTrainer = await prisma.trainer.update({
            where: {
                id: trainerId
            },
            data: {
                pokemons: {
                    connect: {
                        id: pokemonId
                    }
                }
            }
        });

        if (!updatedTrainer) {
            res.status(500).json({ error: "We are sorry, but something went wrong" });
            return;
        }

        res.json({ message: "Pokemon caught" });
    } catch (err) {
        console.error(err)
        res.status(500).json({error: "We are sorry, but something went wrong"});
    }
});

// POST - release a pokemon
router.post('/:id/release/:pokemon', async function (req, res, next) {
    try {
        const trainerId = parseInt(req.params.id);
        const pokemonId = parseInt(req.params.pokemon);

        // Get Trainer
        let trainer = await prisma.trainer.findUnique({
            where: {
                id: trainerId,
                deletedAt: null
            },
            include: {
                pokemons: true
            }
        });

        if (trainer) {
            trainer = Trainer.fromDatabase(trainer);
        } else {
            res.status(404).json({ error: "Trainer not found" });
            return;
        }

        // Get Pokemon
        let pokemon = await prisma.pokemon.findUnique({
            where: {
                id: pokemonId
            },
            include: {
                trainer: true
            }
        });

        if (pokemon) {
            pokemon = Pokemon.fromDatabase(pokemon);

            if (pokemon.trainer === null || pokemon.trainer.id !== trainerId) {
                res.status(400).json({ error: "Pokemon not caught by this trainer" });
                return;
            }
        } else {
            res.status(404).json({ error: "Pokemon not found" });
            return;
        }

        // Update Trainer
        const updatedTrainer = await prisma.trainer.update({
            where: {
                id: trainerId
            },
            data: {
                pokemons: {
                    disconnect: {
                        id: pokemonId
                    }
                }
            }
        });

        if (!updatedTrainer) {
            res.status(500).json({ error: "We are sorry, but something went wrong" });
            return;
        }

        res.json({ message: "Pokemon released" });
    } catch (err) {
        console.error(err)
        res.status(500).json({error: "We are sorry, but something went wrong"});
    }
});


module.exports = router;
