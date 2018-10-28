/*
 * HomeReducer
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

import { CHANGE_LOGGED_USER } from './constants';

// The initial state of the App
const initialState = fromJS({
    user: {}
});

function loginReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_LOGGED_USER:
            return state.set('user', action.user);

        default:
            return state;
    }
}

export default loginReducer;
