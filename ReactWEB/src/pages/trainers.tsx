import React from "react";
import { Paper, Stack } from "@mui/material";
import EntityTable from "../component/EntityTable";

const Trainers = () => {
  return (
    <Stack spacing={2}>
      <Paper elevation={3} sx={{ px: 2, py: 1 }}>
        <h1>Trainers</h1>
        <p>Check on your friends!</p>
      </Paper>

      <Paper elevation={3} sx={{ padding: 1 }}>
        <EntityTable entityType="trainers" />
      </Paper>
    </Stack>
  );
};

export default Trainers;
