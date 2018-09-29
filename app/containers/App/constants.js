/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';
export const DEFAULT_LOCALE = 'en';

export const CREATE_PLAYER = 'CREATE_PLAYER';
export const CREATE_PLAYER_SUCCESS = 'CREATE_PLAYER_SUCCESS';
export const CREATE_PLAYER_ERROR = 'CREATE_PLAYER_ERROR';

export const LOAD_PLAYERS = 'LOAD_PLAYERS';
export const LOAD_PLAYERS_SUCCESS = 'LOAD_PLAYERS_SUCCESS';
export const LOAD_PLAYERS_ERROR = 'LOAD_PLAYERS_ERROR';

export const LOAD_PLAYER = 'LOAD_PLAYER';
export const LOAD_PLAYER_SUCCESS = 'LOAD_PLAYER_SUCCESS';
export const LOAD_PLAYER_ERROR = 'LOAD_PLAYER_ERROR';

export const LOAD_FINES = 'LOAD_FINES';
export const LOAD_FINES_SUCCESS = 'LOAD_FINES_SUCCESS';
export const LOAD_FINES_ERROR = 'LOAD_FINES_ERROR';

export const LOAD_PLAYER_FINES = 'LOAD_PLAYER_FINES';
export const LOAD_PLAYER_FINES_SUCCESS = 'LOAD_PLAYER_FINES_SUCCESS';
export const LOAD_PLAYER_FINES_ERROR = 'LOAD_PLAYER_FINES_ERROR';

export const INSERT_FINE = 'INSERT_FINE';
export const INSERT_FINE_SUCCESS = 'INSERT_FINE_SUCCESS';
export const INSERT_FINE_ERROR = 'INSERT_FINE_ERROR';

export const PAY_DEBT = 'PAY_DEBT';
export const PAY_DEBT_SUCCESS = 'PAY_DEBT_SUCCESS';
export const PAY_DEBT_ERROR = 'PAY_DEBT_ERROR';