import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";

export default function TrainersTableHeader() {
  return (
    <TableHead className={"tableHeader"}>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Email</TableCell>
        <TableCell align="center">Pokémon&nbsp;ID</TableCell>
      </TableRow>
    </TableHead>
  );
}