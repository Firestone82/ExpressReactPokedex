import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import { Pokemon, api } from "../../types/app";
import axios from "axios";
import { Stack, TableRow } from "@mui/material";
import { useSnackbar } from "notistack";
import PokemonForm from "./PokemonForm";
import Button from "@mui/material/Button";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import PokemonTableRow from "./PokemonTableRow";
import PokemonTableHeader from "./PokemonTableHeader";
import PokemonPagination from "./PokemonPagination";

async function requestAPI(page: number, rowsPerPage: number) {
  return axios
    .get(
      `${api}/pokemons?page=${page}&limit=${rowsPerPage}&lazy=true`,
    )
    .then((response) => {
      return response.data;
    });
}

export default function PokemonTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([] as Pokemon[]);
  const [totalRows, setTotalRows] = React.useState(0);
  const [editFormOpen, setEditFormOpen] = React.useState(false);
  const [pokemon, setPokemon] = React.useState({} as Pokemon);
  const { enqueueSnackbar } = useSnackbar();

  // Fetch data from the server.
  React.useEffect(() => {
    requestAPI(page * rowsPerPage, rowsPerPage).then(data => {
      setRows(data.entries as Pokemon[]);
      setTotalRows(data.pagination.total);
    });
  }, []);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);

    requestAPI(newPage * rowsPerPage, rowsPerPage).then(data => {
      setRows(data.entries as Pokemon[]);
      setTotalRows(data.pagination.total);
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);

    requestAPI(page, newRowsPerPage).then(data => {
      setRows(data.entries as Pokemon[]);
      setTotalRows(data.pagination.total);
    });
  };

  const handleDeleteButtonClick = (id: number) => {
    axios.delete(`${api}/pokemons/${id}`).then((response) => {
      const status = response.status;

      if (status === 200) {
        requestAPI(page, rowsPerPage).then(data => {
          setRows(data.entries as Pokemon[]);
          setTotalRows(data.pagination.total);
        });

        enqueueSnackbar("Pokémon deleted successfully!", {
          variant: "error",
          autoHideDuration: 1500,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      } else {
        enqueueSnackbar("Failed to delete Pokémon!", {
          variant: "error",
          autoHideDuration: 1500,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    });
  };

  const handleEditButtonClick = (id: number) => {
    console.log("Edit button clicked for id:", id);
    setPokemon(rows.filter((row) => row.id === id)[0]);
    setEditFormOpen(true);
  };

  const handleCreateNewButtonClick = () => {
    console.log("Create new button clicked");
    setPokemon({} as Pokemon);
    setEditFormOpen(true);
  };

  const handleFormSubmitFinish = () => {
    requestAPI(page, rowsPerPage).then((data) => {
      setTotalRows(data.pagination.total);
      setRows(data.entries as Pokemon[]);
    });
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{ float: "right", marginBottom: 2, marginTop: 1 }}
      >
        <Button variant="outlined" endIcon={<SystemUpdateAltIcon />}>
          {" "}
          Export{" "}
        </Button>
        <Button
          variant="contained"
          color={"success"}
          endIcon={<CatchingPokemonIcon />}
          onClick={handleCreateNewButtonClick}
        >
          {" "}
          Create New{" "}
        </Button>
      </Stack>

      <TableContainer>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <PokemonTableHeader />
          <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
              <PokemonTableRow
                key={row.name}
                row={row}
                onEdit={handleEditButtonClick}
                onDelete={handleDeleteButtonClick}
              />
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 73 * emptyRows }}>
                <td colSpan={8} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <PokemonPagination
              count={totalRows}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableFooter>
        </Table>
      </TableContainer>
      {editFormOpen && (
        <PokemonForm
          openState={editFormOpen}
          setStateFunc={setEditFormOpen}
          pokemon={pokemon}
          tableReloadFunc={handleFormSubmitFinish}
        />
      )}
    </>
  );
}
