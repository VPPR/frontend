import BandZipActions from "./action.type";
import { APICall } from "services/http-client";
import { put, takeEvery, call } from "redux-saga/effects";
import { UploadFailure, UploadSuccess } from "./action";

let csvRegex = /([A-Z]*_)*\d*.csv/;
let sqliteTypes = ["application/x-sqlite3", ".sqlite3", ".db"];
function* UploadFile() {
    yield takeEvery(BandZipActions.UPLOAD, function* (action) {
        try {
            let data = new FormData();
            if (Array.isArray(action.payload)) {
                for (const file of action.payload) {
                    if (csvRegex.test(file.name)) {
                        let filename = csvRegex.exec(file.name);
                        let simplifiedName = filename.replace(/_\d*.csv/, "");
                        data.append(simplifiedName, file);
                    } else if (sqliteTypes.some((x) => file.type.includes(x) || file.name.includes(x))) {
                        data.append("GADGETBRIDGE", file);
                    }
                }
            }
            yield call(APICall, "/miband/upload", {
                method: "POST",
                body: data,
            });
            yield put(UploadSuccess());
        } catch (error) {
            yield put(UploadFailure(error.detail ?? error.message ?? error));
        }
    });
}
export default UploadFile;
