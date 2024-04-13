import React, { useEffect, useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Link } from "@mui/material";
import { api } from "../../types/app";
import PokemonImage from "../pokemon/PokemonImage";

export default function TrainersTableRow({
  row,
  onPokemonInfo,
}: {
  row: any;
  onPokemonInfo: (id: number) => void;
}) {
  const [sprites, setSprites] = useState<string[]>([]);
  const [pokemonNames, setPokemonNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const namePromises = row.pokemon.map(async (pok: any) => {
        const response = await fetch(`${api}/pokemon/${pok}`);
        const data = await response.json();
        return data.name;
      });
  
      const names = await Promise.all(namePromises);
      setPokemonNames(names);
  
      const spritePromises = names.map(async (name: string) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        const data = await response.json();
        return data.sprites.front_default;
      });
  
      const spriteUrls = await Promise.all(spritePromises);
      setSprites(spriteUrls);
    };
  
    fetchPokemonData();
  }, [row.pokemon]);  

  return (
    <TableRow key={row.id}>
      <TableCell component="th" scope="row">
        {row.id}
      </TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.email}</TableCell>
      <TableCell align="center" style={{ paddingRight: '8px' }}>
        {row.pokemon.map((pok: any, pokIndex: number) => (
          <Link key={pok} onClick={() => onPokemonInfo(pok)} sx={{ cursor: "pointer" }}>
            {sprites[pokIndex] && (
              <PokemonImage name={pokemonNames[pokIndex]} isSprite={true} />
            )}
          </Link>
        ))}
      </TableCell>
    </TableRow>
  );
}