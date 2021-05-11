import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { APICall } from "services/http-client";
import {
    approveRequestFailure,
    approveRequestSuccess,
    fetchApprovalRequestsFailure,
    fetchApprovalRequestsSuccess,
    fetchApprovalRequests,
} from "./action";
import ApprovalActionTypes from "./action.type";

function* FetchApprovalRequests() {
    yield takeEvery(ApprovalActionTypes.FETCH_APPROVAL_REQUESTS, function* () {
        try {
            let users = yield call(APICall, `/approvals/`, {
                method: "GET",
            });

            yield put(fetchApprovalRequestsSuccess(users));
        } catch (error) {
            yield put(fetchApprovalRequestsFailure(error.detail ?? error.message ?? error));
        }
    });
}

function* ApproveRequest() {
    yield takeEvery(ApprovalActionTypes.APPROVE_REQUEST, function* (action) {
        try {
            let response = yield call(APICall, `/approvals/${action.payload}`, {
                method: "GET",
            });
            yield put(approveRequestSuccess(response.detail));
        } catch (error) {
            yield put(approveRequestFailure(error.detail ?? error.message ?? error));
        }
    });
}

function* RefreshApprovalRequests() {
    yield takeLatest([ApprovalActionTypes.APPROVE_REQUEST_SUCCESS], function* (action) {
        yield put(fetchApprovalRequests());
    });
}

function* ApprovalSaga() {
    yield all([ApproveRequest(), FetchApprovalRequests(), RefreshApprovalRequests()]);
}
export default ApprovalSaga;
