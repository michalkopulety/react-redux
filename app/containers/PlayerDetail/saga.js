import { put, takeLatest } from 'redux-saga/effects';
import { LOAD_PLAYER } from 'containers/App/constants';
import { players } from 'api/Players';
import { playerLoaded, playerLoadingError } from 'containers/App/actions';

/**
 * Github repos request/response handler
 */
export function* getPlayer(action) {
  // Select username from store
  // const username = yield select(makeSelectUsername());
  // const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const playersList = players;
    yield put(playerLoaded(action.playerId, playersList[action.playerId]));
  } catch (err) {
    yield put(playerLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* playerDetail() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_PLAYER, getPlayer);
}
