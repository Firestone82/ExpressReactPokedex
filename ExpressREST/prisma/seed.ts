import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const actions = [
    {
      id: 1,
      name: "Thunderbolt",
      type: "Electric",
      description:
        "A strong electric attack that may also leave the target with paralysis.",
      damage: 90,
      createdAt: "2024-03-21T00:00:00Z",
    },
    {
      id: 2,
      name: "Flamethrower",
      type: "Fire",
      description:
        "A powerful fire attack that may also inflict a burn on the target.",
      damage: 90,
      createdAt: "2024-03-21T00:00:00Z",
    },
    {
      id: 3,
      name: "Hydro Pump",
      type: "Water",
      description:
        "Shoots water at high pressure to strike the target. High power but may miss.",
      damage: 110,
      createdAt: "2024-03-21T00:00:00Z",
    },
    {
      id: 4,
      name: "Solar Beam",
      type: "Grass",
      description:
        "A two-turn attack. The user gathers light, then blasts a bundled beam on the next turn.",
      damage: 120,
      createdAt: "2024-03-21T00:00:00Z",
    },
    {
      id: 5,
      name: "Aura Sphere",
      type: "Fighting",
      description:
        "Lucario reads its opponent's feelings with its aura waves. It fires off balls of energy, which are powerful enough to pulverize huge rocks.",
      damage: 80,
      createdAt: "2024-03-21T00:00:00Z",
    },
    {
      id: 6,
      name: "Quick Attack",
      type: "Normal",
      description:
        "The user lunges at the target at a speed that makes it almost invisible. This move always goes first.",
      damage: 40,
      createdAt: "2024-03-21T00:00:00Z",
    },
    {
      id: 7,
      name: "Iron Tail",
      type: "Steel",
      description:
        "The target is slammed with a steel-hard tail. This may also lower the target's Defense stat.",
      damage: 100,
      createdAt: "2024-03-21T00:00:00Z",
    },
    {
      id: 8,
      name: "Dragon Claw",
      type: "Dragon",
      description:
        "The user slashes the target with huge, sharp claws.",
      damage: 80,
      createdAt: "2024-03-21T00:00:00Z",
    },
    {
      id: 9,
      name: "Fire Spin",
      type: "Fire",
      description:
        "The target becomes trapped within a fierce vortex of fire that rages for four to five turns.",
      damage: 35,
      createdAt: "2024-03-21T00:00:00Z",
    },
    {
      id: 10,
      name: "Vine Whip",
      type: "Grass",
      description:
        "The target is struck with slender, whiplike vines to inflict damage.",
      damage: 45,
      createdAt: "2024-03-21T00:00:00Z",
    },
    {
      id: 11,
      name: "Seed Bomb",
      type: "Grass",
      description:
        "The user slams a barrage of hard-shelled seeds down on the target from above.",
      damage: 80,
      createdAt: "2024-03-21T00:00:00Z",
    },
    {
      id: 12,
      name: "Water Gun",
      type: "Water",
      description:
        "The target is blasted with a forceful shot of water.",
      damage: 40,
      createdAt: "2024-03-21T00:00:00Z",
    },
    {
      id: 13,
      name: "Aqua Tail",
      type: "Water",
      description:
        "The user attacks by swinging its tail as if it were a vicious wave in a raging storm.",
      damage: 90,
      createdAt: "2024-03-21T00:00:00Z",
    },
    {
      id: 14,
      name: "Close Combat",
      type: "Fighting",
      description:
        "The user fights the target up close without guarding itself. It also cuts the user's Defense and Sp. Def.",
      damage: 120,
      createdAt: "2024-03-21T00:00:00Z",
    },
    {
      id: 15,
      name: "Extreme Speed",
      type: "Normal",
      description:
        "The user charges the target at blinding speed. This move always goes first.",
      damage: 80,
      createdAt: "2024-03-21T00:00:00Z",
    },
    {
      id: 16,
      name: "Petal Blizzard",
      type: "Grass",
      description:
        "The user stirs up a violent petal blizzard and attacks everything around it.",
      damage: 90,
      createdAt: "2024-03-21T00:00:00Z",
    },
    {
      id: 17,
      name: "Sludge Bomb",
      type: "Poison",
      description:
        "Unsanitary sludge is hurled at the target. It may also poison the target.",
      damage: 90,
      createdAt: "2024-03-21T00:00:00Z",
    },
    {
      id: 18,
      name: "Growl",
      type: "Normal",
      description:
        "The user growls in an endearing way, making opposing Pokémon less wary. This lowers their Attack stat.",
      damage: 0,
      createdAt: "2024-03-21T00:00:00Z",
    }
  ];

  const trainers = [
    {
      id: 1,
      name: "Ash Ketchum",
      email: "ash.ketchum@example.com",
      password: "securePassword123",
      createdAt: "2024-03-21T00:00:00Z",
      deletedAt: null,
    },
    {
      id: 2,
      name: "Misty Waterflower",
      email: "misty.waterflower@example.com",
      password: "waterPokeMaster456",
      createdAt: "2024-03-21T00:00:00Z",
      deletedAt: null,
    },
    {
      id: 3,
      name: "Brock Slate",
      email: "brock.slate@example.com",
      password: "rockSolidDefender789",
      createdAt: "2024-03-21T00:00:00Z",
      deletedAt: null,
    },
    {
      id: 4,
      name: "Serena Yvonne",
      email: "serena.yvonne@example.com",
      password: "kalosQueen1010",
      createdAt: "2024-03-21T00:00:00Z",
      deletedAt: null,
    },
  ];

  const pokemon = [
    {
      id: 1,
      name: "Pikachu",
      type: "Electric",
      description:
        "Pikachu, an Electric-type Pokémon, is known for its ability to generate powerful electric shocks. It's friendly and easily recognizable by its yellow fur and lightning-shaped tail.",
      weight: 6.0,
      height: 0.4,
      createdAt: "2024-03-21T00:00:00Z",
      trainerId: 1,
      actions: {
        connect: [
          { id: 1 },
          { id: 6 },
          { id: 7 },
        ],
      },
    },
    {
      id: 2,
      name: "Charizard",
      type: "Fire",
      description:
        "Charizard flies around the sky in search of powerful opponents. It breathes fire of such great heat that it melts anything. However, it never turns its fiery breath on any opponent weaker than itself.",
      weight: 90.5,
      height: 1.7,
      createdAt: "2024-03-21T00:00:00Z",
      trainerId: 4,
      actions: {
        connect: [
          { id: 2 },
          { id: 8 },
          { id: 9 },
          { id: 18 },
        ],
      },
    },
    {
      id: 3,
      name: "Bulbasaur",
      type: "Grass",
      description:
        "A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.",
      weight: 6.9,
      height: 0.7,
      createdAt: "2024-03-21T00:00:00Z",
      trainerId: 3,
      actions: {
        connect: [
          { id: 4 },
          { id: 10 },
          { id: 11 },
          { id: 18 },
        ],
      },
    },
    {
      id: 4,
      name: "Squirtle",
      type: "Water",
      description:
        "Squirtle's shell is not merely used for protection. The shell's rounded shape and the grooves on its surface help minimize resistance in water, enabling this Pokémon to swim at high speeds.",
      weight: 9.0,
      height: 0.5,
      createdAt: "2024-03-21T00:00:00Z",
      trainerId: 2,
      actions: {
        connect: [
          { id: 3 },
          { id: 12 },
          { id: 13 },
        ],
      },
    },
    {
      id: 5,
      name: "Lucario",
      type: "Fighting",
      description:
        "It has the ability to sense the Auras of all things. It understands human speech.",
      weight: 54.0,
      height: 1.2,
      createdAt: "2024-03-21T00:00:00Z",
      trainerId: null,
      actions: {
        connect: [
          { id: 5 },
          { id: 14 },
          { id: 15 },
        ],
      },
    },
    {
      id: 6,
      name: "Venusaur",
      type: "Grass",
      description:
        "There is a large flower on Venusaur's back. The flower is said to take on vivid colors if it gets plenty of nutrition and sunlight. The flower's aroma soothes the emotions of people.",
      weight: 100.0,
      height: 2.0,
      createdAt: "2024-03-21T00:00:00Z",
      trainerId: 3,
      actions: {
        connect: [
          { id: 4 },
          { id: 16 },
          { id: 17 },
        ],
      },
    },
    {
      id: 7,
      name: "Blastoise",
      type: "Water",
      description:
        "Blastoise has water spouts that protrude from its shell. The water spouts are very accurate. They can shoot bullets of water with enough accuracy to strike empty cans from a distance of over 160 feet.",
      weight: 85.5,
      height: 1.6,
      createdAt: "2024-03-21T00:00:00Z",
      trainerId: 2,
      actions: {
        connect: [
          { id: 3 },
          { id: 12 },
          { id: 13 },
        ],
      },
    },
    {
      id: 8,
      name: "Ivysaur",
      type: "Grass",
      description:
        "When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.",
      weight: 13.0,
      height: 1.0,
      createdAt: "2024-03-21T00:00:00Z",
      trainerId: 3,
      actions: {
        connect: [
          { id: 4 },
          { id: 10 },
          { id: 11 },
          { id: 18 },
        ],
      },
    },
    {
      id: 9,
      name: "Vaporeon",
      type: "Water",
      description:
        "Vaporeon underwent a spontaneous mutation and grew fins and gills that allow it to live underwater. This Pokémon has the ability to freely control water.",
      weight: 29.0,
      height: 1.0,
      createdAt: "2024-03-21T00:00:00Z",
      trainerId: 2,
      actions: {
        connect: [
          { id: 3 },
          { id: 12 },
          { id: 13 },
        ],
      },
    }
  ];

  for (const action of actions) {
    await prisma.action.create({
      data: action,
    });
  }

  for (const trainer of trainers) {
    await prisma.trainer.create({
      data: trainer,
    });
  }

  for (const pok of pokemon) {
    await prisma.pokemon.create({
      data: pok,
    });
  }

  console.log("Data seeded successfully");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
