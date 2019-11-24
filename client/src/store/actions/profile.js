import * as actionTypes from "./actionTypes"
import server from "../../server"

export const profileStart = () => {
    return {
        type: actionTypes.PROFILE_START
    }
};

export const getProfileSuccess = (profile, userId) => {
    return {
        type: actionTypes.GET_PROFILE_SUCCESS,
        profile: profile,
        userId: userId
    }
};

export const getProfileFail = (err) => {
    return {
        type: actionTypes.GET_PROFILE_FAIL,
        error: err
    }
};

export const emptyProfile = () => {
    return {
        type: actionTypes.EMPTY_PROFILE
    }
};

export const editProfileSuccess = (profile) => {
    return {
        type: actionTypes.EDIT_PROFILE_SUCCESS,
        profile: profile
    }
};

export const editProfileFail = (err) => {
    return {
        type: actionTypes.EDIT_PROFILE_FAIL,
        error: err
    }
};

export const logout = () => {
    localStorage.removeItem('userId');
    return {
        type: actionTypes.PROFILE_LOGOUT
    }
};

export const getProfile = () => {
    return dispatch => {
        dispatch(profileStart());

        server.get("/profile", (err, res) => {
            if (err) {
                dispatch(getProfileFail(err.message));
                return;
            }

            if (res.data && res.data.status_code === 1008) {
                dispatch(emptyProfile());
                return;
            }

            localStorage.setItem('userId', res.data.data.user);
            dispatch(getProfileSuccess(res.data.data.profile, res.data.data.user))
        });
    }
};

export const editProfileIntro = (body) => {
    return dispatch => {
        dispatch(profileStart());

        server.post("/profile", body, (err, res) => {
            if (err) {
                dispatch(editProfileFail(err));
                return;
            }

            dispatch(editProfileSuccess(res.data.profile))
        });
    }
};