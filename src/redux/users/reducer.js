import UserActionTypes from "./action.type";

const initState = {
    currentUser: null,
    errorMessage: "",
    isLoading: false,
};

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case UserActionTypes.FETCH_USER_SELF:
            return {
                currentUser: null,
                errorMessage: "",
                isLoading: true,
            };
        case UserActionTypes.FETCH_USER_SELF_SUCCESS:
            return {
                currentUser: action.payload,
                errorMessage: "",
                isLoading: false,
            };
        case UserActionTypes.FETCH_USER_SELF_FAILURE:
            return {
                currentUser: null,
                errorMessage: action.payload,
                isLoading: false,
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
        default:
            return state;
    }
};

export default userReducer;
