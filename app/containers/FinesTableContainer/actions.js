import { CHANGE_SELECTED_TAB, CHANGE_SETTINGS } from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function changeSelectedTab(selectedTab) {
    return {
        type: CHANGE_SELECTED_TAB,
        selectedTab
    };
}

export function changeSettings(tableType, property, value) {
    return {
        type: CHANGE_SETTINGS,
        tableType,
        property,
        value
    };
}