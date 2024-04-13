import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  FormControl,
  InputLabel,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Pokemon, PokemonType, api } from "../../types/app";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

function PokemonForm(props: {
  openState: boolean;
  setStateFunc: Function;
  tableReloadFunc: Function;
  pokemon: Pokemon;
}) {
  // If pokemon empty, create a new one
  let pokemon = props.pokemon;
  if (!pokemon.id) {
    console.log("Creating a new Pokémon");

    pokemon = {
      id: 0,
      name: "",
      type: "",
      description: "",
      trainer: 0,
      weight: 0,
      height: 0,
    };
  }

  const [name, setName] = useState(pokemon.name || "");
  const [type, setType] = useState((pokemon.type as PokemonType) || "");
  const [description, setDescription] = useState(pokemon.description || "");
  const [trainer, setTrainer] = useState(pokemon.trainer || "");
  const [weight, setWeight] = useState(pokemon.weight || "");
  const [height, setHeight] = useState(pokemon.height || "");

  const handleClosing = () => {
    props.setStateFunc(false);
  };

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const pokemonID = props.pokemon ? props.pokemon.id : 0;
    const newPokemon = {
      id: pokemonID,
      name: name,
      type: type,
      description: description,
      trainer: trainer,
      weight: weight,
      height: height,
    };

    const method = pokemonID == undefined ? "post" : "put";
    const urlEdit = `${api}/pokemon/${pokemonID}`;
    const urlCreate = `${api}/pokemon`;

    axios({
      method: method,
      url: pokemonID == undefined ? urlCreate : urlEdit,
      data: newPokemon,
    })
      .then((response) => {
        const status = response.status;

        if (status === 201 || status === 200) {
          props.tableReloadFunc();
          props.setStateFunc(false);
          enqueueSnackbar(
            `Pokémon ${pokemonID == 0 ? "created" : "edited"} successfully!`,
            {
              variant: "success",
              autoHideDuration: 1500,
              anchorOrigin: { vertical: "top", horizontal: "right" },
            },
          );
        } else {
          enqueueSnackbar(
            `Error ${pokemonID == 0 ? "creating" : "editing"} Pokémon!`,
            {
              variant: "error",
              autoHideDuration: 1500,
              anchorOrigin: { vertical: "top", horizontal: "right" },
            },
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <Dialog open={props.openState} onClose={() => handleClosing()}>
      <Box sx={{ padding: 1 }}>
        {pokemon.id === 0 ? (
          <h1>Creating new Pokémon</h1>
        ) : (
          <h1>Editing Pokémon #{pokemon.id}</h1>
        )}

        <form
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          style={{ marginTop: 20 }}
        >
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Pokémon Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              fullWidth
              required
            />

            <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Pokémon Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={type}
                onChange={(e) => setType(e.target.value as PokemonType)}
                label="Pokémon Type"
                required
              >
                <MenuItem
                  value=""
                  disabled={true}
                  hidden={true}
                  selected={true}
                >
                  <em>None</em>
                </MenuItem>
                {Object.values(PokemonType).map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Pokémon Heigth"
              onChange={(e) => setHeight(parseFloat(e.target.value))}
              value={height}
              required
            />

            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Pokémon Weight"
              onChange={(e) => setWeight(parseFloat(e.target.value))}
              value={weight}
              required
            />

            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Pokémon Trainer"
              onChange={(e) => setTrainer(parseFloat(e.target.value))}
              value={trainer}
              required
            />
          </Stack>

          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Pokémon Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            multiline
            rows={4}
            fullWidth
            sx={{ marginBottom: 4 }}
          />

          <Stack spacing={2} direction="row" sx={{ float: "right" }}>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleClosing()}
            >
              Cancel
            </Button>

            <Button variant="contained" color="success" type="submit">
              {pokemon.id === 0 ? "Create" : "Update"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Dialog>
  );
}
export default PokemonForm;
