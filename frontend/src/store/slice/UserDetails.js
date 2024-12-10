import { createSlice } from "@reduxjs/toolkit";

const savedUserData = JSON.parse(localStorage.getItem("Info")) || "";

const userSlice = createSlice({
  name: "UserDetails",
  initialState: savedUserData,
  reducers: {
    logout: () => {
      localStorage.removeItem("Info");
    },
  },
});

export default userSlice;
export const userActions = userSlice.actions;