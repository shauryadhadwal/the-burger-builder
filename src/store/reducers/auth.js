import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    email: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

const errorType = (error) => {
    // Store Error object as it is
    // Add propoerty field: email/password/other
    // Categorise based on message string
    // Error types https://firebase.google.com/docs/reference/rest/auth/#section-create-email-password

    switch (error.message) {
        case 'EMAIL_EXISTS':
            return {
                ...error,
                field: 'email',
                message: 'Email already exists'
            }
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            return {
                ...error,
                field: 'other',
                message: 'We have blocked all requests from this device due to unusual activity. Try again later'
            }
        case 'EMAIL_NOT_FOUND':
            return {
                ...error,
                field: 'email',
                message: 'There is no user record corresponding to this email'
            }
        case 'INVALID_PASSWORD':
            return {
                ...error,
                field: 'password',
                message: ' The password is invalid'
            }
        case 'USER_DISABLED':
            return {
                ...error,
                field: 'other',
                message: 'The user account has been disabled by an administrator'
            }

        default:
            return {
                ...error,
                field: 'other',
            }
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return {
            ...state,
            error: null,
            loading: true
        }
        case actionTypes.AUTH_SUCCESS: return {
            ...state,
            token: action.idToken,
            userId: action.userId,
            email: action.email,
            error: null,
            loading: false
        }
        case actionTypes.AUTH_FAIL: return {
            ...state,
            error: errorType(action.error),
            loading: false
        }
        case actionTypes.AUTH_CLEAR_ERROR: return {
            ...state,
            error: null,
        }
        case actionTypes.AUTH_LOGOUT: return {
            ...state,
            token: null,
            userId: null,
            email: null,
        }
        case actionTypes.SET_AUTH_REDIRECT_PATH: return {
            ...state,
            authRedirectPath: action.path
        }
        default:
            return state;
    }
};

export default reducer;