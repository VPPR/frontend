import PHQActions from "./action.type";
import { APICall } from "services/http-client";
import {
    fetchQuestionsSuccess,
    fetchQuestionsFailure,
    postAnswerSuccess,
    postAnswerFailure,
    fetchScoreSuccess,
    fetchScoreFailure,
} from "./action";

import { all, call, put, takeEvery } from "redux-saga/effects";

function* FetchQuestions() {
    yield takeEvery(PHQActions.FETCH_QUESTIONS, function* () {
        try {
            let questions = yield call(APICall, "/phq/", {
                method: "GET",
            });
            yield put(fetchQuestionsSuccess(questions));
        } catch (error) {
            yield put(fetchQuestionsFailure(error));
        }
    });
}

function* PostAnswer() {
    yield takeEvery(PHQActions.POST_ANSWER, function* (action) {
        try {
            yield call(APICall, "/phq/", {
                method: "POST",
                body: JSON.stringify(Object.fromEntries(action.payload)),
            });
            yield put(postAnswerSuccess());
        } catch (error) {
            yield put(postAnswerFailure(error.detail));
        }
    });
}

function* FetchScore() {
    yield takeEvery(PHQActions.FETCH_SCORE, function* () {
        try {
            let score = yield call(APICall, "/", {
                method: "GET",
            });
            yield put(fetchScoreSuccess(score));
        } catch (error) {
            yield put(fetchScoreFailure(error.detail));
        }
    });
}

function* PHQSaga() {
    yield all([FetchQuestions(), PostAnswer(), FetchScore()]);
}

export default PHQSaga;
