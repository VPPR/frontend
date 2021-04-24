import { all } from "redux-saga/effects";
import AuthSaga from "redux/auth/saga";
import UserSaga from "redux/users/saga";
import UploadSaga from "redux/band/saga";
const rootSaga = function* () {
    yield all([AuthSaga(), UserSaga(), UploadSaga()]);
};

export default rootSaga;
