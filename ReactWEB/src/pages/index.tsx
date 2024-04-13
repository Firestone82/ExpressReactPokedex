import React from "react";
import { Paper, Stack } from "@mui/material";

const Index = () => {
  return (
    <Stack spacing={2}>
      <Paper elevation={3} sx={{ px: 2, py: 1 }}>
        <h1>Home</h1>
        <p>Welcome to the home page</p>
      </Paper>
    </Stack>
  );
};

export default Index;
