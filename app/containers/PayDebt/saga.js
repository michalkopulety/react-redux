import { put, takeLatest, call } from 'redux-saga/effects';
import { PAY_DEBT } from 'containers/App/constants';
import { payingDebtSuccess } from 'containers/App/actions';
import request from 'utils/request';
import { changeSettings } from 'containers/FinesTableContainer/actions';

function* payDebt(action) {
    const requestURL = `http://localhost:3001/api/fines/pay/`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": action.paidFines
        })
    };

    try {
        const response = yield call(request, requestURL, options);
        if (response.success) {
            yield put(payingDebtSuccess(response.data));
            yield put(changeSettings("unpaid", "selected", []))
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
export default function* playerDetail() {
    yield takeLatest(PAY_DEBT, payDebt);
}
