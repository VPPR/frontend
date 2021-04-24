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
