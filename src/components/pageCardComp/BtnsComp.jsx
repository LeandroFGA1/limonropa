import React,{useState} from 'react'
import { Button } from '@material-tailwind/react'
import directory from '../../assets/imgs/directory'
import { Link } from 'react-router-dom'
const BtnsComp = ({ added, setAdded, onAddCartChange }) => {
    const [test,setSets] = useState(true);
    const AddCart = () => {
        onAddCartChange(true);
        // // setAdded(true);
        setSets(false)
    }
    return (
        <div className='flex gap-4 justify-start items-center px-[10%] flex-wrap xl:justify-center  w-full' >
            <Button className={`bg-green-500 border border-black flex items-center justify-center gap-2 group 
                ${!added?"":""}`} onClick={AddCart} aria-label="Agregar al carrito"
            >
                {!added?"agregar al carrito":"producto ya agregado"}
                <img src={directory.cart} alt="carrito de compra " className='h-5 group-hover:animate-hithere' />
            </Button>
            <Link to={"/checkout"}>
                <Button 
                    className='bg-green-500 border border-black' 
                    disabled={test}>ir al carrito
                </Button>
            </Link>
            
        </div>
    )
}

export default BtnsComp