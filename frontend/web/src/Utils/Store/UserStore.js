import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  InputUser: [],
  OutputUser: [],
  InputUserUpdate:[],
};

const UserStore = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    getUserData(state, action) {
      state.OutputUser = action.payload;
    },
    getUser(state, action) {
      const newData = action.payload;
      state.InputUser.push({
        id: newData.userId,
      });
    },
    setUpdateUserData(state) {},
    setUpdateUser(state, action) {
      const newData = action.payload;
      state.InputUserUpdate.push({
        userId: newData.userId,
        first_name: newData.first_name,
        last_name: newData.last_name,
        gender: newData.gender,
        date_of_birth: newData.date_of_birth,
        age: newData.age,
        phone_number: newData.phone_number,
        country: newData.country,
        city: newData.city,
        address: newData.address,
      });
    },
  },
});

export const { getUserData, getUser,setUpdateUserData,setUpdateUser } = UserStore.actions;

export default UserStore.reducer;
