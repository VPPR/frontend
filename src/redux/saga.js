import { all } from "redux-saga/effects";
import AuthSaga from "redux/auth/saga";
import UserSaga from "redux/users/saga";
import BandSaga from "redux/band/saga";
import PHQSaga from "redux/phq/saga";
const rootSaga = function* () {
    yield all([AuthSaga(), UserSaga(), BandSaga(), PHQSaga()]);
};

export default rootSaga;
