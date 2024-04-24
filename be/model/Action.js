class Action {
  constructor(id, name, type, description, damage, createdAt) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.description = description;
    this.damage = damage;
    this.createdAt = createdAt;
  }

  static fromDatabase(entry) {
    return new Action(
      entry.id,
      entry.name,
      ActionType[entry.type.toUpperCase()],
      entry.description,
      entry.damage,
      entry.createdAt,
    );
  }

  static toJSON(lazy = false) {
    return (action) => {
      return action;
    };
  }
}

const ActionType = {
  ATTACK: 1,
  DEFEND: 2,
  HEAL: 3,
};

module.exports = {
  Action,
  ActionType,
};
