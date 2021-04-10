import BandActionTypes from './action.type';
export const activity = (file) => ({
    type: BandActionTypes.ACTIVITY,
    payload: file
});

export const activitySuccess = () => ({
    type:BandActionTypes.ACTIVITY_SUCCESS
});

export const activityFailure = (errorMessage) => ({
    type:BandActionTypes.ACTIVITY_FAILURE,
    payload:errorMessage
});