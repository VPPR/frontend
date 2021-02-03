import { all } from "redux-saga/effects";

import login from 'redux/auth/saga';

const rootSaga = function* () {
  yield all([
    login(),
  ]);
};

export default rootSaga;
