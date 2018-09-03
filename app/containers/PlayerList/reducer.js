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
  LOAD_PLAYERS_SUCCESS,
  LOAD_PLAYERS,
  LOAD_PLAYERS_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  playersByID: false
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PLAYERS:
      return state
        .set('f', false);
    case LOAD_PLAYERS_SUCCESS:
      return state
        .set('f', action.players);
    case LOAD_PLAYERS_ERROR:
      return state
        .set('f', action.error);
    default:
      return state;
  }
}

export default appReducer;
