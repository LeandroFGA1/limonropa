import React, { useEffect, useState } from 'react';
import { handleScroll } from './HeaderFunctions';
import { Button, Menu, MenuHandler, MenuList, MenuItem } from '@material-tailwind/react';
import CartModal from './CartModal';
import NavProfileMenu from './NavProfileMenu';
import MenuWhitItems from './MenuWhitItems';
import directory from '../../assets/imgs/directory';
import BannerInfinite from './BannerInfinite';
import { Link } from 'react-router-dom';

const Header = () => {
    const [navbarSize, setNavbarSize] = useState('h-[100px]');
    const [lastScrollY, setLastScrollY] = useState(0);

    const technologyMenuItems = [
        {
            title: 'Categorias',
            description: 'Explore the latest in AI advancements.',
        },
        {
            title: 'Productos',
            description: 'Discover secure and decentralized solutions.',
        },
        {
            title: 'Marcas',
            description: 'Learn about scalable and efficient services.',
        },
    ];

    const developmentMenuItems = [
        {
            title: 'Sobre Nosotros',
            description: 'Build amazing user interfaces.',
        },
        {
            title: 'Servicios',
            description: 'Power your applications with robust APIs.',
        },
        {
            title: 'Lorem lorem',
            description: 'lorem nostubres.',
        },
    ];

    useEffect(() => {
        const onScroll = () => handleScroll(setNavbarSize, lastScrollY, setLastScrollY);
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [lastScrollY]);

    return (
        <div className={`fixed z-50 w-full transition-all duration-300 ${navbarSize} bg-yellow-300 shadow-md`}>
            <div className="h-7 w-full bg-gray-700 flex items-center justify-center">
                <BannerInfinite />
            </div>
            <div className="h-[calc(100%-28px)] w-full">
                <nav className="w-full h-full bg-main flex items-center justify-between px-4">
                    <div className='w-[45%] min-w-[45%]  flex items-center justify-start'>
                        <div className="block sm:hidden">
                            <Menu>
                                <MenuHandler>
                                    <Button size="small" variant="outlined" className="flex flex-col gap-1 p-3">
                                        <div className="bg-black w-8 h-1"></div>
                                        <div className="bg-black w-8 h-1"></div>
                                        <div className="bg-black w-8 h-1"></div>
                                    </Button>
                                </MenuHandler>
                                <MenuList>
                                    <MenuItem>
                                        <Link to={"/"}>Inicio</Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link to={"/store"}>Tienda</Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link to={"/aboutUs"}>Sobre nosotros</Link>
                                    </MenuItem>
                                    
                                </MenuList>
                            </Menu>
                        </div>
                        <div className="hidden sm:flex items-center justify-center">
                            <Link to={"/"}>
                                <Button className=' text-black bg-main2 hover:bg-main text-base backdrop-blur'>Inicio</Button>
                            </Link>
                            
                            <MenuWhitItems title="Tienda" link="/store" menuItems={technologyMenuItems} />
                            <MenuWhitItems title="Sobre Nosotros" link="/aboutUs" menuItems={developmentMenuItems} />
                        </div>
                    </div>

                    <div className="hidden md:flex items-center justify-center  w-[10%] min-w-[10%]  ">
                    <Link to={"/"}>
                        <img src={directory.logo} alt="logo empresarial" className="w-20" />
                    </Link>
                    </div>
                    <div className="flex gap-3 w-[45%] min-w-[45%] items-center justify-end">
                        <CartModal />
                        <NavProfileMenu />
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Header;
