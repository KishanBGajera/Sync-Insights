import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/UserDetails";

const store = configureStore({
  reducer: {
    UserDetails: userSlice.reducer,
  },
});

export default store;
