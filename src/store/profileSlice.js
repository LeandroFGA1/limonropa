import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        userProfiles:
            {}
        ,


    },
    reducers: {
        updateProfileAvatar: (state, action) => {
            const { email, avatar } = action.payload;

            console.log("Payload recibido:", action.payload); // Verifica lo que recibes
            console.log("Estado antes de modificar:", state);

            if (email) {
                const normalizedEmail = email.toLowerCase();
                if (!state.userProfiles) {
                    console.warn("userProfiles no estaba definido, se inicializa como objeto");
                    state.userProfiles = {};
                }
                state.userProfiles[normalizedEmail] = avatar; // Usa el email normalizado como clave
                console.log("Estado actual de userProfiles antes de modificar:", state.userProfiles);
                console.log("Estado después de modificar:", state);
                console.log("Estado actualizado de userProfiles:", state.userProfiles);
            } else {
                console.warn("El email no está definido en el payload");
            }
        },

    },
});
export const getProfileAvatar = (state, email) => {
    if (!email) {
        console.warn("Email es nulo o indefinido en getProfileAvatar");
        return ""; // Devuelve un valor predeterminado si el email no está disponible
    }
    const normalizedEmail = email.toLowerCase(); // Normaliza el email
    const profiles = state.profile.userProfiles;
    console.log("Estado de userProfiles dentro del selector:", profiles);
    console.log("Email dentro del selector:", email);
    if (!profiles || typeof profiles !== "object" || Array.isArray(profiles)) {
        console.error("Formato incorrecto de userProfiles:", profiles);
        return email ? email.slice(0, 2).toUpperCase() : "";
    }
    if (state.profile.userProfiles && email) {
        return state.profile.userProfiles[email] || email.slice(0, 2).toUpperCase();
    }
    const avatar = profiles[normalizedEmail];
    console.log("Avatar encontrado en userProfiles:", avatar);


    return avatar || email.slice(0, 2).toUpperCase();
};

export const { updateProfileAvatar } = profileSlice.actions;

export const profileReducer = profileSlice.reducer;