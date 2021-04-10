import BandActionTypes from './action.type';

const initState = {
    isLoading:false,
    errorMessage:'',
}

const activityReducer = (state=initState, action) => {
    switch(action.type) {
        case BandActionTypes.ACTIVITY:
            return {isLoading:true, errorMessage:''};
        case BandActionTypes.ACTIVITY_SUCCESS:
            return {isLoading:false, errorMessage:''};
        case BandActionTypes.ACTIVITY_FAILURE:
            return {isLoading:false, errorMessage:action.payload}
        default:
            return state;
    }
}

export default activityReducer;