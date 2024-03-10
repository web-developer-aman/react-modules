import React from 'react';
import Calculator from './Components/Calculator/Main';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Components/Header';
import StudentInfo from './Components/StudentInfo/Main';
import StudentCreate from './Components/StudentInfo/Create';
import StudentEdit from './Components/StudentInfo/Edit';
import PostList from './Components/Blog/Main';
import CreatePost from './Components/Blog/CreatePost';
import ViewPost from './Components/Blog/ViewPost';

export default function App(){
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Header />} >
            <Route index element={<Calculator />} />
            <Route path='/student-info' element={<StudentInfo />} />
            <Route path='/student-create' element={<StudentCreate />} />
            <Route path='/student-edit/:id' element={<StudentEdit />} />
            <Route path='/posts' element={<PostList />} />
            <Route path='/post/create' element={<CreatePost />} />
            <Route path='/post/view/:id' element={<ViewPost />} />
          </Route>

        </Routes>
      </Router>
  );
}