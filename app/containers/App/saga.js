import { put, takeLatest, call } from 'redux-saga/effects';
import { LOAD_PLAYERS, LOAD_FINES } from 'containers/App/constants';
import { playersLoaded, playersLoadingError } from 'containers/App/actions';
import request from 'utils/request';
import { Map, Set } from 'immutable';
import { finesLoaded } from './actions';

/**
 * Github repos request/response handler
 */
export function* getPlayers() {
  try {
    const requestURL = `/api/players/`;
    const response = yield call(request, requestURL);
    yield put(playersLoaded(response));
  } catch (err) {
    yield put(playersLoadingError(err));
  }
}

export function* getFines() {
  yield put(finesLoaded(fines));
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* playersList() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_PLAYERS, getPlayers);
  yield takeLatest(LOAD_FINES, getFines);
}
