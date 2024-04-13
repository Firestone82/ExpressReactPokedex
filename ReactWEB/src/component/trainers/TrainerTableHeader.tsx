import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";

export default function TrainerTableHeader() {
  return (
    <TableHead className={"tableHeader"}>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Name</TableCell>
      </TableRow>
    </TableHead>
  );
}