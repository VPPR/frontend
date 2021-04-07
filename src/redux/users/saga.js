import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";

import UserActionTypes from "./action.type";
import {
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
import httpClient from "services/http-client";

function* FetchUserSelf() {
  yield takeEvery(UserActionTypes.FETCH_USER_SELF, function* () {
    try {
      let token = yield select((state) => state.auth.accessToken);
      let { detail: user } = yield call(
        httpClient,
        "/users/self",
        {
          method: "GET",
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );

      yield put(fetchUserSelfSuccess(user));
    } catch (error) {
      yield put(fetchUserSelfFailure(error.detail));
    }
  });
}

function* FetchUser() {
  yield takeEvery(UserActionTypes.FETCH_USER, function* (action) {
    try {
      let token = yield select((state) => state.auth.accessToken);

      let user = yield call(
        httpClient,
        `/users/${action.payload}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      yield put(fetchUserSuccess(user));
    } catch (error) {
      yield put(fetchUserFailure(error.detail));
    }
  });
}

function* FetchUsers() {
  yield takeEvery(UserActionTypes.FETCH_USERS, function* (action) {
    try {
      let token = yield select((state) => state.auth.accessToken);

      let users = yield call(
        httpClient,
        `/users/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      yield put(fetchUsersSuccess(users));
    } catch (error) {
      yield put(fetchUsersFailure(error.detail));
    }
  });
}

function* UpdateUser() {
  yield takeEvery(UserActionTypes.UPDATE_USER, function* (action) {
    try {
      let token = yield select((state) => state.auth.accessToken);
      let selectedUser = yield select((state) => state.user.selectedUser);

      let user = yield call(
        httpClient,
        `/users/${selectedUser.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(action.payload),
        },
      );

      yield put(updateUserSuccess(user));
    } catch (error) {
      yield put(updateUserFailure(error.detail));
    }
  });
}

function* RefreshUserList() {
  yield takeLatest([
    UserActionTypes.UPDATE_USER_SUCCESS,
  ], function* (action) {
    yield put(fetchUsers());
  });
}

function* UserSaga() {
  yield all([
    FetchUserSelf(),
    FetchUser(),
    FetchUsers(),
    UpdateUser(),
    RefreshUserList(),
  ]);
}

export default UserSaga;
