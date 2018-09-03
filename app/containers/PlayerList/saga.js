import { put, takeLatest } from 'redux-saga/effects';
import { LOAD_PLAYERS } from 'containers/App/constants';
import { players } from 'api/Players';
import { playersLoaded, playersLoadingError } from 'containers/App/actions';
import { Map, List } from 'immutable';

/**
 * Github repos request/response handler
 */
export function* getPlayers() {
  // Select username from store
  // const username = yield select(makeSelectUsername());
  // const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const playerMap = Map(players);
    const playerList = Set(Object.keys(players));
    yield put(playersLoaded(playerMap, playerList));
  } catch (err) {
    yield put(playersLoadingError(err));
  }
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
}
