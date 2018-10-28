import { put, takeLatest, call } from 'redux-saga/effects';
import { PAY_DEBT } from 'containers/App/constants';
import { payingDebtSuccess } from 'containers/App/actions';
import request from 'utils/request';

function* logIn(action) {
    const requestURL = `/api/fines/payFines/`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "ids": action.paidFines
        })
    };

    try {
        const response = yield call(request, requestURL, options);
        yield put(payingDebtSuccess(response));
        yield put(changeSettings("unpaid", "selected", []));
    } catch (err) {
        debugger;
    }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* playerDetail() {
    yield takeLatest(PAY_DEBT, logIn);
}
