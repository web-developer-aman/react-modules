import React from 'react';

export default function StudentModal({ isOpen, student, onClose }){

    return (
        isOpen && (
          <div className={`fixed left-0 top-5 bg-black bg-opacity-50 w-screen h-screen flex items-center justify-center`}>
            <div className='absolute shadow-lg bg-white mt-2 p-5 max-h-[500px] overflow-y-scroll md:max-w-[70%] w-[60%] rounded mx-auto'>
                <div className='mb-5 w-[120px] mx-auto'>
                        <img
                        src={ student.image || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'}
                        alt="Student Image" className='w-[120px] h-[120px] rounded-full cursor-pointer border'/>
                </div>
                <div className='grid grid-cols-6 text-center gap-y-2'>
                    <div className='col-span-2 m-2'>
                        <strong>Student ID:</strong>  <br />
                        {student.studentId}
                        <hr className='mt-4'/>
                    </div>
                    <div className='col-span-2 m-2 text-center'>
                        <strong>Student Name:</strong>  <br />
                        {student.name}
                        <hr className='mt-4'/>
                    </div> 
                    <div className='col-span-2 m-2 text-center'>
                       <strong>Student Email:</strong>  <br />
                        {student.email}
                        <hr className='mt-4'/>
                    </div>
                    <div className='col-span-2 m-2 text-center'>
                       <strong>Student Age:</strong>  <br />
                        {student.age}
                        <hr className='mt-4'/>
                    </div>
                    <div className='col-span-2 m-2 text-center'>
                       <strong>Student Birthday:</strong>  <br />
                        {student.birthday}
                        <hr className='mt-4'/>
                    </div>
                    <div className='col-span-2 m-2 text-center'>
                       <strong>Student Gender:</strong>  <br />
                        {student.gender}
                        <hr className='mt-4'/>
                    </div>
                    <div className='col-span-2 m-2 text-center'>
                       <strong>Phone:</strong>  <br />
                        {student.phone}
                        <hr className='mt-4'/>
                    </div>
                    <div className='col-span-4 m-2 text-center'>
                       <strong>Street:</strong>  <br />
                        {student.street}
                        <hr className='mt-4'/>
                    </div>
                    <div className='col-span-2 m-2 text-center'>
                       <strong>Police Station:</strong>  <br />
                        {student.policeStation}
                        <hr className='mt-4'/>
                    </div>
                    <div className='col-span-2 m-2 text-center'>
                       <strong>City:</strong>  <br />
                        {student.city}
                        <hr className='mt-4'/>
                    </div>
                    <div className='col-span-2 m-2 text-center'>
                       <strong>State:</strong>  <br />
                        {student.state}
                        <hr className='mt-4'/>
                    </div>
                    <div className='col-span-2 m-2 text-center'>
                       <strong>Zip Code:</strong>  <br />
                        {student.zipCode}
                        <hr className='mt-4'/>
                    </div>
                    <div className='col-span-2 m-2 text-center'>
                       <strong>Country:</strong>  <br />
                        {student.country}
                        <hr className='mt-4'/>
                    </div>
                    <div className='col-span-2 m-2 text-center'>
                       <strong>University Name:</strong>  <br />
                        {student.universityName}
                        <hr className='mt-4'/>
                    </div>
                    <div className='col-span-2 m-2 text-center'>
                       <strong>Course Name:</strong>  <br />
                        {student.courseName}
                        <hr className='mt-4'/>
                    </div>
                    <div className='col-span-2 m-2 text-center'>
                       <strong>Session:</strong>  <br />
                        {student.session}
                        <hr className='mt-4'/>
                    </div>
                    <div className='col-span-2 m-2 text-center'>
                       <strong>Major:</strong>  <br />
                        {student.major}
                        <hr className='mt-4'/>
                    </div>
                    <div className='col-span-2 m-2 text-center'>
                       <strong>Semester:</strong>  <br />
                        {student.semester}
                        <hr className='mt-4'/>
                    </div>
                    <div className='col-span-2 m-2 text-center'>
                       <strong>Graduation Year:</strong>  <br />
                        {student.graduationYear}
                        <hr className='mt-4'/>
                    </div>
                </div>
                <div className='text-right'>
                  <button className='bg-blue-500 text-white px-4 py-2 rounded mt-4' onClick={onClose}>
                    Close
                  </button>
                </div>

            </div>
            {/* <div className='absolute bg-white p-4 rounded shadow-md'>
              <h2 className='text-lg font-semibold mb-4'>{student.name}'s Information</h2>
              <p>ID: {student.id}</p>
              <p>Major: {student.major}</p>
              <p>Academic Year: {student.academicYear}</p>
              <p>Semester: {student.semester}</p>
              <button className='bg-blue-500 text-white px-4 py-2 rounded mt-4' onClick={onClose}>
                Close
              </button>
            </div> */}
          </div>
        )
      );
}