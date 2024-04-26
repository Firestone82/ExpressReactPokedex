import React from "react";
import EntityTable from "../component/EntityTable";
import { Paper, Stack } from "@mui/material";

const Pokemon = () => {
  return (
    <Stack spacing={2}>
      <Paper elevation={3} sx={{ px: 2, py: 1 }}>
        <h1>Pokémon</h1>
        <p>Here are all your tracked Pokémon!</p>
      </Paper>

      <Paper elevation={3} sx={{ padding: 1 }}>
        <EntityTable entityType="pokemon" />
      </Paper>
    </Stack>
  );
};

export default Pokemon;
