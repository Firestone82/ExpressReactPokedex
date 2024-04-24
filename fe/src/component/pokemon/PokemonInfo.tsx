import React, { useEffect, useState } from "react";
import { Action, api, Pokemon } from "../../types/app";
import { Box, Button, Dialog, Divider, Stack, TextField } from "@mui/material";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PokemonImage from "./PokemonImage";

export default function PokemonInfo(props: {
  openState: boolean;
  setStateFunc: Function;
  pokemon: Pokemon;
}) {
  const handleClosing = () => {
    props.setStateFunc(false);
  };

  const [trainer, setTrainer] = useState("Not caught");
  const [actions, setActions] = useState([] as Action[]);

  if (props.pokemon.trainer) {
    fetch(`${api}/trainers/${props.pokemon.trainer}`)
      .then((response) => response.json())
      .then((data) => {
        setTrainer(data.name);
      });
  }

  useEffect(() => {
    const actionList = props.pokemon.actions;

    const promises = actionList.map((actionID) =>
      axios.get(`${api}/actions/${actionID}`).then((response) => response.data),
    );

    Promise.all(promises).then((data) => {
      setActions(data);
    });
  });

  return (
    <Dialog
      open={props.openState}
      onClose={() => handleClosing()}
      maxWidth={"md"}
    >
      <Stack spacing={1} direction="row">
        <Box sx={{ padding: 2 }}>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 2 }}>
            <Stack spacing={2} direction="column" sx={{ marginBottom: 2 }}>
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
              <Stack spacing={2} direction="row" sx={{ marginBottom: 2 }}>
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
            <PokemonImage name={props.pokemon.name} isSprite={false} />
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
            sx={{ marginBottom: 2 }}
          />
          <TextField label="Trainer" value={trainer} disabled fullWidth />
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box sx={{ padding: 1 }}>
          <h3 style={{ marginBottom: 10 }}>Actions</h3>
          {actions.map((action) => (
            <Accordion key={action.id} sx={{ maxWidth: 500 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`action${action.id}-content`}
                id={`action${action.id}-header`}
              >
                <Typography>{action.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">Damage: {action.damage}</Typography>
                <Typography variant="body2">Type: {action.type}</Typography>
                <Typography variant="body2">
                  Description: {action.description}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
          {actions.length === 0 && (
            <Accordion disabled>
              <AccordionSummary
                aria-controls="no-actions-content"
                id="no-actions-header"
                sx={{ minWidth: 300 }}
              >
                <Typography>No actions</Typography>
              </AccordionSummary>
            </Accordion>
          )}
        </Box>
      </Stack>

      <Box sx={{ padding: 1 }}>
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
