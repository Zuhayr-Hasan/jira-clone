import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import employeeReducer from "../slices/employeeSlice";
import managerReducer from "../slices/managerSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
    manager: managerReducer,
  },
});

export default store;
