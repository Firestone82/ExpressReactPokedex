const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const { Pokemon } = require("../model/Pokemon");
const { Action } = require("../model/Action");
const { Trainer } = require("../model/Trainer");
const prisma = new PrismaClient();

// GET all pokemons
router.get("/", async function (req, res, next) {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    const lazy = req.query.lazy === "true";

    const total = await prisma.pokemon.count();
    let entries = [];

    if (lazy) {
      entries = await prisma.pokemon.findMany({
        select: {
          // Select all
          id: true,
          name: true,
          type: true,
          description: true,
          createdAt: true,
          actions: {
            select: {
              // Select only the id
              id: true,
            },
          },
          trainer: {
            select: {
              // Select only the id
              id: true,
            },
          },
        },
        take: limit,
        skip: offset,
      });
    } else {
      entries = await prisma.pokemon.findMany({
        include: {
          actions: true,
          trainer: true,
        },
        take: limit,
        skip: offset,
      });
    }

    // Map Pokemon to object
    entries = entries.map(Pokemon.fromDatabase);

    res.status(200).json({
      entries: entries.map(Pokemon.toJSON(lazy)),
      pagination: {
        limit: limit,
        offset: offset,
        current: entries.length,
        total: total,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "We are sorry, but something went wrong" });
  }
});

// GET specific pokemon
router.get("/:id", async function (req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const lazy = req.query.lazy === "true";
    let pokemon = null;

    if (lazy) {
      pokemon = await prisma.pokemon.findUnique({
        where: {
          id: id,
        },
        select: {
          // Select all
          id: true,
          name: true,
          type: true,
          description: true,
          createdAt: true,
          actions: {
            select: {
              // Select only the id
              id: true,
            },
          },
          trainer: {
            select: {
              id: true,
            },
          },
        },
      });
    } else {
      pokemon = await prisma.pokemon.findUnique({
        where: {
          id: id,
        },
        include: {
          actions: true,
          trainer: true,
        },
      });
    }

    if (!pokemon) {
      res.status(404).json({ error: "Pokemon not found" });
      return;
    }

    pokemon = Pokemon.fromDatabase(pokemon);
    res.json(Pokemon.toJSON(lazy)(pokemon));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "We are sorry, but something went wrong" });
  }
});

// POST new pokemon
router.post("/", async function (req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const pokemonData = req.body;

    // Check for missing fields using the Pokémon model
    if (!Pokemon.isValid(pokemonData)) {
      res.status(400).json({ error: "Invalid Pokemon Data" });
      return;
    }

    // Get Trainer
    let trainer = null;
    if (pokemonData.trainerId) {
      trainer = await prisma.trainer.findUnique({
        where: {
          id: pokemonData.trainerId,
        },
      });

      if (!trainer) {
        res.status(404).json({ error: "Trainer not found" });
        return;
      }

      trainer = Trainer.fromDatabase(trainer);
    }

    // Get Actions
    let actions = [];
    if (pokemonData.actions) {
      actions = await prisma.action.findMany({
        where: {
          id: {
            in: pokemonData.actions,
          },
        },
      });

      if (actions.length !== pokemonData.actions.length) {
        res.status(404).json({ error: "Action not found" });
        return;
      }

      actions = actions.map(Action.fromDatabase);
    }

    let pokemon = Pokemon.fromDatabase(pokemonData);
    delete pokemon.trainer;

    pokemon.trainerId = pokemonData.trainer ? pokemonData.trainer : null;
    pokemon.actions = {
      connect: pokemon.actions.map((action) => {
        return { id: action };
      }),
    };

    const insertPokemon = await prisma.pokemon.create({
      include: {
        actions: true,
        trainer: true,
      },
      data: pokemon,
    });

    // Parse the updated Pokémon
    pokemon = Pokemon.fromDatabase(insertPokemon);

    res.status(200).json(Pokemon.toJSON(false)(pokemon));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "We are sorry, but something went wrong" });
  }
});

// PUT update pokemon
router.put("/:id", async function (req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const pokemonData = req.body;

    // Check for missing fields using the Pokémon model
    if (!Pokemon.isValid(pokemonData)) {
      res.status(400).json({ error: "Invalid Pokemon Data" });
      return;
    }

    // Get Trainer
    let trainer = null;
    if (pokemonData.trainerId) {
      trainer = await prisma.trainer.findUnique({
        where: {
          id: pokemonData.trainerId,
        },
      });

      if (!trainer) {
        res.status(404).json({ error: "Trainer not found" });
        return;
      }

      trainer = Trainer.fromDatabase(trainer);
    }

    // Get Actions
    let actions = [];
    if (pokemonData.actions) {
      actions = await prisma.action.findMany({
        where: {
          id: {
            in: pokemonData.actions,
          },
        },
      });

      if (actions.length !== pokemonData.actions.length) {
        res.status(404).json({ error: "Action not found" });
        return;
      }

      actions = actions.map(Action.fromDatabase);
    }

    let pokemon = Pokemon.fromDatabase(pokemonData);
    delete pokemon.trainer;

    pokemon.trainerId = pokemonData.trainerId ? pokemonData.trainerId : null;
    pokemon.actions = {
      set: pokemon.actions.map((action) => {
        return { id: action };
      }),
    };

    const updatedPokemon = await prisma.pokemon.update({
      where: {
        id: id,
      },
      include: {
        actions: true,
        trainer: true,
      },
      data: pokemon,
    });

    // Parse the updated Pokémon
    pokemon = Pokemon.fromDatabase(updatedPokemon);

    res.status(200).json(Pokemon.toJSON(false)(pokemon));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "We are sorry, but something went wrong" });
  }
});

// DELETE specific pokemon
router.delete("/:id", async function (req, res, next) {
  try {
    const id = parseInt(req.params.id);

    // Find the Pokémon
    const pokemonExists = await prisma.pokemon.findUnique({
      where: {
        id: id,
      },
    });

    if (!pokemonExists) {
      res.status(404).json({ error: "Pokemon not found" });
      return;
    }

    const pokemon = await prisma.pokemon.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json({ message: "Pokemon deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "We are sorry, but something went wrong" });
  }
});

module.exports = router;
