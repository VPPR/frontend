import { call, put, select } from "redux-saga/effects";
import { logout } from "redux/auth/action";

const httpClient = async (url, parameters) =>
    await fetch(`${process.env.REACT_APP_BACKEND}${url}`, parameters).then(async (response) => {
        const json = await response.json();
        return response.ok ? json : Promise.reject(json);
    });

export default httpClient;

export function* APICall(url, parameters) {
    const { accessToken, expiry } = yield select((state) => state.auth);

    if (new Date(expiry) - new Date() < 30000) {
        let error = new Error();
        error.detail = "Session expired. Please login again";
        yield put(logout());
        throw error;
    }

    if (!parameters.headers) parameters.headers = {};

    parameters.headers.Authorization = `Bearer ${accessToken}`;

    return yield call(httpClient, url, parameters);
}
