import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/registrationSlice";
import riskReducer from "../features/riskSlice";

export const store = configureStore({
  reducer: {
    register: registerReducer,
    risk: riskReducer,
  },
});
