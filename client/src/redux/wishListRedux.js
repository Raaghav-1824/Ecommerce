import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// import { createSlice } from "@reduxjs/toolkit";

const wishListSlice = createSlice({
  name: "wishlist",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },

    // resetCart: (state) => {
    //   // Set state back to initial values
    //   state.products = [];
    //   state.quantity = 0;
    //   state.total = 0;
    // },

    
  },
});

export const { addProduct, resetCart } = wishListSlice.actions;
export default wishListSlice.reducer;

// // Async thunk for adding a product to the wishlist
// export const addToWishlist = createAsyncThunk(
//     "wishlist/addToWishlist",
//     async (productId, { getState, rejectWithValue }) => {
//       const userId = getState().user.currentUser?.id; // Or getState().user.currentUser?.userId based on payload structure
//       console.log("userID: " , );
  
//       if (!userId) {
//         return rejectWithValue("User ID not found");
//       }
  
//       try {
//         const response = await axios.post("/api/wishlist", { userId, productId });
//         console.log("Data:", response.data);
//         return response.data;
//       } catch (error) {
//         return rejectWithValue("Failed to add to wishlist");
//       }
//     }
//   );
  
// const wishlistSlice = createSlice({
//   name: "wishlist",
//   initialState: { products: [] },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(addToWishlist.fulfilled, (state, action) => {
//         state.products = action.payload.products;
//       })
//       .addCase(addToWishlist.rejected, (state, action) => {
//         console.error(action.payload); // Log error or handle as necessary
//       });
//   },
// });

// export default wishlistSlice.reducer;
