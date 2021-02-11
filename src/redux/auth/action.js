import AuthActionTypes from "./action.type";

export const login = (user) => ({
  type: AuthActionTypes.LOGIN,
  payload: user,
});

export const loginSuccess = (accessToken) => ({
  type: AuthActionTypes.LOGIN_SUCCESS,
  payload: accessToken,
});

export const loginFailure = (error) => ({
  type: AuthActionTypes.LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: AuthActionTypes.LOGOUT,
});

export const signup = (user) => ({
  type: AuthActionTypes.SIGNUP,
  payload: user,
});

export const signupsuccess = () => ({
  type: AuthActionTypes.SIGNUP_SUCCESS,
});

export const signupfailure = (error) => ({
  type: AuthActionTypes.SIGNUP_FAILURE,
  payload: error,
});
