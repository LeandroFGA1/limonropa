import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Typography,
    Button
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { logout } from "../../store/authSlice";
import directory from "../../assets/imgs/directory";
import { BASE_URL } from "../../App";

const NavProfileMenu = () => {
    const { email, accessToken, refreshToken } = useSelector((state) => state.auth);
    const userProfiles = useSelector((state) => state.profile.userProfiles); // Accede a los perfiles
    const dispatch = useDispatch();
    // const email ="hola@gmail.com"
    // Obtiene el avatar del estado global
    const getAvatar = (email) => {
        if (!email) return null;
        const normalizedEmail = email.toLowerCase();
        return userProfiles[normalizedEmail];
    };

    const selectedAvatar = getAvatar(email);

    const handleLogout = async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}/api/usuarios/logout/`,
                { refresh: refreshToken },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (response.status === 205) {
                dispatch(logout());
            }
        } catch (error) {
            console.error('Error durante el logout:', error);
            dispatch(logout());
        }
    };

    return (
        <Menu className="h-full ">
            {email? (
                <MenuHandler>
                    {selectedAvatar?(
                        <Avatar
                        variant="circular"
                        alt="Perfil"
                        className="cursor-pointer hover:bg-gray-200 bg-main2/50 transition-all"
                        src={
                            directory[selectedAvatar] ||
                            directory.userDef // Fallback si no encuentra el avatar
                        }
                        title={email}
                    />
                    
                    ):(
                        <div
                            className="cursor-pointer hover:bg-gray-200 transition-all flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white text-lg font-bold"
                            title={email}
                        >
                            {email.split('@')[0].slice(0, 2).toUpperCase()}
                        </div>
                    )}

                </MenuHandler>



                // si no esta registrado
            ):(
                <div className="">
                    <Link to={"/access"}>
                        <Button className="h-fit min-w-[110px] flex items-end text-gray-900 active:border-white justify-center border-2 border-t-transparent border-b-transparent border-l-transparent border-r-transparent rounded-sm bg-transparent hover:bg-white/90 hover:border-black hover:rounded-lg group transition-all  gap-1 hover:text-black p-1 ">
                            <img src={directory.userDef} alt="icono de usuario" className="h-8 mb-1 t" />
                            <span className=" capitalize text-lg group-hover:mb-[3px] transition-all">ingresar</span>
                        </Button>
                    </Link>
                    
                </div>
            )}
            <MenuList>
                <MenuItem className="flex items-center gap-2" >
                    <Link to={"/access/profile"}>
                        <img alt="" />
                        <Typography variant="small" className="font-medium">
                            Editar perfil
                        </Typography>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Typography
                            variant="small"
                            className="font-bold cursor-pointer"
                            onClick={handleLogout}
                        >
                            Cerrar sesión
                    </Typography>
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default NavProfileMenu;