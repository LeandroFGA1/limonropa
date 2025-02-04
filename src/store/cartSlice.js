import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  paymentMethod: "",
  totalAmount: 0,
  pdfSent: false, 
  orderCode: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.items.find(item => item.name === product.name);

      if (!existingProduct) {
        state.items.push(product);
      } else {
        existingProduct.quantity += product.quantity;
      }
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const product = state.items.find(item => item.name === name);
      if (product && quantity > 0) {
        product.quantity = quantity;
      }
    },
    removeFromCart: (state, action) => {
      const name = action.payload;
      state.items = state.items.filter(item => item.name !== name);
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    setPdfSent: (state, action) => {
      state.pdfSent = action.payload;
    },
    setOrderCode: (state, action) => {
      state.orderCode = action.payload;
    },
    resetCart: (state) => {
      Object.assign(state, initialState);
    },
    updateProductQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
    
      if (existingItem) {
        existingItem.quantity = quantity; 
      }
    },
    
    
  },
});

export const { 
  addToCart, 
  updateQuantity, 
  removeFromCart, 
  setPaymentMethod, 
  setTotalAmount, 
  setPdfSent,
  setOrderCode,
  resetCart,
  updateProductQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
