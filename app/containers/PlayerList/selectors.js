/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectPlayer = (state) => state.get('players');

const getPlayers = () => createSelector(
  selectPlayer,
  (playerState) => playerState.get('playersByID')
);

export {
  selectPlayer,
  getPlayers
};
