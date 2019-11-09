import {
    put,
    call,
    takeLatest,
    all,
    fork,
} from "redux-saga/effects";

import {
    REQUEST_SEARCH_NASA,
} from '../actions/nasa/actionTypes';
import {
    reqSearchNasaSuccess,
    reqSearchNasaFail
} from '../actions/nasa/actions';

import api from '../services/api';
// *********************************************************
// REQUEST SEARCH NASA
// *********************************************************
function* reqSearchNasa(params) {
    try {
        const { data } = yield call(() => api.Nasa.search(params.params));
        const { collection: { items } } = data;

        let newData = [];
        for (let i = 0; i < items.length; i++) {
            try {
                // const mediaData = yield call(() => api.Nasa.getJson(items[i].href));
                newData.push({
                    data: items[i].data[0],
                    media: items[i].links && items[i].links[0] && items[i].links[0].href || ''
                    // media: mediaData && mediaData.data
                })
            } catch (error) {
                console.log(error);
            }
        }
        yield put(reqSearchNasaSuccess(newData));
    } catch (error) {
        console.log(error);
        yield put(reqSearchNasaFail(error))
    }
}
function* watchReqSearchNasa() {
    yield takeLatest(REQUEST_SEARCH_NASA, reqSearchNasa);
}

export default function* () {
    yield all([
        fork(watchReqSearchNasa)
    ])
}
