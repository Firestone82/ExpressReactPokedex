import React from "react";
import { DataGrid, GridActionsCellItem, GridColDef, GridEventListener, GridRowEditStopReasons, GridRowId, GridRowModel, GridRowModes, GridRowModesModel, GridRowsProp, GridSlots, GridToolbarContainer } from "@mui/x-data-grid";
import { Box, Button, ButtonGroup, Dialog, FormControl, FormHelperText, Input, InputLabel, OutlinedInput, TextField } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

import { Pokemon } from "../../types/app";

function handleEditClick(id: GridRowId) {
  
}

function handleDeleteClick(id: GridRowId) {
  
}

function BasicTable(props: { rows: Pokemon[] }) {
  console.log(props.rows);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Type</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="center">Height</TableCell>
            <TableCell align="center">Weight</TableCell>
            <TableCell align="center">ActionsID</TableCell>
            <TableCell align="center">TrainerID</TableCell>
            <TableCell align="center">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.id}</TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.type}</TableCell>
              <TableCell align="left">{row.description}</TableCell>
              <TableCell align="center">{row.height}</TableCell>
              <TableCell align="center">{row.weight}</TableCell>
              <TableCell align="center">{row.actions}</TableCell>
              <TableCell align="center">{row.trainer}</TableCell>
              <TableCell align="center">
                <ButtonGroup>
                  <Button startIcon={<EditIcon />} onClick={() => handleEditClick(row.id)}></Button>
                  <Button startIcon={<DeleteIcon />} onClick={() => handleDeleteClick(row.id)}></Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function PokemonTable() {
  let columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "type",
      headerName: "Type",
      width: 150,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Bug", "Dark", "Dragon", "Electric", "Fairy", "Fighting", "Fire", "Flying", "Ghost", "Grass", "Ground", "Ice", "Normal", "Poison", "Psychic", "Rock", "Steel", "Water"],
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      editable: true,
    },
    {
      field: "height",
      headerName: "Height",
      width: 75,
      editable: true,
    },
    {
      field: "weight",
      headerName: "Weight",
      width: 75,
      editable: true,
    },
    {
      field: "actions",
      headerName: "ActionsID",
      width: 75,
      editable: true,
    },
    {
      field: "trainer",
      headerName: "TrainerID",
      width: 75,
      editable: true,
    },
    {
      field: 'options',
      type: 'actions',
      headerName: 'Options',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  let initData: GridRowsProp = [];
  const [rows, setRows] = React.useState(initData);
  const [open, setOpen] = React.useState(false);

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
    fetch(`http://localhost:3000/pokemons/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleEditClick = (id: GridRowId) => () => {
    setOpen(true);
  }

  React.useEffect(() => {
    fetch("http://localhost:3000/pokemons?lazy=true")
      .then((response) => response.json())
      .then((data) => {
        setRows(data.entries);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  /*
  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    let data = tmpRows.find((row) => row.id === id);
    console.log(data);
    fetch(`http://localhost:3000/pokemons/${id}`, {method: "PUT", body: JSON.stringify(data)})
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  */

  return (
    <>
      <Box sx={{
          height: 500,
          width: '100%',
          '& .actions': {
            color: 'text.secondary',
          },
          '& .textPrimary': {
            color: 'text.primary',
          },
        }}
      >
        <BasicTable rows={rows.map(row => row as Pokemon)} />
      </Box>
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
    </>
  );
}