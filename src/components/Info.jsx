import React from 'react'
import directory from '../assets/imgs/directory'
import textGeneral from '../text/textGeneral'
const Info = () => {
    return (
        <div className='w-[90%] min-h-[200px] bg-main3/10 rounded-xl flex items-center justify-center'>
            <ul className='flex flex-wrap items-center justify-center h-full text-sm gap'>
                {textGeneral.info.map((item, index) => (
                    <li key={index} className='flex flex-row w-[240px] gap-5 px-2 group'>
                        <img
                            src={directory[item.icon]}
                            alt={item.title}
                            className='w-[90%] min-w-[40px] max-w-[60px] group-hover:animate-hithere'
                        />
                        <div>
                            <h3><strong>{item.title}</strong></h3>
                            <span>{item.description}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}



export default Info