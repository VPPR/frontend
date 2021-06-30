import BandZipActions from "./action.type";

const initState = {
    isLoading: false,
    errorMessage: "",
    hrv: [],
};

const BandReducer = (state = initState, action) => {
    switch (action.type) {
        case BandZipActions.UPLOAD:
            return { ...state, isLoading: true, errorMessage: "" };
        case BandZipActions.UPLOAD_SUCCESS:
            return { ...state, isLoading: false, errorMessage: "" };
        case BandZipActions.UPLOAD_FAILURE:
            return { ...state, isLoading: false, errorMessage: action.payload };
        case BandZipActions.FETCH_LATEST_HRV:
            return {
                ...state,
                isLoading: true,
            };
        case BandZipActions.FETCH_LATEST_HRV_SUCCESS:
            return {
                ...state,
                isLoading: false,
                hrv: action.payload,
            };
        case BandZipActions.FETCH_LATEST_HRV_FAILURE:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            };
        default:
            return state;
    }
};

export default BandReducer;
