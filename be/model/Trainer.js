class Trainer {
  constructor(id, name, email, password, createdAt, deletedAt, pokemon = []) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.deletedAt = deletedAt;
    this.pokemon = pokemon;
  }

  static fromDatabase(entry) {
    return new Trainer(
      entry.id,
      entry.name,
      entry.email,
      entry.password,
      entry.createdAt,
      entry.deletedAt || null,
      entry.pokemon || [],
    );
  }

  static toJSON(lazy = false) {
    return (entry) => {
      if (lazy) {
        entry.pokemon = entry.pokemon.map((pokemon) => pokemon.id);
      }

      return entry;
    };
  }
}

module.exports = {
  Trainer,
};
