import { createSlice } from "@reduxjs/toolkit";
import { resetCart } from "./cartSlice";

const initialState = {
    email: null,
    accessToken: null,
    refreshToken: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            const { email = null, accessToken = null, refreshToken = null } = action.payload;
            state.email = email;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
        },
        logoutSuccess: (state) => {
            state.email = null;
            state.accessToken = null;
            state.refreshToken = null;
        },
    },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export const logout = () => async (dispatch) => {
    dispatch(logoutSuccess());
    dispatch(resetCart());
};

export default authSlice.reducer;