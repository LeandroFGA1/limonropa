import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import directory from '../../assets/imgs/directory'
import { Button } from '@material-tailwind/react'

const HeroProduct = ({productID}) => {
    const [bugSolution,SetBugSolution] = useState(false);
    const handleScroll = () => {
        if(bugSolution){
            SetBugSolution(true);
        }
        window.scrollBy({
            top: window.innerHeight * 0.9,
            behavior: 'smooth', 
            });
        };
    const product = {category: 'category categorigal', brand: 'brand marqueño', name: 'name generico de limon'}
    return (
        <div className='relative bg-black w-full h-[calc(100vh-100px)] lg:w-[50%] overflow-hidden border-r-2 border-r-black/80'>
            <div className=' absolute top-0 left-0 text-blue-400 z-10 hidden'>
                {/* el hiddden de arriba hay que sacarloooooo */}
                <Link 
                title={`categoria: ${product.category}`}  
                className=' hover:underline hover:text-blue-300 '>
                    {product.category}
                </Link>
                &gt;
                <Link 
                title={`marca: ${product.brand}`} 
                className=' hover:underline hover:text-blue-300'>
                    {product.brand}
                </Link>
            </div>
            <img src={directory[productID]} alt={`ìmagen del producto ${product.name}`}  
            className='h-full w-full blur-sm' />
            <img src={directory[productID]} alt={`ìmagen del producto ${product.name}`}  
            className=' absolute top-0 left-[10%] h-full w-[80%] object-cover sm:w-[80%] sm:left-[10%] lg:w-[90%] lg:left-[5%] border-2 border-black/20 ' />
            
            <button type='button' name='button-scroll' className=' absolute hover:shadow-md rounded-lg h-[40px] text-white active:bg-green-500/80 bottom-[4%] flex gap-2 w-[80%] left-[10%] sm:w-[50%] sm:left-[25%] bg-green-500 border-black  lg:hidden border items-center justify-center' onClick={handleScroll}>
                comprar
                <img src={directory.scrollToB} alt="scroll para abajo" className='h-5 animate-scrollDown'   />
            </button>
        </div>
    )
}

export default HeroProduct