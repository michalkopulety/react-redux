import { CHANGE_LOGGED_USER } from './constants';

export function changeLoggedUser(user) {
    return {
        type: CHANGE_LOGGED_USER,
        user
    };
}
