
import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        userProfiles: [
            {"soyyo":"holaa"}
        ],
    },
    reducers: {
        updateProfileAvatar: (state, action) => {
            const { email, avatar } = action.payload;
            alert(email);
            alert(avatar);
            if (!email || !avatar) {
                alert("Email o avatar no proporcionado");
                return state;
            }

            // ME ESTOY MURIENDOOO
            state.userProfiles.push({ email, avatar });
            
            alert(`Nuevo perfil añadido: ${JSON.stringify({ email, avatar })}`);
            
        },
    },
});
export const getProfileAvatar = (state, email) => {
    if (state.profile.userProfiles && email) {
        return state.profile.userProfiles[email] || email.slice(0, 2).toUpperCase();
    }
    return email ? email.slice(0, 2).toUpperCase() : ''; 
};

export const { updateProfileAvatar } = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
