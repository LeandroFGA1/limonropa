import React, { useState } from 'react';
import directory from '../assets/imgs/directory';
import { Button } from '@material-tailwind/react';
import { useDispatch, useSelector } from "react-redux";
import { updateProfileAvatar } from '../store/profileSlice';
const Profile = () => {
    const dispatch = useDispatch();
    const email = useSelector((state) => state.auth.email);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [changed,setChanged] =useState(false);

    const handleAvatarClick = (index, value) => {
        setSelectedAvatar(value);
        setSelectedIndex(index);
        setChanged(false);
    };
    const handleSaveAvatar = () => {
        if (email && selectedAvatar) {
            dispatch(updateProfileAvatar({ email, avatar: selectedAvatar })); 
        }
        console.log("Avatar seleccionado:", selectedAvatar);
        setChanged(true);
    };

    return (
        <div className="h-[calc(100vh-100px)] w-[90%] overflow-hidden flex justify-center items-center flex-col gap-10">
            <h2 className="text-center font-bold text-2xl pb-10">
                ¡Elije tu avatar, lo puedes cambiar cuando quieras!
            </h2>
            <ul className="flex items-center justify-center flex-row flex-wrap gap-6 bg-main2/20">
                <li
                    className={` border-[4px] rounded-lg group hover:rotate-45 transition-all ${
                        selectedIndex === 0 ? 'bg-main border-black' : 'bg-main2'
                    }`}
                    onClick={() => handleAvatarClick(0, 'PP')}
                >
                    <div className="w-[100px] h-[100px] hover:bg-white rounded-full  p-2 flex items-center justify-center group-hover:-rotate-45 transition-all">
                        <span className="font-bold text-5xl">PP</span>
                    </div>
                </li>
                {[
                    { src: directory.avatarCat, id:"avatarCat", alt: 'imagen de perfil gato',color:"bg-pink-200" },
                    { src: directory.avatarDog, id:"avatarDog", alt: 'imagen de perfil de perro',color:"bg-blue-400" },
                    { src: directory.avatarLion, id:"avatarLion", alt: 'imagen de perfil de leon',color:"bg-purple-400 " },
                    { src: directory.avatarPig, id:"avatarPig", alt: 'imagen de perfil de cerdo',color:"bg-pink-400" },
                    { src: directory.avatarMonkey, id:"avatarMonkey", alt: 'imagen de perfil de mono',color:"bg-green-600" },
                ].map((avatar, index) => (
                    <li
                        key={index + 1}
                        className={` rounded-lg group hover:rotate-45 transition-all border-[4px] ${
                            selectedIndex === index + 1 ? 'bg-main  border-black' : 'bg-main2'
                        }`}
                        onClick={() => handleAvatarClick(index + 1, avatar.id)}
                    >
                        <div className={`w-[100px] h-[100px] hover:${avatar.color} ${avatar.color=="bg-blue-400"?"hover:bg-blue-400":""} ${avatar.color=="bg-green-600"?"hover:bg-green-600":""}  rounded-full p-2 group-hover:-rotate-45 transition-all`}>
                            <img
                                src={avatar.src}
                                alt={avatar.alt}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </li>
                ))}
            </ul>
            <Button onClick={() => handleSaveAvatar()} className={`${changed?"bg-green-500":""}`}>
                <span className={`${changed?" hidden":"block"}`}>Cambiar</span>
                <span className={` -translate-x-10 ${changed?" block translate-x-0":" hidden"}`}>✔</span>
            
            </Button>

        </div>
    );
};

export default Profile;
