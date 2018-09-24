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
import { fromJS, List } from 'immutable';

import { CHANGE_SELECTED_TAB, CHANGE_SETTINGS } from './constants';

// The initial state of the App
const initialState = fromJS({
    selectedTab: 0,
    paid: {
        order: 'asc',
        orderBy: 'description',
        selected: [],
        selectedAmount: 0,
        page: 0,
        rowsPerPage: 5
    },
    unpaid: {
        order: 'asc',
        orderBy: 'description',
        selected: [],
        selectedAmount: 0,
        page: 0,
        rowsPerPage: 5
    }
});

function homeReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_SELECTED_TAB:
            return state.set('selectedTab', action.selectedTab);
        case CHANGE_SETTINGS: {
            if (Array.isArray(action.value)) {
                action.value = List(action.value);
            }
            return state.setIn([action.tableType, action.property], action.value);
        }

        default:
            return state;
    }
}

export default homeReducer;
