import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Link, Stack } from "@mui/material";
import { api } from "../../types/app";
import PokemonInfo from "../pokemon/PokemonInfo";

export default function TrainersTableRow({
  row,
  onPokemonInfo,
}: {
  row: any;
  onPokemonInfo: (id: number) => void;
}) {
  return (
    <TableRow key={row.id}>
      <TableCell component="th" scope="row">
        {row.id}
      </TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.email}</TableCell>
      <TableCell align="center" style={{ paddingRight: '8px' }}>
        {row.pokemon.map((pok: any, pokIndex: number) => (
          <React.Fragment key={pok}>
            <Link onClick={() => onPokemonInfo(pok)} sx={{ cursor: "pointer" }}>
              {pok}
            </Link>
            {pokIndex < row.pokemon.length - 1 ? ", " : ""}
          </React.Fragment>
        ))}
      </TableCell>
    </TableRow>
  );
}