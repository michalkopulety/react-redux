// src/Auth/Auth.js

import auth0 from 'auth0-js';
import _ from 'lodash';
import { push } from 'react-router-redux';
import { put } from 'redux-saga/effects';
import { changeLoggedUser } from './actions';

export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: 'hartal.eu.auth0.com',
        clientID: 'g6z3GYHUxQZfgy4i47G27df86EWwdRHh',
        redirectUri: 'http://localhost:3000/callback',
        responseType: 'token id_token',
        scope: 'openid profile create:fine create:player read:fines read:players pay:fines',
        audience: 'hartal'
    });

    constructor() {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
    }

    dispatcher;

    setDispatcher(dispatcher) {
        this.dispatcher = dispatcher;
    }

    login() {
        this.auth0.authorize();
    }

    handleAuthentication(history) {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult, history);
                history.replace('/');
            } else if (err) {
                history.replace('/');
                if (this.dispatcher) {
                    this.dispatcher({});
                }
                console.log(err);
            }
        });
    }

    setSession(authResult, history) {
        // Set the time that the Access Token will expire at
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        localStorage.setItem('loggedUser', JSON.stringify(this.createPlayerData(authResult)));

        history.replace('/');
        if (this.dispatcher) {
            this.dispatcher(this.createPlayerData(authResult));
        }
    }

    logout() {
        // Clear Access Token and ID Token from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('loggedUser');

        if (this.dispatcher) {
            this.dispatcher({});
        }
    }

    isAuthenticated() {
        // Check whether the current time is past the
        // Access Token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    createPlayerData(authResult) {
        return {
            role: this.getUserRole(authResult.scope),
            name: authResult.idTokenPayload.name,
            picture: authResult.idTokenPayload.picture
        }
    }

    getUserRole(scope) {
        let role = "guest";
        let scopeArray = scope.split(" ");
        scopeArray.splice(scopeArray.indexOf("openid"), 1);
        scopeArray.splice(scopeArray.indexOf("profile"), 1);
        scopeArray = scopeArray.sort();

        if (_.isEqual(scopeArray, ["create:fine", "create:player", "read:fines", "pay:fines", "read:players"])) {
            role = "admin";
        } else if (_.isEqual(scopeArray, ["create:fine", "read:fines", "pay:fines", "read:players"])) {
            role = "accountant";
        } else if (_.isEqual(scopeArray, ["read:fines", "read:players"])) {
            role = "player"
        }

        return role;
    }
}