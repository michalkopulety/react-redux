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
  LOAD_PLAYER_FINES,
  LOAD_PLAYER_FINES_SUCCESS,
  LOAD_PLAYER_FINES_ERROR,

  CREATE_PLAYER,
  CREATE_PLAYER_SUCCESS,
  CREATE_PLAYER_ERROR,

  LOAD_FINES,
  LOAD_FINES_SUCCESS,
  LOAD_FINES_ERROR,


  LOAD_PLAYERS,
  LOAD_PLAYERS_SUCCESS,
  LOAD_PLAYERS_ERROR,

  LOAD_PLAYER,
  LOAD_PLAYER_SUCCESS,
  LOAD_PLAYER_ERROR,

  INSERT_FINE,
  INSERT_FINE_SUCCESS,
  INSERT_FINE_ERROR,

  LOAD_FINES_SUM,
  FINES_SUM_SUCCESS,
  FINES_SUM_ERROR,

  PAY_DEBT,
  PAY_DEBT_SUCCESS,
  PAY_DEBT_ERROR
} from './constants';

export function loadPlayers() {
  return {
    type: LOAD_PLAYERS,
  };
}

export function playersLoaded(players) {
  return {
    type: LOAD_PLAYERS_SUCCESS,
    players,
  };
}

export function playersLoadingError(error) {
  return {
    type: LOAD_PLAYERS_ERROR,
    error,
  };
}

export function createPlayer(player) {
  return {
    type: CREATE_PLAYER,
    player
  }
}

export function playerCreated(player) {
  return {
    type: CREATE_PLAYER_SUCCESS,
    player
  }
}

export function loadPlayer() {
  return {
    type: LOAD_PLAYER,
  };
}

export function playerLoaded(player) {
  return {
    type: LOAD_PLAYER_SUCCESS,
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
    type: LOAD_FINES
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

export function loadPlayerFines(playerId) {
  return {
    type: LOAD_PLAYER_FINES,
    playerId
  };
}

export function playerFinesLoaded(playerId, fines) {
  return {
    type: LOAD_PLAYER_FINES_SUCCESS,
    playerId,
    fines
  };
}

export function playerFinesLoadingError(error) {
  return {
    type: LOAD_PLAYER_FINES_ERROR,
    error
  };
}

export function insertFine(playerId, fine, hash) {
  return {
    type: INSERT_FINE,
    playerId,
    fine,
    hash
  };
}

export function fineInsertingDone(fine, hash) {
  return {
    type: INSERT_FINE_SUCCESS,
    fine,
    hash
  };
}

export function fineInsertingError(error) {
  return {
    type: INSERT_FINE_ERROR,
    error
  };
}

export function payDebt(paidFines) {
  return {
    type: PAY_DEBT,
    paidFines
  };
}

export function payingDebtSuccess(paidFines) {
  return {
    type: PAY_DEBT_SUCCESS,
    paidFines
  };
}

export function loadFinesSum() {
  return {
    type: LOAD_FINES_SUM
  };
}