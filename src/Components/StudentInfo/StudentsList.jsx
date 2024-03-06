import React, { useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import { StudentsContext } from '../../store/StudentsStore';
import StudentModal from './StudentModal';
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";


export default function StudentList(){
    const studentsData = useContext(StudentsContext);

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const handleViewClick = (student) => {
      setSelectedStudent(student);
      setIsModalOpen(true);
    };
    
    const handleDeleteClick = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                const response = await fetch(`http://localhost:3000/students/${id}`,{
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    console.log('Student deleted successfully');
                }
            } catch (error) {
                console.log('Error submitting student data:', error);
            }
        }
    }
  
    const handleCloseModal = () => {
      setSelectedStudent(null);
      setIsModalOpen(false);
    };

    return (
        <div className='max-w-[1240px] mx-auto'>
            <h1 className='text-3xl font-bold text-center py-5'>Student Information List</h1>
            <div className='text-right'>
                <Link to='/student-create'>
                    <button className='bg-blue-500 py-2 px-5 rounded text-white'>Add New</button>
                </Link>
            </div>
            <div className='container mx-auto mt-5'>
                <table className='w-[80%] mx-auto shadow-xl rounded divide-y divide-gray-100'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='py-6 px-2'>Image</th>
                            <th className='py-6 px-2'>Student Id</th>
                            <th className='py-6 px-2'>Name</th>
                            <th className='py-6 px-2'>Course</th>
                            <th className='py-6 px-2'>Session</th>
                            <th className='py-6 px-2'>Semester</th>
                            <th className='py-6 px-2'></th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100'>
                    {studentsData.map((data, index) => (
                        <tr key={index} className='text-center'>
                        <td className='py-3 px-2 whitespace-nowrap'>
                            <img
                            src={data.image ? data.image : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'}
                            alt='student'
                            className='w-[70px] h-[70px] rounded'
                            />
                        </td>
                        <td className='py-3 px-2 whitespace-nowrap'>{data.studentId}</td>
                        <td className='py-3 px-2 whitespace-nowrap'>{data.name}</td>
                        <td className='py-3 px-2 whitespace-nowrap'>{data.course}</td>
                        <td className='py-3 px-2 whitespace-nowrap'>{data.session}</td>
                        <td className='py-3 px-2 whitespace-nowrap'>{data.semester}</td>
                        <td className='py-3 px-2 whitespace-nowrap'>
                            <Link to={`/student-edit/${data.id}`}>
                                <button className='bg-blue-200 hover:bg-blue-500 p-3 rounded text-blue-500 hover:text-white'><MdEdit className='text-xl' /></button>
                            </Link>
                            <button data-modal-target="default-modal" data-modal-toggle="default-modal"
                                className='bg-green-200 hover:bg-green-500 p-3 rounded text-green-700 hover:text-white ml-2 mr-2'
                                onClick={() => handleViewClick(data)}
                            >
                                <FaEye className='text-xl' />
                            </button>
                            <button onClick={() => handleDeleteClick(data.id)} className='bg-red-300 hover:bg-red-700 p-3 rounded text-red-700 hover:text-white'><MdDelete className='text-xl ' /></button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <StudentModal isOpen={isModalOpen} student={selectedStudent} onClose={handleCloseModal} />

        </div>
    )
}