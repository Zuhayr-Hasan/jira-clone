  // src/slices/authSlice.js
  import { createSlice } from "@reduxjs/toolkit";

  const initialState = {
    isAuthenticated: false,
    userId: null,
    role: null,
    email: "", // Adding role property to the initial state
    role: "",
  };

  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      login: (state, action) => {
        state.isAuthenticated = true;
        state.userId = action.payload.userId;
        // console.log(action.payload)
        state.email = action.payload.email;
        state.role = action.payload.role
        console.log("PAYLOAD__", action.payload);
      },
      logout: (state) => {
        state.isAuthenticated = false;
        // state.role = null; // Reset role when logging out
      },
      setRole: (state, action) => {
        state.role = action.payload;
      },
    },
  });

  export const { login, logout, setRole } = authSlice.actions;

  export default authSlice.reducer;
