import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import listeningsReducer from "./features/listenings/listeningSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    listenings: listeningsReducer,
  },
});
