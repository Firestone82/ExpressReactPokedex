import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const MainPage = () => {
  const features = [
    {
      title: "Pokémon Database",
      description:
        "Access a comprehensive database of Pokémon with details on stats, abilities, and more.",
    },
    {
      title: "Trainer Hub",
      description: "Manage and view profiles of top Pokémon trainers.",
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          padding: 8,
          textAlign: "center",
        }}
      >
        <Typography variant="h2" gutterBottom>
          Explore the World of Pokémon
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ marginBottom: 4 }}>
          Discover your favorite Pokémon and trainers!
        </Typography>
        <Button
          variant="contained"
          color="warning"
          size="large"
          component={NavLink}
          to="/pokemon"
        >
          Get Started
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ padding: 1 }} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item key={index}>
            <Card raised>
              <CardContent>
                <Typography variant="h5" component="div">
                  {feature.title}
                </Typography>
                <Typography variant="body2">{feature.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MainPage;
