import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

export default function Create(){
    return (
        <div className='max-w-[1240px] mx-auto'>
            <h1 className='text-3xl font-bold text-center py-5'>Add Student</h1>
            <div className='text-right'>
                <Link to='/student-info'>
                    <button className='bg-slate-500 py-2 px-5 rounded text-white'>Back to student list</button>
                </Link>
            </div>
        </div>
    )
}