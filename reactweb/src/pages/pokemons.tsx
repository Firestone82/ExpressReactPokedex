import React from 'react';
import NavbarComponent from "../component/NavbarComponent";
import Container from "react-bootstrap/Container";

const Pokemons = () => {
    return (
        <>
            <NavbarComponent/>
            <Container className="page">
                <h1>Pokemons!</h1>
                <p>Aaaaaaaaaaaa</p>
            </Container>
        </>
    );
};

export default Pokemons;