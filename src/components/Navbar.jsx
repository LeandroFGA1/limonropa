import React from 'react';
import { Navbar as MTNavbar, Typography, Button, IconButton, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import directory from '../assets/imgs/directory';
const Navbar = () => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-between ">
            <MTNavbar fullWidth blurred className="w-screen flex  items-center bg-main h-full px-4 py-2 bg-gradient-to-r  rounded-none">
                <div className="container mx-auto flex items-center justify-between relative">
                    
                    
                    <div className="lg:hidden relative w-14">
                        
                        <div className="absolute w-full h-full flex items-center justify-center border-b-2 border-main3 transition-all hover:border-b-2 ">
                            <div>
                                <img src={directory.icon1} alt="icono de pestañas" className=' w-32' />
                            </div>
                        </div>
                        <Menu>
                            <MenuHandler>
                                <IconButton variant="text" className="text-white">
                                    <i className="fas fa-bars"></i>
                                </IconButton>
                            </MenuHandler>
                            <MenuList className="bg-white text-black">
                                <MenuItem>Pestaña 1</MenuItem>
                                <MenuItem>Pestaña 2</MenuItem>
                                <MenuItem>Pestaña 3</MenuItem>
                            </MenuList>
                        </Menu>
                    </div>

                    
                    <Typography
                        as="a"
                        href="#"
                        variant="h4"
                        className="text-white font-extrabold lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2"
                    >
                        <div className=' h-20'>
                            <img src={directory.logo} alt="logo" className='h-full' />
                        </div>
                    </Typography>

                    
                    <div className="lg:hidden relative w-14">
                        <div className="absolute w-full h-full flex items-center justify-center border-b-2 border-main3 transition-all hover:border-b-4">
                        <div>
                                <img src={directory.icon2} alt="icono de banner" />
                        </div>
                        </div>
                        <Menu>
                            <MenuHandler>
                                <IconButton variant="text" className="text-white">
                                    <i className="fas fa-user"></i>
                                </IconButton>
                            </MenuHandler>
                            <MenuList className="bg-white text-black">
                                <MenuItem>Acceso 1</MenuItem>
                                <MenuItem>Acceso 2</MenuItem>
                            </MenuList>
                        </Menu>
                    </div>

                    
                    <div className="hidden lg:flex space-x-4">
                        
                        
                        <Menu>
                            <MenuHandler>
                                <Typography
                                    as="a"
                                    href="#"
                                    variant="h6"
                                    className="cursor-pointer text-white"
                                >
                                    Pestaña 1
                                </Typography>
                            </MenuHandler>
                            <MenuList className="bg-white text-black">
                                <MenuItem>Item 1.1</MenuItem>
                                <MenuItem>Item 1.2</MenuItem>
                                <MenuItem>Item 1.3</MenuItem>
                            </MenuList>
                        </Menu>
                        <Menu>
                            <MenuHandler>
                                <Typography
                                    as="a"
                                    href="#"
                                    variant="h6"
                                    className="cursor-pointer text-white"
                                >
                                    Pestaña 2
                                </Typography>
                            </MenuHandler>
                            <MenuList className="bg-white text-black">
                                <MenuItem>Item 2.1</MenuItem>
                                <MenuItem>Item 2.2</MenuItem>
                                <MenuItem>Item 2.3</MenuItem>
                            </MenuList>
                        </Menu>
                        <Menu>
                            <MenuHandler>
                                <Typography
                                    as="a"
                                    href="#"
                                    variant="h6"
                                    className="cursor-pointer text-white"
                                >
                                    Pestaña 3
                                </Typography>
                            </MenuHandler>
                            <MenuList className="bg-white text-black">
                                <MenuItem>Item 3.1</MenuItem>
                                <MenuItem>Item 3.2</MenuItem>
                                <MenuItem>Item 3.3</MenuItem>
                            </MenuList>
                        </Menu>
                    </div>

                    
                    <div className="hidden lg:flex space-x-4">
                        <Button color='black' className=" bg-main3 hover:bg-main">
                            Acceso 1
                        </Button>
                        <Button color="black" className=" bg-main3 hover:bg-main">
                            Acceso 2
                        </Button>
                    </div>
                </div>
            </MTNavbar>
            <div className='bg-blue-gray-700 w-full h-10'></div>
        </div>
    );
};

export default Navbar;
