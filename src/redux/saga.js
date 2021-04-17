import { all } from "redux-saga/effects";
import AuthSaga from "redux/auth/saga";
import UserSaga from "redux/users/saga";
import BandSaga from "redux/band/saga";
import UploadSaga from "redux/band/saga";
const rootSaga = function* () {
  yield all([
    AuthSaga(),
    UserSaga(),
    BandSaga(),
    UploadSaga()
  ]);
};

export default rootSaga;
