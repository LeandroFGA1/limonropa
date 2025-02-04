import React, { useState, useEffect } from 'react';
import directory from '../assets/imgs/directory';
import { Button } from '@material-tailwind/react';
import { useDispatch, useSelector } from "react-redux";
import { updateProfileAvatar } from '../store/profileSlice';
import store from "../store/store.js";

const Profile = () => {
    const dispatch = useDispatch();
    const email = useSelector((state) => state.auth.email);
    const userProfiles = useSelector((state) => state.profile.userProfiles);
    const initialAvatar = email ? userProfiles[email.toLowerCase()] : null;
    const [selectedAvatar, setSelectedAvatar] = useState(initialAvatar);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        if (initialAvatar) {
            const avatarIndex = avatarOptions.findIndex(avatar => avatar.id === initialAvatar);
            setSelectedIndex(avatarIndex >= 0 ? avatarIndex + 1 : null);
        }
    }, [initialAvatar]);

    const avatarOptions = [
        { src: directory.avatarCat, id: "avatarCat", alt: 'imagen de perfil gato' },
        { src: directory.avatarDog, id: "avatarDog", alt: 'imagen de perfil de perro' },
        { src: directory.avatarLion, id: "avatarLion", alt: 'imagen de perfil de leon' },
        { src: directory.avatarPig, id: "avatarPig", alt: 'imagen de perfil de cerdo'},
        { src: directory.avatarMonkey, id: "avatarMonkey", alt: 'imagen de perfil de mono' },
    ];

    const handleAvatarClick = (index, value) => {
        setSelectedAvatar(value);
        setSelectedIndex(index);
        setChanged(false);
    };

    const handleSaveAvatar = () => {
        console.log("Avatar seleccionado para guardar:", selectedAvatar);
        console.log("Email actual del usuario:", email);
        console.log("Estado de userProfiles antes de despachar:", store.getState().profile.userProfiles);
        if (email && selectedAvatar) {
            const normalizedEmail = email.toLowerCase();
            dispatch(updateProfileAvatar({ email: normalizedEmail, avatar: selectedAvatar }));
            console.log("Acción despachada para updateProfileAvatar:", {
                email: normalizedEmail,
                avatar: selectedAvatar,
            });
        } else {
            console.warn("No se pudo guardar el avatar: email o avatar están indefinidos");
        }
        console.log("Estado de userProfiles después de despachar:", store.getState().profile.userProfiles);
        setChanged(true);
    };

    return (
        <div className="min-h-[calc(100vh-100px)] h-fit w-[90%] overflow-hidden flex justify-center items-center flex-col gap-10">
            <h2 className="text-center font-bold text-2xl pb-10">
                ¡Elije tu avatar, lo puedes cambiar cuando quieras!
            </h2>

            {/* Muestra el avatar actual */}
            {initialAvatar && (
                <div className="flex flex-col items-center mb-10">
                    <h3 className="font-semibold text-xl mb-4">Tu imagen de perfil actual:</h3>
                    <div className="w-[100px] h-[100px] rounded-full border-[4px] bg-blue-500 flex items-center justify-center">
                        {avatarOptions.find(avatar => avatar.id === initialAvatar)?.src ? (
                            <img
                                src={avatarOptions.find(avatar => avatar.id === initialAvatar).src}
                                alt="Imagen de perfil actual"
                                className="h-full w-full object-cover rounded-full"
                            />
                        ) : (
                            <span className="font-bold text-3xl">{initialAvatar}</span>
                        )}
                    </div>
                </div>
            )}
            

            {/* Opciones de avatares */}
            <ul className="flex items-center justify-center flex-row flex-wrap gap-6 bg-main2/40 p-5 rounded-md">
                {avatarOptions
                    .filter(avatar => avatar.id !== initialAvatar) 
                    .map((avatar, index) => (
                        <li
                            key={index + 1}
                            className={`rounded-lg group hover:rotate-45 transition-all border-[4px] ${
                                selectedIndex === index + 1 ? 'bg-main border-black' : 'bg-main2'
                            }`}
                            onClick={() => handleAvatarClick(index + 1, avatar.id)}
                        >
                            <div
                                className={`w-[100px] h-[100px]  rounded-full p-2 group-hover:-rotate-45 transition-all`}
                            >
                                <img
                                    src={avatar.src}
                                    alt={avatar.alt}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </li>
                    ))}
            </ul>

            {/* Botón para guardar */}
            <Button onClick={handleSaveAvatar} className={`${changed ? "bg-green-500" : ""}`}>
                <span className={`${changed ? "hidden" : "block"}`}>Cambiar</span>
                <span className={`-translate-x-10 ${changed ? "block translate-x-0" : "hidden"}`}>✔️</span>
            </Button>
        </div>
    );
};

export default Profile;