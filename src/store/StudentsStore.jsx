import { createContext } from "react";


export const StudentsContext = createContext({
    students: [],
    handleDeleteClick: () => {}
    
});