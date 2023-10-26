import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { setLoginData, setRegisterData } from "../Store/AuthStore";
import { Login, SignUp } from "../API/AuthAPI";
import {
  StrokeAssementdata,
  StrokeRecommendations,
  Strokepredictor,
} from "../API/PredictionApi";
import {
  getStrokeRecommendationsData,
  setStrokeRecommendationsData,
  setStrokepredictorData,
} from "../Store/PredictionStore";

export function* watchFetchNeuro() {
  yield takeLatest("auth/setRegister", fetchSetRegister);
  yield takeLatest("auth/setLogin", fetchSetLogin);
  yield takeLatest("prediction/setStrokepredictor", fetchSetStrokepredictor);
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
