/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentUser')
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectRepos = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'repositories'])
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

const makeSelectPlayers = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['players', 'playersById'])
);

const makeSelectPlayer = () => createSelector(
  [selectGlobal, selectRoute],
  (globalState, routeState) => {
    const path = routeState.get('location').pathname;
    const playerId = path.substring(path.lastIndexOf('/') + 1);
    const players = globalState.getIn(['players', 'playersById']);
    return players ? players.get(playerId) : false;
  }
);

const makeSelectPlayersList = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['players', 'playersId'])
);

const makeSelectFines = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['fines', 'finesById'])
);

export {
  selectGlobal,
  selectRoute,
  makeSelectCurrentUser,
  makeSelectPlayers,
  makeSelectPlayersList,
  makeSelectPlayer,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectFines
};
