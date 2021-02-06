import AuthActionTypes from "./action.type";

const initState = {
  accessToken: "",
  errorMessage: "",
  expiry: null,
  isLoggedIn: false,
  isLoading: false,
  userType: "user",
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
        isLoggedIn: false,
        accessToken: "",
        userType: action.payload.userType,
      };
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorMessage: "",
        accessToken: action.payload.access_token,
        expiry: Date.parse(action.payload.expiry),
        isLoggedIn: true,
      };
    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
        accessToken: "",
        expiry: null,
        isLoggedIn: false,
      };

    case AuthActionTypes.SIGNUP:
      return {
        isLoading: true,
        errorMessage: "",
        signUpSuccess: false,
      };

    case AuthActionTypes.SIGNUP_SUCCESS:
      return {
        isLoading: false,
        errorMessage: "",
        signUpSuccess: true,
      };

    case AuthActionTypes.SIGNUP_FAILURE:
      return {
        isLoading: false,
        errorMessage: action.payload,
        signUpSuccess: false,
      };

    default:
      return state;
  }
};

export default authReducer;
