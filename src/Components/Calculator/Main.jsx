import React, { useState } from 'react';

export default function Main(){

    const btnElement =  [
        'C',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '0',
        '.',
        '+',
        '-',
        '(',
        ')',
        '÷',
        'x',
        '=',
    ];

    const [display, setDisplay] = useState(0);

    const displayElement = (e) => {
        if (e.target.name === 'C'){
            setDisplay(0);
        }else if (e.target.name === '='){
            let result = eval(display)
            setDisplay(result);
        }else{
            setDisplay(display==0 ? e.target.name : display + e.target.name);
        }
    }

    return (
        <div className='text-center'>
            <h1 className='text-3xl font-bold py-5'>Calculator</h1>
            <div className='border rounded-lg max-w-[350px] mx-auto p-3'>
                <div>
                    <input type="text" value={display} className='border rounded p-2 w-[100%] text-right focus:outline-none text-2xl text-slate-800' readOnly/>
                </div>
                <div className='mt-3 flex flex-wrap mx-auto'>
                    {
                        btnElement.map((e, i) => {
                            return (
                                <button onClick={(e) => displayElement(e)} name={e} className='bg-slate-300 px-4 py-3 m-1 w-[17.5%] rounded text-lg'>{e}</button> 
                            )
                        })
                    }
                    
                </div>
                
            </div>
        </div>
    );
}