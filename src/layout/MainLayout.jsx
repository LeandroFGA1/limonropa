import React from 'react'
import Home from '../pages/Home'
import Header from '../components/header/Header'
import Footer from '../components/Footer'


const MainLayout = ({children}) => {
    return (
        <>
            <header className=' ' >
                <Header/>
            </header>
            <main className='pt-[100px]   '>
                {children}
                
            </main>
            <footer className=' h-[200px] w-full '>  
                <Footer/>
            </footer>
        </>
    )
}

export default MainLayout