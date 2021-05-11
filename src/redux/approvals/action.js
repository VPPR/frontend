import ApprovalActionTypes from "./action.type";
export const fetchApprovalRequests = () => ({
    type: ApprovalActionTypes.FETCH_APPROVAL_REQUESTS,
});

export const fetchApprovalRequestsSuccess = (users) => ({
    type: ApprovalActionTypes.FETCH_APPROVAL_REQUESTS_SUCCESS,
    payload: users,
});

export const fetchApprovalRequestsFailure = (error) => ({
    type: ApprovalActionTypes.FETCH_APPROVAL_REQUESTS_FAILURE,
    payload: error,
});

export const approveRequest = (userId) => ({
    type: ApprovalActionTypes.APPROVE_REQUEST,
    payload: userId,
});

export const approveRequestSuccess = (user) => ({
    type: ApprovalActionTypes.APPROVE_REQUEST_SUCCESS,
    payload: user,
});

export const approveRequestFailure = (error) => ({
    type: ApprovalActionTypes.APPROVE_REQUEST_FAILURE,
    payload: error,
});
