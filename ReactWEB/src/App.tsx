import React from "react";
import {Outlet} from "react-router-dom";
import NavbarComponent from "./component/NavbarComponent";
import {SnackbarProvider} from "notistack";
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import FooterComponent from "./component/FooterComponent";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <SnackbarProvider maxSnack={3}>
                <NavbarComponent/>
                <Container maxWidth="lg">
                    <Outlet/>
                    <FooterComponent/>
                </Container>
            </SnackbarProvider>
        </ThemeProvider>
    );
}
