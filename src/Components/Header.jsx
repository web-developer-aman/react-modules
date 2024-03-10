import React from 'react';
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from 'react-icons/ai';
import { Link, Outlet } from 'react-router-dom';

export default function Header(){

    const [toggle, setToggle] = React.useState(false);

    return (
        <>
        <div className='bg-slate-700 p-4 sticky top-0 z-50'>
            <div className='max-w-[1240px] items-center flex justify-between mx-auto'>
                <div className='text-3xl font-bold'>
                    <Link to='/' className='text-white'>SoftaWeb</Link>
                </div>
                {
                    toggle ? 
                    <AiOutlineClose onClick={() => setToggle(!toggle)} className='text-white text-2xl md:hidden block'/>
                    :
                    <AiOutlineMenu onClick={() => setToggle(!toggle)} className='text-white text-2xl md:hidden block'/>
                }

                <ul className='hidden md:flex text-white gap-10'>
                    <li>
                        <Link to="/">Calculator</Link>
                    </li>
                    <li>
                        <Link to="/student-info">Student Info</Link>
                    </li>
                    <li>
                        <Link to="/posts">Blog</Link>
                    </li>
                </ul>
                <ul className={`w-full h-screen block md:hidden text-white fixed top-[68px] bg-slate-800 duration-300
                    ${toggle ? "left-0" : "left-[-100%]"}
                `}>
                    <Link to="/">
                        <li className='p-3 hover:bg-slate-900' onClick={() => setToggle(!toggle)}>Calculator</li>
                    </Link>
                    <Link to="/student-info">
                        <li className='p-3 hover:bg-slate-900' onClick={() => setToggle(!toggle)}>Student Info</li>
                    </Link>
                    <Link to="/posts">
                        <li className='p-3 hover:bg-slate-900' onClick={() => setToggle(!toggle)}>Blog</li>
                    </Link>
                </ul>
            </div>
        </div>
        <Outlet />
        </>
    )
}