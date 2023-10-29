import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import {
  setForgotPasswordData,
  setLoginData,
  setRegisterData,
  setRestPasswordData,
} from "../Store/AuthStore";
import { ForgotPassword, Login, RestPassword, SignUp } from "../API/AuthAPI";
import {
  StrokeAssementdata,
  StrokeRecommendations,
  Strokepredictor,
} from "../API/PredictionApi";
import {
  getChatHistoryData,
  getStrokeRecommendationsData,
  setStrokeRecommendationsData,
  setStrokepredictorData,
} from "../Store/PredictionStore";
import { getUserData, setUpdateUserData } from "../Store/UserStore";
import { UpdateUser, getUser } from "../API/UserApi";
import { getMedicalchathistory } from "../API/MedicalApi";

export function* watchFetchNeuro() {
  yield takeLatest("auth/setRegister", fetchSetRegister);
  yield takeLatest("auth/setLogin", fetchSetLogin);
  yield takeLatest("auth/setRestPassword", fetchSetRestPassword);
  yield takeLatest("auth/setForgotPassword", fetchSetForgotPassword);
  yield takeLatest("user/getUser", fetchGetUser);
  yield takeLatest("user/setUpdateUser", fetchSetUserUpdate);
  yield takeLatest("prediction/setStrokepredictor", fetchSetStrokepredictor);
  yield takeLatest("prediction/getChatHistory", fetchGetChatHistory);
  yield takeLatest(
    "prediction/getStrokeRecommendations",
    fetchGetStrokeRecommendations
  );
  yield takeLatest(
    "prediction/setStrokeRecommendations",
    fetchSetStrokeRecommendations
  );
}

// Authentication and Authorization data

function* fetchSetRegister(action) {
  try {
    yield call(SignUp, action.payload.data);
    yield setRegisterData();
  } catch (error) {
    toast.error(error.response.data.error[0]);
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

function* fetchSetStrokeRecommendations(action) {
  try {
    const Data = yield call(StrokeRecommendations, action.payload);
    yield put(setStrokeRecommendationsData(Data));
  } catch (error) {
    toast.error(error.response.data.msg);
    console.error("Saga Error:", error);
  }
}

function* fetchSetStrokepredictor(action) {
  try {
    const Data = yield call(Strokepredictor, action.payload);
    yield put(setStrokepredictorData(Data));
  } catch (error) {
    toast.error(error.response.data.msg);
    console.error("Saga Error:", error);
  }
}

function* fetchGetStrokeRecommendations(action) {
  try {
    const Data = yield call(StrokeAssementdata, action.payload.data);
    yield put(getStrokeRecommendationsData(Data));
  } catch (error) {
    toast.error(error.response.data.msg);
    console.error("Saga Error:", error);
  }
}

function* fetchGetUser(action) {
  try {
    const Data = yield call(getUser, action.payload.data);
    yield put(getUserData(Data));
  } catch (error) {
    toast.error(error.response.data.msg);
    console.error("Saga Error:", error);
  }
}

function* fetchSetUserUpdate(action) {
  try {
    yield call(UpdateUser, action.payload.data);
    yield setUpdateUserData();
  } catch (error) {
    toast.error(error.response.data.msg);
    console.error("Saga Error:", error);
  }
}

function* fetchGetChatHistory(action) {
  try {
    const Data = yield call(getMedicalchathistory, action.payload.data);
    yield put(getChatHistoryData(Data));
  } catch (error) {
    toast.error(error.response.data.msg);
    console.error("Saga Error:", error);
  }
}

function* fetchSetForgotPassword(action) {
  try {
    yield call(ForgotPassword, action.payload.data);
    yield setForgotPasswordData();
  } catch (error) {
    toast.error(error.response.data.error);
    console.error("Saga Error:", error);
  }
}

function* fetchSetRestPassword(action) {
  try {
    yield call(RestPassword, action.payload.data);
    yield setRestPasswordData();
  } catch (error) {
    toast.error(error.response.data.error);
    console.error("Saga Error:", error);
  }
}