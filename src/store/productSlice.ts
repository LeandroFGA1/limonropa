import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define el tipo de producto
interface Product {
    productCode: string;
    productName: string;
    productDescription: string;
    productPrice: number;
    productStock: number;
    categories: number[];
    brand: number;
    imageUrl: string;
    }

interface ProductState {
    products: Product[];
    isLoading: boolean;
}

const initialState: ProductState = {
    products: [],
    isLoading: false,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
        state.isLoading = action.payload;
        },
    },
});

export const { setProducts, setIsLoading } = productSlice.actions;
export default productSlice.reducer;
