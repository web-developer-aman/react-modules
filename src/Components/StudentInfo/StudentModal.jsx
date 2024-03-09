import React from 'react';

export default function StudentModal({ isOpen, student, onClose }){

    const keysArray = student && Object.keys(student).filter(key => key !== 'id' && key !== 'image');

    const formatKey = (key) => {
        return key.replace(/([a-z])([A-Z])/g, '$1 $2')
                  .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
                  .toLowerCase()
                  .replace(/^\w/, (c) => c.toUpperCase());
      };

    return (
        isOpen && (
          <div className={`fixed left-0 top-5 bg-black bg-opacity-50 w-screen h-screen flex items-center justify-center`}>
            <div className='absolute shadow-lg bg-white mt-2 p-5 max-h-[500px] overflow-y-scroll md:max-w-[70%] w-[60%] rounded mx-auto'>
                <div className='mb-5 w-[120px] mx-auto'>
                        <img
                        src={ student.image || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'}
                        alt="Student Image" className='w-[120px] h-[120px] rounded-full border'/>
                </div>
                <div className='grid grid-cols-6 text-center gap-y-2'>
                    {
                        keysArray.map((key, index) => {
                            return (
                                <div key={key} className={`${key== 'street' ? 'col-span-4' : 'col-span-2'} m-2`}>
                                    <strong>{formatKey(key)}:</strong>  <br />
                                    {student[key]}
                                    <hr className='mt-4'/>
                                </div>
                            )
                        })
                    }  
                </div>
                <div className='text-right'>
                  <button className='bg-blue-500 text-white px-4 py-2 rounded mt-4' onClick={onClose}>
                    Close
                  </button>
                </div>

            </div>
          </div>
        )
      );
}