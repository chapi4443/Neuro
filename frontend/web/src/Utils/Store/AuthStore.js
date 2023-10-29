import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  InputRegister: [],
  InputLogin: [],
  InputForgotPassword: [],
  InputRestPassword: [],
};

const AuthStore = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setRegisterData(state) {},
    setRegister(state, action) {
      const newData = action.payload;
      state.InputRegister.push({
        email: newData.email,
        password: newData.password,
        first_name: newData.first_name,
        last_name: newData.last_name,
        date_of_birth: newData.date_of_birth,
        phone_number: newData.phone_number,
        address: newData.address,
        city: newData.city,
        age: newData.age,
        gender: newData.gender,
        country: newData.country,
      });
    },
    setLoginData(state) {},
    setLogin(state, action) {
      const newData = action.payload;
      state.InputLogin.push({
        email: newData.email,
        password: newData.password,
      });
    },
    setForgotPasswordData(state) {},
    setForgotPassword(state, action) {
      const newData = action.payload;
      state.InputForgotPassword.push({
        email: newData.email,
      });
    },
    setRestPasswordData(state) {},
    setRestPassword(state, action) {
      const newData = action.payload;
      state.InputRestPassword.push({
        email: newData.email,
        password: newData.password,
      });
    },
  },
});

export const {
  setRegister,
  setRegisterData,
  setLoginData,
  setLogin,
  setForgotPasswordData,
  setForgotPassword,
  setRestPasswordData,
  setRestPassword,
} = AuthStore.actions;

export default AuthStore.reducer;
