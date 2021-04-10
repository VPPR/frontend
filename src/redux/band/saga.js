import { takeEvery, all, call, put } from 'redux-saga/effects';
import { activityFailure, activitySuccess } from './action';
import BandActionTypes from './action.type';
import { APICall }  from 'services/http-client'
function* activity() {
    yield takeEvery(BandActionTypes.ACTIVITY, function* (action){
        try {
            let data=new FormData();
            data.append("file",action.payload);
            let response = yield call(APICall,"/miband/activity",
            {
              method: "POST",
              body: data
            },);
            yield put(activitySuccess(response));
          } catch (error) {
            yield put(activityFailure(error.detail));
          }
    })
}

function* bandSaga(){
    yield all([activity()]);
}

export default bandSaga;