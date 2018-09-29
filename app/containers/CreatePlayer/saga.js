import { put, takeLatest, call } from 'redux-saga/effects';
import { CREATE_PLAYER } from 'containers/App/constants';
import { playerCreated } from 'containers/App/actions';
import request from 'utils/request';
import { push } from 'react-router-redux';

function* create(action) {
    const requestURL = `http://localhost:3001/api/players/`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(action.player)
    };

    try {
        const response = yield call(request, requestURL, options);
        if (response.success) {
            yield put(playerCreated(response.data));
            yield put(push(`/players/${response.data.hashId}`));
        } else {
            throw response.error;
        }
    } catch (err) {
        debugger;
    }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* createPlayer() {
    yield takeLatest(CREATE_PLAYER, create);
}
