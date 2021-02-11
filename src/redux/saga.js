import { all } from "redux-saga/effects";
import AuthSaga from "redux/auth/saga";
import UserSaga from "redux/users/saga";
const rootSaga = function* () {
  yield all([
    AuthSaga(),
    UserSaga(),
  ]);
};

export default rootSaga;
