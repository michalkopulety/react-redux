import { put, takeLatest, call, select } from 'redux-saga/effects';
import { LOAD_PLAYER, LOAD_PLAYER_FINES } from 'containers/App/constants';
import { makeSelectCurrentPlayer } from 'containers/App/selectors';
import { fines } from 'api/Fines';
import request from 'utils/request';
import { playerLoaded, playerLoadingError, playerFinesLoaded, playerFinesLoadingError } from 'containers/App/actions';

/**
 * Github repos request/response handler
 */
function* getPlayer(action) {
  try {
    // Call our request helper (see 'utils/request')
    const playerId = yield select(makeSelectCurrentPlayer());
    const requestURL = `http://localhost:3001/api/players/${playerId}`;
    const response = yield call(request, requestURL);
    if (response.success) {
      yield put(playerLoaded(response.data));
    } else {
      throw response.error;
    }
  } catch (err) {
    yield put(playerLoadingError(err));
  }
}

function* getFines(action) {
  try {
    // Call our request helper (see 'utils/request')
    const finesList = fines;
    yield put(playerFinesLoaded(action.playerId, finesList));
  } catch (err) {
    yield put(playerFinesLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* playerDetail() {
  yield takeLatest(LOAD_PLAYER, getPlayer);
  yield takeLatest(LOAD_PLAYER_FINES, getFines);
}
