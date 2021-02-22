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
import httpClient from "services/http-client";

function* FetchUserSelf() {
  yield takeEvery(UserActionTypes.FETCH_USER_SELF, function* () {
    try {
      let token = yield select((state) => state.auth.accessToken);
      let user = yield call(
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
//NOT ADDED IN BACKEND YET
function* FetchUser() {
  yield takeEvery(UserActionTypes.FETCH_USER, function* (action) {
    try {
      let token = yield select((state) => state.auth.accessToken);

      let user = yield call(
        httpClient,
        `${process.env.REACT_APP_BACKEND}/users/${action.payload}`,
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
//NOT ADDED IN BACKEND YET
function* FetchUsers() {
  yield takeEvery(UserActionTypes.FETCH_USERS, function* (action) {
    try {
      let token = yield select((state) => state.auth.accessToken);

      let user = yield call(
        httpClient,
        `${process.env.REACT_APP_BACKEND}/users/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      yield put(fetchUsersSuccess(user));
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
        `${process.env.REACT_APP_BACKEND}/users/${selectedUser.id}`,
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

function* CreateUser() {
  yield takeEvery(UserActionTypes.CREATE_USER, function* (action) {
    try {
      let token = yield select((state) => state.auth.accessToken);

      let user = yield call(
        httpClient,
        `${process.env.REACT_APP_BACKEND}/users`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(action.payload),
        },
      );

      yield put(createUserSuccess(user));
    } catch (error) {
      yield put(createUserFailure(error.detail));
    }
  });
}

function* RefreshUserList() {
  yield takeLatest([
    UserActionTypes.UPDATE_USER_SUCCESS,
    UserActionTypes.CREATE_USER_SUCCESS,
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
    CreateUser(),
    RefreshUserList(),
  ]);
}

export default UserSaga;
