// src/store/orderSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Definir el estado inicial
const initialState = {
    nombre: '',
    id: '',
    direccion: '',
    tracking_number: '', // Esto es el orderCode
    fecha_creacion: '',
    pago: ""
};

// Crear el slice
const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrder: (state, action) => {
            const { nombre, id, direccion, tracking_number, fecha_creacion, pago } = action.payload;
            state.nombre = nombre;
            state.id = id;
            state.direccion = direccion;
            state.tracking_number = tracking_number;  // Aquí es donde se asigna el tracking_number
            state.fecha_creacion = fecha_creacion;
            state.pago = pago;
        },
        resetOrder: () => initialState
    }
});

// Exportar las acciones
export const { setOrder, resetOrder } = orderSlice.actions;

// Exportar el reducer
export default orderSlice.reducer;
