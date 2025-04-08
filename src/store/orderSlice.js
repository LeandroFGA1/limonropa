import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pedido: null,       // contiene lo que retorna /api/pedidos/
  guestData: null     // contiene los datos del formulario del invitado
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.pedido = action.payload;
    },
    setGuestData: (state, action) => {
      state.guestData = action.payload;
    },
    resetOrder: () => initialState
  }
});

export const { setOrder, setGuestData, resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
