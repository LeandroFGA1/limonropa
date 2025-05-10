import React, { useState } from 'react'
import directory from '../assets/imgs/directory'

const ButtonsSocialMedia = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <div 
      onMouseLeave={() => setIsExpanded(false)}
      className={`fixed z-50 left-[calc(100%-100px)] backdrop-blur-sm opacity-50 hover:opacity-100 transition-all duration-300 rounded-lg shadow-md w-[100px] flex items-end justify-center ${isExpanded ? 'h-[260px] top-[calc(100%-280px)] bg-white' : 'h-[80px] top-[calc(100%-100px)]'}`}
    >
      <div className='flex items-center flex-col-reverse gap-4 w-full h-full overflow-hidden'>
        <img onClick={() => setIsExpanded(prev => !prev)} src={directory.chatIcon} alt="chat icon" className='h-16 rounded-lg transition-all duration-300 cursor-pointer active:bg-white' />
        <div className='w-full hover:backdrop-blur-lg hover:bg-main/50 transition-all bg-transparent duration-300 flex items-center justify-center'>
          <a 
            href="https://wa.me/56984577726?text=Hola,%20vengo%20desde%20su%20tienda%20web,%20quería%20consultar%20sobre:" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex justify-center items-center"
          >
            <img 
              src={directory.whatsappIcon} 
              alt="Contactar por WhatsApp" 
              className='h-16 w-16 cursor-pointer hover:bg-black' 
              aria-label="Contactar por WhatsApp" 
              title='Contáctanos por WhatsApp' 
            />
          </a>
        </div>

        
        <div className='w-full hover:backdrop-blur-lg hover:bg-main/50 transition-all bg-transparent duration-300 flex items-center justify-center'>
            <img src={directory.instagramIcon} alt="" className='h-16 w-16 cursor-pointer' aria-label="Seguir en Instagram" title='contactanos por instagram' />
        </div>
        
      </div>
    </div>
  )
}

export default ButtonsSocialMedia
