const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const { Action } = require("../model/Action");
const prisma = new PrismaClient();

// GET all actions
router.get("/", async function (req, res, next) {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;

    const total = prisma.action.count();
    let entries = await prisma.action.findMany({
      take: limit,
      skip: offset,
      include: {
        pokemon: false,
      },
    });

    // Map actions to object
    entries = entries.map(Action.fromDatabase);

    const response = {
      entries: entries.map(Action.toJSON()),
      pagination: {
        limit: limit,
        offset: offset,
        current: entries.length,
        total: total,
      },
    };

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "We are sorry, but something went wrong" });
  }
});

module.exports = router;
