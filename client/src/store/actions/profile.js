import * as actionTypes from "./actionTypes"
import axios from "axios"

const BASE_URL = process.env.REACT_APP_BACKEND_SERVER;

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

export const clearProfile = () => {
    localStorage.removeItem('userId');
    return {
        type: actionTypes.PROFILE_LOGOUT
    }
};

export const getProfile = () => {
    return async dispatch => {
        dispatch(profileStart());

        const token = localStorage.getItem('token');
        const response = await axios.get(BASE_URL + "/profile", {
            headers: {'x-auth': token},
            withCredentials: true
        });

        if (response.data && response.data.status_code === 1008) {
            dispatch(emptyProfile());
        } else if (response.data.status_code !== 0) {
            dispatch(getProfileFail(response.data.data));
        } else {
            localStorage.setItem('userId', response.data.data.user);
            dispatch(getProfileSuccess(response.data.data, response.data.data.user))
        }
    }
};

export const editProfileIntro = (body) => {
    return async dispatch => {
        dispatch(profileStart());

        const token = localStorage.getItem('token');
        const response = await axios.post(BASE_URL + "/profile",body, {
            headers: {'x-auth': token},
            withCredentials: true
        });

        if (response.data.status_code !== 0) {
            dispatch(editProfileFail(response.data.data));
        } else {
            dispatch(editProfileSuccess(response.data.data))
        }
    }
};

export const editAboutSection = (body) => {
    return async dispatch => {
        dispatch(profileStart());

        const token = localStorage.getItem('token');
        const response = await axios.post(BASE_URL + "/profile/about",body, {
            headers: {'x-auth': token},
            withCredentials: true
        });

        if (response.data.status_code !== 0) {
            dispatch(editProfileFail(response.data.data));
        } else {
            dispatch(editProfileSuccess(response.data.data))
        }
    }
};

export const editSocialSection = (body) => {
    return async dispatch => {
        dispatch(profileStart());

        const token = localStorage.getItem('token');
        const response = await axios.post(BASE_URL + "/profile/social",body, {
            headers: {'x-auth': token},
            withCredentials: true
        });

        if (response.data.status_code !== 0) {
            dispatch(editProfileFail(response.data.data));
        } else {
            dispatch(editProfileSuccess(response.data.data))
        }
    }
};