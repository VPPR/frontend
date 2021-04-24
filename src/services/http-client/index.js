import { call, select } from 'redux-saga/effects';

const httpClient = async (url, parameters) =>
  await fetch(`${process.env.REACT_APP_BACKEND}${url}`, parameters).then(
    async (response) => {
      const json = await response.json();
      return response.ok ? json : Promise.reject(json);
    },
  );

export default httpClient;

export function* APICall(url, parameters) {
    const { accessToken } = yield select(state => state.auth);

    if (!parameters.headers)
      parameters.headers={}
    
    parameters.headers.Authorization=`Bearer ${accessToken}`;

    return yield call(httpClient, url, parameters)
}