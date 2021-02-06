import { all } from "redux-saga/effects";
import AuthSaga from "redux/auth/saga";

const rootSaga = function* () {
  yield all([
    AuthSaga(),
  ]);
};

export default rootSaga;
