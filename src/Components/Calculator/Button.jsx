import React from 'react';

export default function Button({displayElement}){
    const btnElement =  ['C','1','2','3','4','5','6','7','8','9','0','.','+','-','(',')','÷','x','=',
    ];

    return (
        <div className='mt-3 flex flex-wrap mx-auto'>
            {
                btnElement.map((e, i) => {
                    return (
                    <button onClick={(e) => displayElement(e)}  key={e} name={e==='x' ? '*' : e} className='bg-slate-300 px-4 py-3 m-1 w-[17.5%] rounded text-lg'>{e}</button> 
                    )
                })
            }
                    
        </div>
    )
}