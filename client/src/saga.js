import {
    all,
    fork
} from 'redux-saga/effects';

import nasa from './sagas/nasa';

export default function* () {
    yield all([
        fork(nasa)
    ])
}