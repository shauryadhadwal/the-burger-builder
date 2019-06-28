import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId, email) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        email: email
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const authClearError = () => {
    return {
        type: actionTypes.AUTH_CLEAR_ERROR,
    }
}

export const logout = () => {
    localStorage.removeItem('burger_token');
    localStorage.removeItem('burger_expirationDate');
    localStorage.removeItem('burger_userId');
    localStorage.removeItem('burger_email');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDamQgVDeQSQw9Fq5WA2URv9tFbTSXdaJo';
        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDamQgVDeQSQw9Fq5WA2URv9tFbTSXdaJo';
        }
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('burger_token', response.data.idToken);
                localStorage.setItem('burger_expirationDate', expirationDate);
                localStorage.setItem('burger_userId', response.data.localId);
                localStorage.setItem('burger_email', email);
                dispatch(authSuccess(response.data.idToken, response.data.localId, email));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('burger_token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('burger_expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('burger_userId');
                const email = localStorage.getItem('burger_email');
                dispatch(authSuccess(token, userId, email));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};