import { all, call, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import UserActionTypes from "./action.type";
import {
    createUserFailure,
    createUserSuccess,
    fetchUserFailure,
    fetchUsers,
    fetchUserSelfFailure,
    fetchUserSelfSuccess,
    fetchUsersFailure,
    fetchUsersSuccess,
    fetchUserSuccess,
    updateUserFailure,
    updateUserSuccess,
} from "./action";
import { APICall } from "services/http-client";

function* CreateUser() {
    yield takeEvery(UserActionTypes.CREATE_USER, function* (action) {
        try {
            const response = yield call(APICall, "/users", {
                method: "post",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(action.payload),
            });

            yield put(createUserSuccess(response));
        } catch (error) {
            yield put(createUserFailure(error.detail ?? error.message ?? error));
        }
    });
}

function* FetchUserSelf() {
    yield takeEvery(UserActionTypes.FETCH_USER_SELF, function* () {
        try {
            let { detail: user } = yield call(APICall, "/users/self", {
                method: "GET",
            });

            yield put(fetchUserSelfSuccess(user));
        } catch (error) {
            yield put(fetchUserSelfFailure(error.detail ?? error.message ?? error));
        }
    });
}

function* FetchUser() {
    yield takeEvery(UserActionTypes.FETCH_USER, function* (action) {
        try {
            let user = yield call(APICall, `/users/${action.payload}`, {
                method: "GET",
            });

            yield put(fetchUserSuccess(user));
        } catch (error) {
            yield put(fetchUserFailure(error.detail ?? error.message ?? error));
        }
    });
}

function* FetchUsers() {
    yield takeEvery(UserActionTypes.FETCH_USERS, function* () {
        try {
            let users = yield call(APICall, `/users/`, {
                method: "GET",
            });

            yield put(fetchUsersSuccess(users));
        } catch (error) {
            yield put(fetchUsersFailure(error.detail ?? error.message ?? error));
        }
    });
}

function* UpdateUser() {
    yield takeEvery(UserActionTypes.UPDATE_USER, function* (action) {
        try {
            let selectedUser = yield select((state) => state.user.selectedUser);

            let user = yield call(APICall, `/users/${selectedUser.id}`, {
                method: "PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(action.payload),
            });

            yield put(updateUserSuccess(user));
        } catch (error) {
            yield put(updateUserFailure(error.detail ?? error.message ?? error));
        }
    });
}

function* RefreshUserList() {
    yield takeLatest([UserActionTypes.UPDATE_USER_SUCCESS], function* (action) {
        yield put(fetchUsers());
    });
}

function* UserSaga() {
    yield all([CreateUser(), FetchUserSelf(), FetchUser(), FetchUsers(), UpdateUser(), RefreshUserList()]);
}

export default UserSaga;
