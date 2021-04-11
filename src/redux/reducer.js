import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createFilter from "redux-persist-transform-filter";
import AuthActionTypes from "redux/auth/action.type";
import authReducer from "redux/auth/reducer";
import userReducer from "redux/users/reducer";
import bandReducer from "./band/reducer";
import uploadReducer from './band/zip/reducer';

const authFilter = createFilter("auth", [
  "accessToken",
  "expiry",
  "isLoggedIn",
]);

const persistConfig = {
  key: "vppr",
  storage: storage,
  whitelist: ["auth"],
  transforms: [authFilter],
};

const mainReducer = persistCombineReducers(persistConfig, {
  auth: authReducer,
  user: userReducer,
  band: bandReducer,
  upload: uploadReducer
});

const rootReducer = (state, action) => {
  if (action.type === AuthActionTypes.LOGOUT) {
    storage.removeItem("persist:vppr");
    const persist = { ...state._persist };
    state = {};
    state._persist = persist;
  }

  return mainReducer(state, action);
};

export default rootReducer;
