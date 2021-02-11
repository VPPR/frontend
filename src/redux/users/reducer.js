import UserActionTypes from "./action.type";

const initState = {
  currentUser: null,
  errorMessage: "",
  isLoading: false,
  //selectedUser: null,
  //users: [],
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case UserActionTypes.FETCH_USER_SELF:
      return {
        //...state,
        currentUser: null,
        errorMessage: "",
        isLoading: true,
        //selectedUser: null,
      };
    case UserActionTypes.FETCH_USER_SELF_SUCCESS:
      return {
        //...state,
        currentUser: action.payload,
        errorMessage: "",
        isLoading: false,
        //selectedUser: null,
      };
    case UserActionTypes.FETCH_USER_SELF_FAILURE:
      return {
        //...state,
        currentUser: null,
        errorMessage: action.payload,
        isLoading: false,
        //selectedUser: null,
      };

    case UserActionTypes.FETCH_USER:
      return {
        ...state,
        selectedUser: null,
        errorMessage: "",
        isLoading: true,
      };
    case UserActionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        selectedUser: action.payload,
        errorMessage: "",
        isLoading: false,
      };
    case UserActionTypes.FETCH_USER_FAILURE:
      return {
        ...state,
        selectedUser: null,
        errorMessage: action.payload,
        isLoading: false,
      };

    case UserActionTypes.FETCH_USERS:
      return { ...state, errorMessage: "", isLoading: true, users: [] };
    case UserActionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        errorMessage: "",
        isLoading: false,
      };
    case UserActionTypes.FETCH_USERS_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        isLoading: false,
        users: [],
      };

    case UserActionTypes.UPDATE_USER:
      return { ...state, errorMessage: "", isLoading: true };
    case UserActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        selectedUser: action.payload,
        errorMessage: "",
        isLoading: false,
      };
    case UserActionTypes.UPDATE_USER_FAILURE:
      return { ...state, errorMessage: action.payload, isLoading: false };

    case UserActionTypes.CREATE_USER:
      return { ...state, errorMessage: "", isLoading: true };
    case UserActionTypes.CREATE_USER_SUCCESS:
      return {
        ...state,
        errorMessage: "",
        isLoading: false,
        selectedUser: action.payload,
      };
    case UserActionTypes.CREATE_USER_FAILURE:
      return { ...state, errorMessage: action.payload, isLoading: false };

    default:
      return state;
  }
};

export default userReducer;
