import PHQActions from "./action.type";
import { APICall } from "services/http-client";
import {
    fetchQuestionsSuccess,
    fetchQuestionsFailure,
    postAnswerSuccess,
    postAnswerFailure,
    fetchScoreSuccess,
    fetchScoreFailure,
    fetchDailyScoreSuccess,
    fetchDailyScoreFailure,
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
            yield put(fetchQuestionsFailure(error.detail ?? error.message ?? error));
        }
    });
}

function* PostAnswer() {
    yield takeEvery(PHQActions.POST_ANSWER, function* (action) {
        try {
            yield call(APICall, "/phq/", {
                method: "POST",
                body: JSON.stringify(action.payload),
            });
            yield put(postAnswerSuccess());
        } catch (error) {
            yield put(postAnswerFailure(error.detail ?? error.message ?? error));
        }
    });
}

function* FetchScore() {
    yield takeEvery(PHQActions.FETCH_SCORE, function* () {
        try {
            let score = yield call(APICall, "/phq/score", {
                method: "GET",
            });
            yield put(fetchScoreSuccess(score));
        } catch (error) {
            yield put(fetchScoreFailure(error.detail ?? error.message ?? error));
        }
    });
}

function* FetchDailyScores() {
    yield takeEvery(PHQActions.FETCH_DAILY_SCORES, function* () {
        try {
            let dailyscores = yield call(APICall, "/phq/graph_values", {
                method: "GET",
            });
            yield put(fetchDailyScoreSuccess(dailyscores));
        } catch (error) {
            yield put(fetchDailyScoreFailure(error.detail));
        }
    });
}

function* PHQSaga() {
    yield all([FetchQuestions(), PostAnswer(), FetchScore(), FetchDailyScores()]);
}

export default PHQSaga;
