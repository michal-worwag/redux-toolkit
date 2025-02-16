import { Product } from '@/models/product';
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit/react';

export type CartItem = Partial<Product>;

export interface CartState {
  cartItems: CartItem[]; // local cart items
  asyncCartItems: CartItem[]; // async cart items
  amount: number;
  total: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// initial state
const initialState: CartState = {
  cartItems: [],
  asyncCartItems: [],
  amount: 0,
  total: 0,
  status: 'idle',
  error: null,
};

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://dummyjson.com/carts/1');
      if (!response.ok) {
        throw new Error('Server Error');
      }
      return await response.json();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.asyncCartItems = action.payload.products;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const { addToCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
