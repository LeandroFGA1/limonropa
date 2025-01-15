import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { logout } from "../../store/authSlice"; 
import directory from "../../assets/imgs/directory";
import { BASE_URL } from "../../App";

const NavProfileMenu = () => {
    const { email, accessToken, refreshToken } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const getInitials = (email) => {
        if (email) {
            const nameParts = email.split("@")[0]; 
            return nameParts.slice(0, 2).toUpperCase(); 
        }
        return ''; 
    };

    const initials = getInitials(email);

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
        }
    };

    return (
        <Menu>
            <MenuHandler>
                {email ? (
                    <div
                        className="cursor-pointer hover:bg-gray-200 transition-all flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white text-lg font-bold"
                        title={email}
                    >
                        {initials}
                    </div>
                ) : (
                    <Avatar
                        variant="circular"
                        alt="Perfil"
                        className="cursor-pointer hover:bg-gray-200 transition-all"
                        src={directory.userDef}
                    />
                )}
            </MenuHandler>
            <MenuList className="text-black">
                <MenuItem className="flex items-center gap-2" disabled>
                    <img alt="" />
                    <Typography variant="small" className="font-medium">
                        Editar perfil
                    </Typography>
                </MenuItem>
                <MenuItem className="flex items-center gap-2">
                    <img alt="" />
                    {email ? (
                        <Typography
                            variant="small"
                            className="font-bold cursor-pointer"
                            onClick={handleLogout}
                        >
                            Cerrar sesión
                        </Typography>
                    ) : (
                        <Link to={"/access"}>
                            <Typography variant="small" className="font-bold">
                                Iniciar sesión
                            </Typography>
                        </Link>
                    )}
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default NavProfileMenu;
