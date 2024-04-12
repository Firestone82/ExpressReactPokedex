class Trainer {
  constructor(id, name, email, password, createdAt, deletedAt, pokemons = []) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.deletedAt = deletedAt;
    this.pokemons = pokemons;
  }

  static fromDatabase(entry) {
    return new Trainer(
      entry.id,
      entry.name,
      entry.email,
      entry.password,
      entry.createdAt,
      entry.deletedAt || null,
      entry.pokemons || [],
    );
  }

  static toJSON(lazy = false) {
    return (entry) => {
      if (lazy) {
        entry.pokemons = entry.pokemons.map((pokemon) => pokemon.id);
      }

      return entry;
    };
  }
}

module.exports = {
  Trainer,
};
