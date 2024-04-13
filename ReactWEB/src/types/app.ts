export let api = "http://localhost:3000";

export type Pokemon = {
  id: number;
  name: string;
  type: string;
  description: string;
  actions: [];
  trainer: number;
  weight: number;
  height: number;
};

export enum PokemonType {
  FIRE = "Fire",
  WATER = "Water",
  ELECTRIC = "Electric",
  GRASS = "Grass",
  DRAGON = "Dragon",
  FIGTHING = "Fighting",
  GROUND = "Ground",
  PSYCHIC = "Psychic",
  ROCK = "Rock",
  ICE = "Ice",
  BUG = "Bug",
  GHOST = "Ghost",
  DARK = "Dark",
  STEEL = "Steel",
  FAIRY = "Fairy",
  NORMAL = "Normal",
}

export type Trainer = {
  id: number;
  name: string;
  email: string;
  pokemon: number[];
};

export type Entity = Trainer | Pokemon;