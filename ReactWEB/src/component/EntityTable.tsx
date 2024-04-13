import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import { Pokemon, Trainer, Entity, api } from "../types/app";
import axios from "axios";
import { Stack, TableRow } from "@mui/material";
import { useSnackbar } from "notistack";
import Button from "@mui/material/Button";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import EntityPagination from "./EntityPagination";
import PokemonTableRow from "./pokemon/PokemonTableRow";
import PokemonTableHeader from "./pokemon/PokemonTableHeader";
import PokemonForm from "./pokemon/PokemonForm";
import PokemonInfo from "./pokemon/PokemonInfo";
import TrainersTableRow from "./trainers/TrainersTableRow";
import TrainersTableHeader from "./trainers/TrainersTableHeader";

async function requestAPI(entityType: string, page: number, rowsPerPage: number) {
  if (rowsPerPage == -1) {
    rowsPerPage = 1000; // Quick fix for getting all rows.
  }

  return axios
    .get(
      `${api}/${entityType}?page=${page}&limit=${rowsPerPage}&lazy=true`,
    )
    .then((response) => {
      return response.data;
    });
}

export default function EntityTable(props:{entityType: string}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([] as Entity[]);
  const [totalRows, setTotalRows] = React.useState(0);
  const [editFormOpen, setEditFormOpen] = React.useState(false);
  const [infoFormOpen, setInfoFormOpen] = React.useState(false);
  const [entity, setEntity] = React.useState({} as Entity);
  const { enqueueSnackbar } = useSnackbar();

  // Fetch data from the server.
  React.useEffect(() => {
    requestAPI(props.entityType, page * rowsPerPage, rowsPerPage).then(data => {
      setRows(data.entries as Entity[]);
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

    requestAPI(props.entityType, newPage * rowsPerPage, rowsPerPage).then(data => {
      setRows(data.entries as Entity[]);
      setTotalRows(data.pagination.total);
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);

    requestAPI(props.entityType, page, newRowsPerPage).then(data => {
      setRows(data.entries as Entity[]);
      setTotalRows(data.pagination.total);
    });
  };

  const handleDeleteButtonClick = (id: number) => {
    axios.delete(`${api}/${props.entityType}/${id}`).then((response) => {
      const status = response.status;

      if (status === 200) {
        requestAPI(props.entityType, page, rowsPerPage).then(data => {
          setRows(data.entries as Entity[]);
          setTotalRows(data.pagination.total);
        });

        enqueueSnackbar("Deleted successfully!", {
          variant: "error",
          autoHideDuration: 1500,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      } else {
        enqueueSnackbar("Failed to delete!", {
          variant: "error",
          autoHideDuration: 1500,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    });
  };

  const handleEditButtonClick = (id: number) => {
    console.log("Edit button clicked for id:", id);
    setEntity(rows.filter((row) => row.id === id)[0]);
    setEditFormOpen(true);
  };

  const handleInfoButtonClick = (id: number) => {
    console.log("Info button clicked for id:", id);
    setEntity(rows.filter((row) => row.id === id)[0]);
    setInfoFormOpen(true);
  }

  const handleCreateNewButtonClick = () => {
    console.log("Create new button clicked");
    setEntity({} as Entity);
    setEditFormOpen(true);
  };

  const handleExportButtonClick = () => {
    console.log("Export button clicked");

    requestAPI(props.entityType, 0, -1).then(data => {
        const rows = data.entries as Entity[];
        const jsonContent = "data:text/json;charset=utf-8," + JSON.stringify(rows, null, 2);
        const encodedUri = encodeURI(jsonContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${props.entityType}.json`);
        document.body.appendChild(link);
        link.click();
    });
  }

  const handleFormSubmitFinish = () => {
    requestAPI(props.entityType, page, rowsPerPage).then((data) => {
      setTotalRows(data.pagination.total);
      setRows(data.entries as Entity[]);
    });
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{ float: "right", marginBottom: 2, marginTop: 1 }}
      >
        <Button
            variant="outlined"
            endIcon={<SystemUpdateAltIcon />}
            onClick={handleExportButtonClick}
        >
          Export
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
          {props.entityType === "pokemon" ? (
            <PokemonTableHeader />
          ) : (
            <TrainersTableHeader />
          )}
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              props.entityType === "pokemon" ? (
                <PokemonTableRow
                  key={row.name}
                  row={row as Pokemon}
                  onInfo={handleInfoButtonClick}
                  onEdit={handleEditButtonClick}
                  onDelete={handleDeleteButtonClick}
                />
              ) : (
                <TrainersTableRow
                  key={row.name}
                  row={row as Trainer}
                />
              )
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 73 * emptyRows }}>
                <td colSpan={8} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <EntityPagination
                count={totalRows}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {infoFormOpen && (
        <PokemonInfo
          openState={infoFormOpen}
          setStateFunc={setInfoFormOpen}
          pokemon={entity as Pokemon}
        />
      )}
      {editFormOpen && (
        <PokemonForm
          openState={editFormOpen}
          setStateFunc={setEditFormOpen}
          pokemon={entity as Pokemon}
          tableReloadFunc={handleFormSubmitFinish}
        />
      )}
    </>
  );
}
