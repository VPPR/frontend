import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";

import AuthActionTypes from "./auth/action.type";
import authReducer from 'redux/auth/reducer';


const persistConfig = {
  key: "vppr",
  storage: storage,
  whitelist: [],
};

const mainReducer = persistCombineReducers(persistConfig, {
    auth: authReducer,
  });

const rootReducer = (state, action) => {
  if (action === AuthActionTypes.LOGOUT) {
    storage.removeItem("persist:auth");
    state.auth = undefined;
  }

  return mainReducer(state,action);
};

export default rootReducer;
