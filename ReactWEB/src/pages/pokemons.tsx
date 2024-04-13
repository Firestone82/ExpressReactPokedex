import React from 'react';
import PokemonTable from '../component/pokemons/PokemonTable';
import {Paper, Stack} from "@mui/material";

const Pokemons = () => {
	return (
		<Stack spacing={2}>
			<Paper elevation={3} sx={{ px: 2, py: 1 }}>
				<h1>Pokemons</h1>
				<p>Here you can find all the pokemons</p>
			</Paper>

			<Paper elevation={3} sx={{ padding: 1 }}>
				<PokemonTable/>
			</Paper>
		</Stack>
	);
};

export default Pokemons;