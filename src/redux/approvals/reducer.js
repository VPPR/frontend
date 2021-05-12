import ApprovalActionTypes from "./action.type";

const initState = {
    isLoading: false,
    errorMessage: "",
    approvals: [],
    approvedUser: null,
};

const approvalReducer = (state = initState, action) => {
    switch (action.type) {
        case ApprovalActionTypes.FETCH_APPROVAL_REQUESTS:
            return { ...state, errorMessage: "", isLoading: true, approvals: [], approvedUser: null };
        case ApprovalActionTypes.FETCH_APPROVAL_REQUESTS_SUCCESS:
            return {
                ...state,
                approvals: action.payload,
                errorMessage: "",
                isLoading: false,
                approvedUser: null,
            };
        case ApprovalActionTypes.FETCH_APPROVAL_REQUESTS_FAILURE:
            return {
                ...state,
                errorMessage: action.payload,
                isLoading: false,
                approvals: [],
                approvedUser: null,
            };

        case ApprovalActionTypes.APPROVE_REQUEST:
            return { ...state, errorMessage: "", isLoading: true, approvedUser: null };
        case ApprovalActionTypes.APPROVE_REQUEST_SUCCESS:
            return { ...state, isLoading: false, errorMessage: "", approvedUser: action.payload };
        case ApprovalActionTypes.APPROVE_REQUEST_FAILURE:
            return { ...state, isLoading: false, errorMessage: action.payload, approvedUser: null };
        default:
            return state;
    }
};
export default approvalReducer;
