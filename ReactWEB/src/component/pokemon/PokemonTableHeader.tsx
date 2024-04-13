import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";

export default function PokemonTableHeader() {
  return (
    <TableHead className={"tableHeader"}>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Type</TableCell>
        <TableCell>Description</TableCell>
        <TableCell align="center">Height&nbsp;(m)</TableCell>
        <TableCell align="center">Weight&nbsp;(kg)</TableCell>
        <TableCell align="center">Trainer&nbsp;ID</TableCell>
        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}
