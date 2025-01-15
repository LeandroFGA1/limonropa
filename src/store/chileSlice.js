import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    regions: [],
    communes: {},
};

const chileSlice = createSlice({
    name: 'chileData',
    initialState,
    reducers: {
        setRegions: (state, action) => {
        state.regions = action.payload;
        },
        setCommunes: (state, action) => {
        const { regionId, communes } = action.payload;
        state.communes[regionId] = communes;
        },
        reset: (state) => {
        state.regions = [];
        state.communes = {};
        },
    },
});

export const { setRegions, setCommunes, reset } = chileSlice.actions;
export default chileSlice.reducer;
