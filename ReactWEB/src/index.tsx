import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/app.css';

import {BrowserRouter, Route, Routes} from "react-router-dom";
import Pokemons from "./pages/pokemons"
import Trainers from "./pages/trainers"
import Index from "./pages/index";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/pokemons" element={<Pokemons/>} />
            <Route path="/trainers" element={<Trainers/>} />
            <Route path="/" element={<Index/>} />
        </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();