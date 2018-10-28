import { put, takeLatest, call, select } from 'redux-saga/effects';
import { LOAD_PLAYER, LOAD_PLAYER_FINES } from 'containers/App/constants';
import { makeSelectCurrentPlayer } from 'containers/App/selectors';
import request from 'utils/request';
import { playerLoaded, playerLoadingError, playerFinesLoaded, playerFinesLoadingError } from 'containers/App/actions';

/**
 * Github repos request/response handler
 */
function* getPlayer(action) {
  try {
    // Call our request helper (see 'utils/request')
    const playerId = yield select(makeSelectCurrentPlayer());
    const player = yield call(request, `/api/players/${playerId}/?filter={"include":"fine"}`);

    yield put(playerLoaded(player));
    yield put(playerFinesLoaded(playerId, player.fine));
  } catch (err) {
    yield put(playerLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* playerDetail() {
  yield takeLatest(LOAD_PLAYER, getPlayer);
}
