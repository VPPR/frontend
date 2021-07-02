import BandZipActions from "./action.type";
import { APICall } from "services/http-client";
import { put, takeEvery, call, all } from "redux-saga/effects";
import { fetchHRVSuccess, fetchHRVFailure, UploadFailure, UploadSuccess } from "./action";

let csvRegex = /([A-Z]*_)*\d*.csv/;

function* UploadFile() {
    yield takeEvery(BandZipActions.UPLOAD, function* (action) {
        try {
            let data = new FormData();
            if (Array.isArray(action.payload)) {
                for (const file of action.payload) {
                    if (csvRegex.test(file.name)) {
                        let filename = csvRegex.exec(file.name);
                        let simplifiedName = filename[0].replace(/_\d*.csv/, "");
                        data.append(simplifiedName, file);
                    } else {
                        data.append("GADGETBRIDGE", file);
                    }
                }
            }
            yield call(APICall, "/miband/upload/", {
                method: "POST",
                body: data,
            });
            yield put(UploadSuccess());
        } catch (error) {
            yield put(UploadFailure(error.detail ?? error.message ?? error));
        }
    });
}

function* FetchHRV() {
    yield takeEvery(BandZipActions.FETCH_LATEST_HRV, function* () {
        try {
            let hrv = yield call(APICall, "/hrv/", {
                method: "GET",
            });
            yield put(fetchHRVSuccess(hrv));
        } catch (error) {
            yield put(fetchHRVFailure(error.detail ?? error.message ?? error));
        }
    });
}

function* BandSaga() {
    yield all([UploadFile(), FetchHRV()]);
}

export default BandSaga;
