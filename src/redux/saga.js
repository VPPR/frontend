import { all } from "redux-saga/effects";
import AuthSaga from "redux/auth/saga";
import UserSaga from "redux/users/saga";
import UploadSaga from "redux/band/saga";
import PHQSaga from "redux/phq/saga";
const rootSaga = function* () {
    yield all([AuthSaga(), UserSaga(), UploadSaga(), PHQSaga()]);
};

export default rootSaga;
