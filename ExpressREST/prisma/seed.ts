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
        connect: {
          id: 1,
        },
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
      trainerId: 2,
      actions: {
        connect: {
          id: 2,
        },
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
        connect: {
          id: 3,
        },
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
      trainerId: 4,
      actions: {
        connect: {
          id: 4,
        },
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
        connect: {
          id: 5,
        },
      },
    },
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
