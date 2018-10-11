import { put, takeLatest, call } from 'redux-saga/effects';
import { INSERT_FINE } from 'containers/App/constants';
import request from 'utils/request';
import { fineInsertingDone, fineInsertingError } from 'containers/App/actions';

function* insertFine(action) {
    try {
        const fine = action.fine;
        if (!fine.description || !fine.amount) {
            throw "Misssing properties";
        }
        const requestURL = `/api/players/5bb4d894dd55a22f9c46dd91/fine`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "isPaid": false,
                "playerId": action.playerId,
                "description": fine.description,
                "amount": fine.amount
            })
        };
        const response = yield call(request, requestURL, options);
        if (response) {
            yield put(fineInsertingDone(response, action.playerId));
        } else {
            throw response.error;
        }
    } catch (err) {
        yield put(fineInsertingError(err));
    }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* playerDetail() {
    yield takeLatest(INSERT_FINE, insertFine);
}
