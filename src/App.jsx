import React from 'react';
import Calculator from './Components/Calculator/Main';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Components/Header';

export default function App(){
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Header />} >
            <Route index element={<Calculator />} />
          </Route>

        </Routes>
      </Router>
  );
}