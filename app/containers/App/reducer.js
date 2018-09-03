/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  LOAD_PLAYERS,
  LOAD_PLAYERS_SUCCESS,
  LOAD_PLAYERS_ERROR,
  LOAD_PLAYER,
  LOAD_PLAYER_SUCCESS,
  LOAD_PLAYER_ERROR,
  LOAD_FINES_SUCCESS,
} from './constants';

const { Map, Set } = require('immutable');
// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  players: {
    playersById: false,
    playersId: false
  },
  fines: {
    finesById: false,
    unpaidByPlayerId: false,
    paidByPlayersId: false
  },
  userData: {
    repositories: false,
  },
});

const insertPlayer = (state, id, player) => {
  const playerList = state.getIn(['players', 'playersById']);
  return playerList ? playerList.set(id, player) : Map({ id: player });
};

const insertPlayerId = (state, id) => {
  const playerList = state.getIn(['players', 'playersId']);
  return playerList ? playerList.add(id) : Set([id]);
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PLAYERS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['players', 'playersById'], false)
        .setIn(['players', 'playersId'], false);
    case LOAD_PLAYERS_SUCCESS:
      return state
        .set('loading', false)
        .setIn(['players', 'playersById'], action.playersById)
        .setIn(['players', 'playersId'], action.playersId);
    case LOAD_PLAYERS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case LOAD_PLAYER:
      return state
        .set('loading', true)
        .set('error', false);
    case LOAD_PLAYER_SUCCESS:
      return state
        .set('loading', false)
        .setIn(['players', 'playersById'], insertPlayer(state, action.playerId, action.player))
        .setIn(['players', 'playersId'], insertPlayerId(state, action.playerId));
    case LOAD_PLAYER_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case LOAD_FINES_SUCCESS:
      return state
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
