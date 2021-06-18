import { all, call, put, takeEvery } from "redux-saga/effects";

import AuthActionTypes from "./action.type";
import { loginFailure, loginSuccess, signupfailure, signupsuccess } from "./action";
import httpClient from "services/http-client";

function* Login() {
    yield takeEvery(AuthActionTypes.LOGIN, function* (action) {
        try {
            const user = action.payload;
            let form = new FormData();
            form.append("username", user.username);
            form.append("password", user.password);
            const response = yield call(httpClient, "/login/access-token", {
                method: "post",
                body: form,
            });
            yield put(loginSuccess(response));
        } catch (error) {
            yield put(loginFailure(error.detail ?? error.message ?? error));
        }
    });
}

function* SignUp() {
    yield takeEvery(AuthActionTypes.SIGNUP, function* (action) {
        try {
            const response = yield call(httpClient, "/signup", {
                method: "post",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(action.payload),
            });

            yield put(signupsuccess(response));
        } catch (error) {
            yield put(signupfailure(error.detail ?? error.message ?? error));
        }
    });
}

function* AuthSaga() {
    yield all([Login(), SignUp()]);
}
export default AuthSaga;
