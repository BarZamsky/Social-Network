import * as actionTypes from "./actionTypes"
import server from "../../server"

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (user, token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        user: user,
        token: token
    }
};

export const authFail = (err) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const signin = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const body = {
            email: email,
            password: password
        };

        server.post("/auth/signin", body, (err, res) => {
            if (err) {
                dispatch(authFail(err));
                return;
            }

            if (res.data && res.data.status_code === 1004) {
                dispatch(authFail("wrong credentials"));
                return;
            }

            if (res.data && res.data.status_code === 1003) {
                dispatch(authFail("User not found"));
                return;
            }
            localStorage.setItem('token', res.data.data.tokens[res.data.data.tokens.length -1].token);
            dispatch(authSuccess(res.data.data, res.data.data.tokens[res.data.data.tokens.length -1].token))
        });
    }
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
};

const getUserByToken = async (token) => {

    return await server.post("/auth", {token: token},  (err, res) => {
        if (err) {
            return;
        }

        if (res.data && res.data.status_code !== 0) {
            return;
        }
        return res.data.data;
    })
};

export const authCheckState = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');
        if (!token)
            dispatch(logout());
        else {
            const user = await getUserByToken(token);
            if (!user)
                dispatch(logout());
            else {
                dispatch(setAuthRedirectPath("/dashboard"));
                dispatch(authSuccess(user, token));
            }
        }
    }
};