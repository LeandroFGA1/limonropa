import React from 'react'
import { useState } from 'react';
import directory from '../assets/imgs/directory'
import textGeneral from '../text/textGeneral'
import AnimatedPercentage from '../components/AnimatedPercentage'
import PlanItem from '../components/PlanItem'
const AboutUss = () => {
  return (
    <>
      <section className="relative h-[160vh] bg-transparent ">
        <h1 className="
          sticky top-[50px]
          text-3xl
          md:text-5xl font-bold 

          bg-clip-text 
          flex items-center justify-center 
          h-[calc(100vh-100px)] w-full
        ">
          EcoSustentable
        </h1>
      </section>
      <section className='h-fit' id='mision-y-vision'>
        <h2 className='text-4xl h-[40vh]  font-bold flex items-center justify-center'>
          {textGeneral.aboutUs.title}
        </h2>
        <ul>
          <li className=' w-full h-[140vh] md:h-[calc(100vh-100px)]  flex flex-col md:flex-row items-center justify-center gap-5'>
            <div className='w-full h-[50%] md:w-[50%] md:h-full  flex flex-col items-center justify-center gap-5'>
              <h3 className='text-3xl capitalize'>{textGeneral.aboutUs.mision.title}</h3>
              <p className='text-center text-xl font-thin w-[90%]'>{textGeneral.aboutUs.mision.text}</p>
            </div>
            <div className='w-full h-[50%] md:w-[50%] md:h-full  aspect-[4/3] flex items-center justify-center'>
              <img src={directory.icon1} alt="imagen" className=' h-[90%]' />
            </div>
          </li>
          <li className=' w-full h-[140vh] md:h-[calc(100vh-100px)]  flex flex-col md:flex-row items-center justify-center gap-5'>
            <div className='w-full h-[50%] md:w-[50%] md:h-full  aspect-[4/3] flex items-center justify-center'>
              <img src={directory.icon1} alt="imagen" className=' h-[90%]' />
            </div>
            <div className='w-full h-[50%] md:w-[50%] md:h-full  flex flex-col items-center justify-center gap-5'>
              <h3 className='text-3xl capitalize'>{textGeneral.aboutUs.vision.title}</h3>
              <p className='text-center text-xl font-thin w-[90%]'>{textGeneral.aboutUs.vision.text}</p>
            </div> 
          </li>
        </ul>
      </section>
      <section className='porque w-full overflow-hidden p-2 sm:p-8 ' id='por-que-reciclar'>
        <h2 className='text-3xl font-bold mb-6 text-center'>{textGeneral.aboutUs.porque.title}</h2>
        <div className='flex flex-wrap justify-center gap-6  '>
          {textGeneral.aboutUs.porque.items.map((item, index) => (
            <div
              key={index}
              className='flex flex-col items-center justify-start  shadow-md rounded-md p-4 min-w-[300px] max-w-[400px] w-full'
            >
              <img src={directory[item.image]} alt="Imagen" className='h-20 mb-4' />
              <p className='text-center text-base'>
                {item.text.split(/(\d{2,})%/).map((part, index) => {
                  const isNumber = /^\d{2,}$/.test(part) && !part.startsWith('0')
                  const nextChar = item.text[item.text.indexOf(part) + part.length]
                  
                  if (isNumber && nextChar === '%') {
                    return <AnimatedPercentage key={index} target={part} />
                  }
                  return <span key={index}>{part}</span>
                })}
              </p>

            </div>
          ))}
        </div>
      </section>
      <section className="w-full py-10 px-4" id="nuestro-plan">
      <h2 className="text-3xl font-bold text-center mb-10">Nuestro Plan</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {textGeneral.aboutUs.nuestroPlan.items.map((item, idx) => (
          <PlanItem
            key={idx}
            title={item.title}
            text={item.text}
            image={item.image}
          />
        ))}
      </div>
    </section>



    </>
  )
}

export default AboutUss
