const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const pokemonRouter = require("./routes/pokemon");
const trainerRouter = require("./routes/trainers");
const actionRouter = require("./routes/actions");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/pokemons", pokemonRouter);
app.use("/actions", actionRouter);
app.use("/trainers", trainerRouter);

module.exports = app;
