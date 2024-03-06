import React, { createContext, useEffect, useState } from 'react';
import StudentList from './StudentsList';
import { StudentsContext } from '../../store/StudentsStore';

export default function Main(){
    const [students, setStudents] = useState([]);

    const StudentsInfo = createContext(null);
    
    useEffect(() => {
        const fetchStudentInfo = async () => {
          try {
            let response = await fetch('http://localhost:3000/students');
            if (response.ok) {
              let data = await response.json();
              setStudents(data);
            } else {
              console.error('Failed to fetch student data');
            }
          } catch (error) {
            console.error('Error while fetching student data:', error);
          }
        };
    
        fetchStudentInfo();
      }, []);

    return (
            <StudentsContext.Provider value={students}>
                <StudentList />
            </StudentsContext.Provider>

    )
}