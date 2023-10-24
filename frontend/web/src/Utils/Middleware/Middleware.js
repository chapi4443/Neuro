import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { setLoginData, setRegisterData } from "../Store/AuthStore";
import { Login, SignUp } from "../API/AuthAPI";

export function* watchFetchNeuro() {
  yield takeLatest("auth/setRegister", fetchSetRegister);
  yield takeLatest("auth/setLogin", fetchSetLogin);
}

// Authentication and Authorization data

function* fetchSetRegister(action) {
  try {
    yield call(SignUp, action.payload.data);
    yield setRegisterData();
  } catch (error) {
    toast.error(error.response.data.msg);
    console.error("Saga Error:", error);
  }
}

function* fetchSetLogin(action) {
  try {
    yield call(Login, action.payload.data);
    yield setLoginData();
  } catch (error) {
    toast.error(error.response.data.msg);
    console.error("Saga Error:", error);
  }
}
