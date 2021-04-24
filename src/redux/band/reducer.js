import BandZipActions from "./action.type";

const initState = {
    isLoading: false,
    errorMessage: "",
};

const zipReducer = (state = initState, action) => {
    switch (action.type) {
        case BandZipActions.UPLOAD:
            return { isLoading: true, errorMessage: "" };
        case BandZipActions.UPLOAD_SUCCESS:
            return { isLoading: false, errorMessage: "" };
        case BandZipActions.UPLOAD_FAILURE:
            return { isLoading: false, errorMessage: action.payload };
        default:
            return state;
    }
};

export default zipReducer;
