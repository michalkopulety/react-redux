import { put, takeLatest, call } from 'redux-saga/effects';
import { INSERT_FINE } from 'containers/App/constants';
import { players } from 'api/Players';
import { fines } from 'api/Fines';
import request from 'utils/request';
import { fineInsertingDone, fineInsertingError } from 'containers/App/actions';
import { makeSelectCurrentPlayer } from 'containers/App/selectors';

function* insertFine(action) {
    try {
        const fine = action.fine;
        if (!fine.description || !fine.amount) {
            throw "Misssing properties";
        }
        const requestURL = `http://localhost:3001/api/fines`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "isPaid": "false",
                "player": action.playerId,
                "description": fine.description,
                "amount": fine.amount
            })
        };
        const response = yield call(request, requestURL, options);
        if (response.success) {
            yield put(fineInsertingDone(response.data, action.hash));
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
