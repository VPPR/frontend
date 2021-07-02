import BandZipActions from "./action.type";

export const Upload = (files) => ({
    type: BandZipActions.UPLOAD,
    payload: files,
});

export const UploadSuccess = () => ({
    type: BandZipActions.UPLOAD_SUCCESS,
});

export const UploadFailure = (error) => ({
    type: BandZipActions.UPLOAD_FAILURE,
    payload: error,
});

export const fetchHRV = () => ({
    type: BandZipActions.FETCH_LATEST_HRV,
});

export const fetchHRVSuccess = (hrv) => ({
    type: BandZipActions.FETCH_LATEST_HRV_SUCCESS,
    payload: hrv,
});

export const fetchHRVFailure = (error) => ({
    type: BandZipActions.FETCH_LATEST_HRV_FAILURE,
    payload: error,
});
