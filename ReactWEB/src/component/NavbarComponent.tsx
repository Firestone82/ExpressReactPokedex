import React from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import LogoImage from '../assets/img/icon.png';

const NavbarComponent = () => {
	const location = useLocation(); // Use useLocation hook to get the current path

	// Function to determine if a link is active based on the current location
	const isActive = (path: string) => location.pathname === path;

	return (
		<Navbar expand="lg">
			<Container>
				<Navbar.Brand href="#home">
					<img src={LogoImage} height="50" className="d-inline-block align-top" alt="Pikachu Logo" />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto fs-5">
						<NavLink to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</NavLink>
						<NavLink to="/pokemons" className={`nav-link ${isActive('/pokemons') ? 'active' : ''}`}>Pokemons</NavLink>
						<NavLink to="/trainers" className={`nav-link ${isActive('/trainers') ? 'active' : ''}`}>Trainers</NavLink>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavbarComponent;