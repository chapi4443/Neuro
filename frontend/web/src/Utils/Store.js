import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { watchFetchNeuro } from "./Middleware/Middleware";
import AuthStore from "./Store/AuthStore";
import PredictionStore from "./Store/PredictionStore";
import UserStore from "./Store/UserStore";
const sagaMiddleware = createSagaMiddleware();

const Store = configureStore({
  reducer: {
    AuthStore: AuthStore,
    PredictionStore: PredictionStore,
    UserStore: UserStore,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(watchFetchNeuro);

export default Store;
