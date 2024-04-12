import React from 'react';
import NavbarComponent from "../component/NavbarComponent";
import Container from "react-bootstrap/Container";
import PokemonTable from '../component/pokemons/PokemonTable';

const Pokemons = () => {
	return (
		<>
			<NavbarComponent/>
			<Container className="page">
				<h1>Pokemons!</h1>
				<p>Aaaaaaaaaaaa</p>
				<PokemonTable/>
			</Container>
		</>
	);
};

export default Pokemons;