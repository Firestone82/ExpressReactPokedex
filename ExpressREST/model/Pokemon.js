class Pokemon {
  constructor(
    id,
    name,
    type,
    description,
    weight,
    height,
    createdAt,
    actions,
    trainer = null,
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.description = description;
    this.weight = weight;
    this.height = height;
    this.createdAt = createdAt;
    this.actions = actions;
    this.trainer = trainer;
  }

  static fromDatabase(entry) {
    return new Pokemon(
      entry.id,
      entry.name,
      entry.type,
      entry.description,
      entry.weight,
      entry.height,
      entry.createdAt,
      entry.actions || [],
      entry.trainer || null,
    );
  }

  static toJSON(lazy = false) {
    return (entry) => {
      if (lazy) {
        entry.actions = entry.actions.map((action) => action.id);
        entry.trainer = entry.trainer ? entry.trainer.id : null;
      }

      return entry;
    };
  }

  static isValid(pokemon) {
    return (
      pokemon.name &&
      pokemon.type &&
      pokemon.description &&
      pokemon.weight &&
      pokemon.height
    );
  }
}

// Pokemon Type
const PokemonType = {
  BUG: "bug",
  DARK: "dark",
  DRAGON: "dragon",
  ELECTRIC: "electric",
  FAIRY: "fairy",
  FIGHTING: "fighting",
  FIRE: "fire",
  FLYING: "flying",
  GHOST: "ghost",
  GRASS: "grass",
  GROUND: "ground",
  ICE: "ice",
  NORMAL: "normal",
  POISON: "poison",
  PSYCHIC: "psychic",
  ROCK: "rock",
  STEEL: "steel",
  WATER: "water",
};

module.exports = {
  Pokemon,
  PokemonType,
};
