import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";

import AuthActionTypes from "redux/auth/action.type";
import authReducer from "redux/auth/reducer";
import userReducer from "redux/users/reducer";

const persistConfig = {
  key: "vppr",
  storage: storage,
  whitelist: ["auth"],
};

const mainReducer = persistCombineReducers(persistConfig, {
  auth: authReducer,
  user: userReducer,
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
