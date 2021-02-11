import { all, call, put, takeEvery } from "redux-saga/effects";

import AuthActionTypes from "./action.type";
import {
  loginFailure,
  loginSuccess,
  signupfailure,
  signupsuccess,
} from "./action";
import httpClient from "services/http-client";

//Generator Function
function* Login() {
  yield takeEvery(AuthActionTypes.LOGIN, function* (action) {
    try {
      const user = action.payload;
      const response = yield call(
        httpClient,
        `${process.env.REACT_APP_BACKEND}/user/login`,
        {
          method: "post",
          body: JSON.stringify(user),
        },
      );
      yield put(loginSuccess(response));
    } catch (error) {
      yield put(loginFailure(error.detail ?? error));
    }
  });
}

function* SignUp() {
  yield takeEvery(AuthActionTypes.SIGNUP, function* (action) {
    try {
      const response = yield call(
        httpClient,
        `${process.env.REACT_APP_BACKEND}/user/signup`,
        {
          method: "post",
          body: JSON.stringify(action.payload),
        },
      );

      yield put(signupsuccess(response));
    } catch (error) {
      yield put(signupfailure(error.detail ?? error));
    }
  });
}

function* AuthSaga() {
  yield all([Login(), SignUp()]);
}
export default AuthSaga;
