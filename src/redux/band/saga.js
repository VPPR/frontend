import BandZipActions from "./action.type";
import { APICall } from "services/http-client";
import { put, takeEvery, call } from "redux-saga/effects";
import { UploadFailure, UploadSuccess } from "./action";

function* UploadFile() {
    yield takeEvery(BandZipActions.UPLOAD, function* (action) {
        try {
            let data = new FormData();
            if (Array.isArray(action.payload)) {
                for (const file of action.payload) {
                    let filename = file.name.match(/([A-Z]*_)*\d*.csv/);
                    let simplifiedName = filename[0].replace(/_\d*.csv/, "");
                    data.append(simplifiedName, file);
                }
            } else {
                let filename = action.payload.name.match(/([A-Z]*_)*\d*.csv/);
                let simplifiedName = filename[0].replace(/_\d*.csv/, "");
                data.append(simplifiedName, action.payload.file);
            }
            yield call(APICall, "/miband/upload", {
                method: "POST",
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                body: data,
            });
            yield put(UploadSuccess());
        } catch (error) {
            yield put(UploadFailure(error.detail ?? error.message ?? error));
        }
    });
}
export default UploadFile;
