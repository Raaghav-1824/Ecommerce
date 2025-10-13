import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    isAuthenticated : false
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false; // ensure error is cleared on new attempt

    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },    
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout:(state)=>{
      state.currentUser = null;
      state.error = false;
      state.isAuthenticated= false;
    }, 
    register:(state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    registerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    }
  },
});

export const { loginStart, loginSuccess, loginFailure , logout , register, registerSuccess, registerFailure } = userSlice.actions;
export default userSlice.reducer;