import React from "react";
import { Pokemon, api } from "../../types/app";
import { Box, Button, Dialog, Stack, TextField } from "@mui/material";

export default function PokemonInfo(props: {
  openState: boolean;
  setStateFunc: Function;
  pokemon: Pokemon;
}) {
  const handleClosing = () => {
    props.setStateFunc(false);
  };

  const [trainer, setTrainer] = React.useState("Not caught");

  if (props.pokemon.trainer) {
    fetch(`${api}/trainers/${props.pokemon.trainer}`)
      .then((response) => response.json())
      .then((data) => {
        setTrainer(data.name);
      });
  }

  return (
    <Dialog open={props.openState} onClose={() => handleClosing()}>
      <Box sx={{ padding: 1 }}>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <Stack spacing={2} direction="column" sx={{ marginBottom: 4 }}>
            <TextField
              label="Name"
              value={props.pokemon.name}
              disabled
              fullWidth
            />
            <TextField
              label="Type"
              value={props.pokemon.type}
              disabled
              fullWidth
            />
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                label="Height"
                value={props.pokemon.height}
                disabled
                fullWidth
              />
              <TextField
                label="Weight"
                value={props.pokemon.weight}
                disabled
                fullWidth
              />
            </Stack>
          </Stack>
          <img src={`https://img.pokemondb.net/artwork/${props.pokemon.name.toLowerCase()}.jpg`} alt={props.pokemon.name} style={{ height: "200px", width: "auto" }} />
        </Stack>
        <TextField
          variant="outlined"
          color="secondary"
          label="Description"
          value={props.pokemon.description}
          disabled
          fullWidth
          multiline
          rows={4}
          sx={{ marginBottom: 4 }}
        />
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            label="Trainer"
            value={trainer}
            disabled
            fullWidth
          />
        </Stack>
        <Stack spacing={2} direction="row" sx={{ float: "right" }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleClosing()}
          >
            Close
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
}