import React from 'react';

export default function StudentModal({ isOpen, student, onClose }){

    return (
        isOpen && (
          <div className={`fixed left-0 top-0 bg-black bg-opacity-50 w-screen h-screen flex items-center justify-center`}>
            <div className='absolute bg-white p-4 rounded shadow-md'>
              <h2 className='text-lg font-semibold mb-4'>{student.name}'s Information</h2>
              <p>ID: {student.id}</p>
              <p>Major: {student.major}</p>
              <p>Academic Year: {student.academicYear}</p>
              <p>Semester: {student.semester}</p>
              <button className='bg-blue-500 text-white px-4 py-2 rounded mt-4' onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        )
      );
}