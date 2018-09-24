/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectPlayerRoot = (state) => selectGlobal(state).get('players');
const selectPlayersById = (state) => selectPlayerRoot(state).get('playersById');
const selectPlayerList = (state) => selectPlayerRoot(state).get('playersId');

const selectFinesRoot = (state) => selectGlobal(state).get('fines');
const selectFinesById = (state) => selectFinesRoot(state).get('finesById');
const selectPaidFines = (state) => selectFinesRoot(state).get('paidFineIdsByPlayerId');
const selectUnpaidFines = (state) => selectFinesRoot(state).get('unpaidFineIdsByPlayerId');

const selectRoute = (state) => state.get('route');
const selectRoutePlayerId = (state) => selectRoute(state).get("playerId");

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

const makeSelectCurrentPlayer = () => createSelector(
  selectRoutePlayerId,
  (currentPlayer) => currentPlayer
);

const makeSelectPlayers = () => createSelector(
  selectPlayersById,
  (playersById) => playersById
);

const makeSelectPlayer = () => createSelector(
  [selectPlayersById, selectRoutePlayerId],
  (playersById, playerId) => {
    return playersById.get(playerId) || {};
  }
);

const makeSelectPlayersList = () => createSelector(
  selectPlayerList,
  (playerList) => playerList
);

const makeSelectPaidFines = () => createSelector(
  [selectFinesById, selectPaidFines, selectRoutePlayerId],
  (finesById, paidFines, playerId) => {
    const paidFinesList = paidFines.get(playerId) || [];
    return paidFinesList.map((fineId) => {
      return finesById.get(fineId);
    });
  }
);

const makeSelectUnpaidFines = () => createSelector(
  [selectFinesById, selectUnpaidFines, selectRoutePlayerId],
  (finesById, unpaidFines, playerId) => {
    const paidFinesList = unpaidFines.get(playerId) || [];
    return paidFinesList.map((fineId) => {
      return finesById.get(fineId);
    });
  }
);

const makeSelectFinesById = () => createSelector(
  [selectFinesById],
  (finesById) => finesById
);

const makeSelectUnpaidFinesByPlayerId = () => createSelector(
  [selectUnpaidFines],
  (unpaidFinesByPlayerId) => unpaidFinesByPlayerId
);

export {
  selectGlobal,
  selectRoute,
  makeSelectCurrentPlayer,
  makeSelectPlayers,
  makeSelectPlayersList,
  makeSelectPlayer,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectPaidFines,
  makeSelectUnpaidFines,
  makeSelectFinesById,
  makeSelectUnpaidFinesByPlayerId
};
