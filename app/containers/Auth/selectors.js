/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectLoggedUser = (state) => state.get('user');

const makeSelectLoggedUser = () => createSelector(
    selectLoggedUser,
    (loggedUserState) => loggedUserState.get('user')
);


export {
    selectLoggedUser,
    makeSelectLoggedUser
};
