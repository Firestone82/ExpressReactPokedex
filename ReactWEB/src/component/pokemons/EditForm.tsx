import React from "react";
import { Dialog, Box, InputLabel, OutlinedInput, TextField, FormControl, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { Pokemon } from "../../types/app";

function EditForm(open: boolean, data: Pokemon) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Box>
        <h1>Edit Pokemon</h1>
        <form>
          <FormControl>
            <InputLabel htmlFor="component-outlined">Name</InputLabel>
            <OutlinedInput
              id="component-outlined"
              defaultValue="Composed TextField"
              label="Name"
            />
          </FormControl>
          <TextField
            id="filled-multiline-static"
            label="Multiline"
            multiline
            rows={4}
            defaultValue="Default Value"
            variant="filled"
          />
          <Button variant="contained" color="primary" startIcon={<SaveIcon />} type="submit">Save</Button>
          <Button variant="contained" color="secondary" startIcon={<CancelIcon />} type="button" onClick={() => setOpen(false)}>Cancel</Button>
        </form>
      </Box>
    </Dialog>
  );
};

export default EditForm;