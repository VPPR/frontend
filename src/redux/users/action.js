import UserActionTypes from "./action.type";

export const fetchUserSelf = () => ({
    type: UserActionTypes.FETCH_USER_SELF,
});

export const fetchUserSelfSuccess = (user) => ({
    type: UserActionTypes.FETCH_USER_SELF_SUCCESS,
    payload: user,
});

export const fetchUserSelfFailure = (error) => ({
    type: UserActionTypes.FETCH_USER_SELF_FAILURE,
    payload: error,
});

export const fetchUser = (id) => ({
    type: UserActionTypes.FETCH_USER,
    payload: id,
});

export const fetchUserSuccess = (user) => ({
    type: UserActionTypes.FETCH_USER_SUCCESS,
    payload: user,
});

export const fetchUserFailure = (error) => ({
    type: UserActionTypes.FETCH_USER_FAILURE,
    payload: error,
});

export const fetchUsers = () => ({
    type: UserActionTypes.FETCH_USERS,
});

export const fetchUsersSuccess = (users) => ({
    type: UserActionTypes.FETCH_USERS_SUCCESS,
    payload: users,
});

export const fetchUsersFailure = (error) => ({
    type: UserActionTypes.FETCH_USERS_FAILURE,
    payload: error,
});

export const updateUser = (userUpdate) => ({
    type: UserActionTypes.UPDATE_USER,
    payload: userUpdate,
});

export const updateUserSuccess = (user) => ({
    type: UserActionTypes.UPDATE_USER_SUCCESS,
    payload: user,
});

export const updateUserFailure = (error) => ({
    type: UserActionTypes.UPDATE_USER_FAILURE,
    payload: error,
});
