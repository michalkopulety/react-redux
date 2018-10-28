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
  LOAD_PLAYERS,
  LOAD_PLAYERS_SUCCESS,
  LOAD_PLAYERS_ERROR,
  LOAD_PLAYER,
  LOAD_PLAYER_SUCCESS,
  LOAD_PLAYER_ERROR,
  LOAD_PLAYER_FINES_SUCCESS,
  LOAD_FINES,
  LOAD_FINES_SUCCESS,
  LOAD_FINES_ERROR,
  INSERT_FINE,
  INSERT_FINE_SUCCESS,
  INSERT_FINE_ERROR,
  PAY_DEBT,
  PAY_DEBT_SUCCESS,
  CREATE_PLAYER,
  CREATE_PLAYER_SUCCESS
} from './constants';

const { Map, Set } = require('immutable');
// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  players: {
    playersById: Map(),
    playersId: Set()
  },
  fines: {
    finesById: Map(),
    unpaidFineIdsByPlayerId: Map(),
    paidFineIdsByPlayerId: Map(),
  }
});

const insertPlayer = (state, id, player) => {
  const playerList = state.getIn(['players', 'playersById']);
  return playerList ? playerList.set(id, player) : Map({ [id]: player });
};

const insertFines = (state, id, fines) => {
  let finesById = Map();
  let unpaidFineIdsByPlayerId = Map();
  let paidFineIdsByPlayerId = Map();

  fines.forEach((fine) => {
    const playerId = fine.playerId;
    finesById = finesById.set(fine.id, fine);
    let fineIdsByPlayerId = fine.isPaid ? paidFineIdsByPlayerId : unpaidFineIdsByPlayerId;
    fineIdsByPlayerId = fineIdsByPlayerId.get(playerId) ? fineIdsByPlayerId.set(playerId, [fine.id].concat(fineIdsByPlayerId.get(playerId))) : fineIdsByPlayerId.set(playerId, [fine.id]);
    if (fine.isPaid) {
      paidFineIdsByPlayerId = fineIdsByPlayerId;
    } else {
      unpaidFineIdsByPlayerId = fineIdsByPlayerId;
    }
  });

  return state.setIn(['fines', 'finesById'], finesById)
    .setIn(['fines', 'unpaidFineIdsByPlayerId'], unpaidFineIdsByPlayerId)
    .setIn(['fines', 'paidFineIdsByPlayerId'], paidFineIdsByPlayerId)
    .get('fines');
};

const updateFines = (state, paidFines) => {

  let updatedState = state;
  paidFines.forEach((paidFine) => {
    const playerId = paidFine.playerId;
    updatedState = state.setIn(['fines', 'finesById', paidFine.id], paidFine);
    const unpaidFines = state.getIn(['fines', "unpaidFineIdsByPlayerId", playerId]);
    const paidFines = state.getIn(['fines', "paidFineIdsByPlayerId", playerId]).concat(paidFine.id);
    unpaidFines.splice(unpaidFines.indexOf(paidFine.id), 1);
    updatedState = updatedState
      .setIn(['fines', "paidFineIdsByPlayerId", playerId], paidFines)
      .setIn(['fines', "unpaidFineIdsByPlayerId", playerId], unpaidFines)
  });

  return updatedState;
}

const pushToArray = (state, path, value) => {
  const paidFines = state.getIn(path) || [];
  return state.setIn(path, paidFines.concat(value));
};

const insertPlayerFines = (state, player) => {
  let newState = state;
  player.paidFinesId.forEach((fine) => {
    newState = newState.setIn(['fines', 'finesById', fine._id], fine);
    newState = pushToArray(newState, ['fines', "paidFineIdsByPlayerId", player.id], fine._id);
  });
  player.unpaidFinesId.forEach((fine) => {
    newState = newState.setIn(['fines', 'finesById', fine._id], fine);
    newState = pushToArray(newState, ['fines', "unpaidFineIdsByPlayerId", player.id], fine._id);
  });
  return newState.get('fines');
};

const insertPlayers = (state, players) => {
  let newState = state;
  players.forEach((player) => {
    newState = newState.setIn(["players", "playersById", player.id], player);
    newState = newState.setIn(["players", "playersId"], newState.getIn(["players", "playersId"]).add(player.id));
  });

  return newState.get("players");
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PLAYER:
      return state
        .set('loading', true)
        .set('error', false);
    case CREATE_PLAYER_SUCCESS:
      return state
        .set('loading', false)
        .setIn(['players', 'playersById'], state.getIn(['players', 'playersById']).set(action.player.id, action.player))
        .setIn(['players', 'playersId'], state.getIn(['players', 'playersId']).add(action.player.id));
    case LOAD_PLAYERS:
      return state
        .set('loading', true)
        .set('error', false);
    case LOAD_PLAYERS_SUCCESS:
      return state
        .set('loading', false)
        .set('players', insertPlayers(state, action.players));
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
        .setIn(['players', 'playersById'], state.getIn(['players', 'playersById']).set(action.player.id, action.player))
        .setIn(['players', 'playersId'], state.getIn(['players', 'playersId']).add(action.player.id));
    case LOAD_PLAYER_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case LOAD_FINES:
      return state
        .set('loading', true)
        .set('error', false);
    case LOAD_FINES_SUCCESS:
      return state
        .set('loading', false)
        .set('fines', insertFines(state, action.playerId, action.fines));
    case LOAD_PLAYER_FINES_SUCCESS:
      return state
        .set('loading', false)
        .set('fines', insertFines(state, action.playerId, action.fines));
    case INSERT_FINE:
      return state
        .set('loading', true)
        .set('error', false);
    case INSERT_FINE_SUCCESS:
      return state
        .set('loading', false)
        .setIn(['fines', 'finesById', action.fine._id], action.fine)
        .setIn(['fines', 'unpaidFineIdsByPlayerId'], pushToArray(state, ['fines', "unpaidFineIdsByPlayerId", action.hash], action.fine._id).getIn(['fines', "unpaidFineIdsByPlayerId"]));
    case INSERT_FINE_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case PAY_DEBT:
      return state
        .set('loading', true)
        .set('error', false);
    case PAY_DEBT_SUCCESS:
      return updateFines(state.set('loading', false), action.paidFines);
    default:
      return state;
  }
}

export default appReducer;
