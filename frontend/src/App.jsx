import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from './Components/pages/home/Home';
import Footer from './Components/Footer';
import Header from './Components/Header';
import "./App.css";

const App = () => {

    return (
        <div className="app-container">
            <Header />
            <div className="content-wrap">
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

export default App;


