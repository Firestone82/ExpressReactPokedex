import React from 'react';
import NavbarComponent from "../component/NavbarComponent";
import Container from "react-bootstrap/Container";

const Index = () => {
	return (
		<>
			<NavbarComponent/>
			<Container className="page">
				<h1>Home</h1>
				<p>Welcome to the home page</p>
			</Container>
		</>
	);
};

export default Index;