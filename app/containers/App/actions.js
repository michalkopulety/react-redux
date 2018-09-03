/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_FINES,
  LOAD_FINES_SUCCESS,
  LOAD_FINES_ERROR,


  LOAD_PLAYERS,
  LOAD_PLAYERS_SUCCESS,
  LOAD_PLAYERS_ERROR,

  LOAD_PLAYER,
  LOAD_PLAYER_SUCCESS,
  LOAD_PLAYER_ERROR
} from './constants';

export function loadPlayers() {
  return {
    type: LOAD_PLAYERS,
  };
}

export function playersLoaded(playersById, playersId) {
  return {
    type: LOAD_PLAYERS_SUCCESS,
    playersById,
    playersId
  };
}

export function playersLoadingError(error) {
  return {
    type: LOAD_PLAYERS_ERROR,
    error,
  };
}

export function loadPlayer(playerId) {
  return {
    type: LOAD_PLAYER,
    playerId
  };
}

export function playerLoaded(playerId, player) {
  return {
    type: LOAD_PLAYER_SUCCESS,
    playerId,
    player
  };
}

export function playerLoadingError(error) {
  return {
    type: LOAD_PLAYER_ERROR,
    error,
  };
}

export function loadFines() {
  return {
    type: LOAD_FINES,
  };
}

export function finesLoaded(fines) {
  return {
    type: LOAD_FINES_SUCCESS,
    fines
  };
}

export function finesLoadingError(error) {
  return {
    type: LOAD_FINES_ERROR,
    error,
  };
}