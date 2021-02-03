import { call, put, takeEvery } from "redux-saga/effects";

import AuthActionTypes from "./action.type";
import { loginFailure, loginSuccess } from "./action";
import httpClient from "services/http-client";

function* Login() {
  yield takeEvery(AuthActionTypes.LOGIN, function* (action) {
    try {
      const response = yield call(
        httpClient,
        `${process.env.REACT_APP_BACKEND}/admin/login`,
        {
          method: "post",
          body: JSON.stringify(action.payload),
        },
      );
      yield put(loginSuccess(response));
    } catch (error) {
      yield put(loginFailure(error.detail ?? error));
    }
  });
}

export default Login;
