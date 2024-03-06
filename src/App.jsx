import React from 'react';
import Calculator from './Components/Calculator/Main';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Components/Header';
import StudentInfo from './Components/StudentInfo/Main';
import StudentCreate from './Components/StudentInfo/Create';
import StudentEdit from './Components/StudentInfo/Edit';

export default function App(){
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Header />} >
            <Route index element={<Calculator />} />
            <Route path='/student-info' element={<StudentInfo />} />
            <Route path='/student-create' element={<StudentCreate />} />
            <Route path='/student-edit/:id' element={<StudentEdit />} />
          </Route>

        </Routes>
      </Router>
  );
}