import { Paper, Stack } from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";

export default function FooterComponent() {
  return (
    <Paper elevation={3} sx={{ my: 2, px: 2, py: 1 }}>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 6">
          <p>© {new Date().getFullYear()} - ExpressReactPokédex</p>
        </Box>

        <Box gridColumn="span 6">
          <p style={{ textAlign: "right" }}>
            Created by <span style={{color: "#FF9800"}}>Pavel Mikula</span> and <span style={{color: "#FF9800"}}>Miroslav Osoba</span>
          </p>
        </Box>
      </Box>
    </Paper>
  );
}
