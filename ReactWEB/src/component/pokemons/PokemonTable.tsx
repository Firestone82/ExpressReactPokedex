import React from "react";
import { DataGrid, GridActionsCellItem, GridColDef, GridEventListener, GridRowEditStopReasons, GridRowId, GridRowModel, GridRowModes, GridRowModesModel, GridRowsProp, GridSlots, GridToolbarContainer } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

import { Pokemon } from "../../types/app";
/*
const PokemonTable = () => {
  let columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "type",
      headerName: "Type",
      width: 150,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "ActionsID",
      width: 75,
    },
    {
      field: "trainer",
      headerName: "TrainerID",
      width: 75,
    }
  ];

  const [rows, setData] = React.useState([]);
  
  React.useEffect(() => {
    fetch("http://localhost:3000/pokemons?lazy=true")
      .then((response) => response.json())
      .then((data) => {
        setData(data.entries);
        console.log(data.entries);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default PokemonTable;
*/

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = 0;
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
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
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
  
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
  
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
  
  let rows: GridRowsProp = [];
  
  const [tmpRows, setRows] = React.useState(rows);

  React.useEffect(() => {
    fetch("http://localhost:3000/pokemons?lazy=true")
      .then((response) => response.json())
      .then((data) => {
        setRows(data.entries);
        console.log(data.entries);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

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

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(tmpRows.filter((row) => row.id !== id));
    fetch(`http://localhost:3000/pokemons/${id}`, {method: "DELETE"})
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = tmpRows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(tmpRows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(tmpRows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  return (
    <Box
      sx={{
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
      <DataGrid
        rows={tmpRows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar as GridSlots['toolbar'],
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}