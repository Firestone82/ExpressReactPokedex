import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack } from "@mui/material";

export default function PokemonTableRow({
  row,
  onEdit,
  onDelete,
}: {
  row: any;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <TableRow key={row.id}>
      <TableCell component="th" scope="row">
        {row.id}
      </TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.type}</TableCell>
      <TableCell>{row.description}</TableCell>
      <TableCell align="center">{row.height}</TableCell>
      <TableCell align="center">{row.weight}</TableCell>
      <TableCell align="center">{row.trainer}</TableCell>
      <TableCell align="center">
        <Stack direction="row" spacing={1}>
          <IconButton
            aria-label="edit"
            sx={{ color: "primary.main" }}
            onClick={() => onEdit(row.id)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            sx={{ color: "error.main" }}
            onClick={() => onDelete(row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );
}
