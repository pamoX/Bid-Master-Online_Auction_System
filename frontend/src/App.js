// src/App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./Components/Home/Home";


function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mainhome" element={<Home />} />
          
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;