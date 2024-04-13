import { Paper, Stack } from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

export default function FooterComponent() {
  return (
    <Paper elevation={3} sx={{ my: 2, px: 2, py: 1 }}>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 6">
          <p>© {new Date().getFullYear()} - ExpressReactPokédex</p>
        </Box>

        <Box gridColumn="span 6">
          <p style={{ textAlign: "right" }}>
            Created by <Link style={{color: "#FF9800"}} to={`https://github.com/Firestone82`}>Pavel Mikula</Link> and <Link style={{color: "#FF9800"}} to={`https://www.reddit.com/media?url=https%3A%2F%2Fpreview.redd.it%2F440drolcwv761.jpg%3Fauto%3Dwebp%26s%3De258232f96b2b40108a5f29a8868c72ad8965b43`}>Miroslav Osoba</Link>
          </p>
        </Box>
      </Box>
    </Paper>
  );
}
