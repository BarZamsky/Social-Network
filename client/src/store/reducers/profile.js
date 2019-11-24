import * as actionTypes from "../actions/actionTypes"
import {updateObject} from "../../shared/updateObject";

const initialState = {
    profile: null,
    userId: null,
    error: null,
    loading: false
};

const profileStart = (state, action) => {
    return updateObject(state, {error: null, loading: true})
};

const emptyProfile = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        userId: action.userId,
        profile: null
    })
};

const getProfileSuccess = (state, action) => {
    return updateObject(state, {
        profile: action.profile,
        userId: action.userId,
        error: null,
        loading: false
    })
};

const getProfileFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
};

export const editProfileSuccess = (state, action) => {
    return updateObject(state, {
        profile: action.profile,
        error: null,
        loading: false
    })
};

export const editProfileFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
};

const logout = (state, action) => {
    return updateObject(state, {userId: null, profile: null})
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.EMPTY_PROFILE: return emptyProfile(state, action);
        case actionTypes.PROFILE_START: return profileStart(state, action);
        case actionTypes.GET_PROFILE_SUCCESS: return getProfileSuccess(state, action);
        case actionTypes.GET_PROFILE_FAIL: return getProfileFail(state, action);
        case actionTypes.EDIT_PROFILE_SUCCESS: return editProfileSuccess(state, action);
        case actionTypes.EDIT_PROFILE_FAIL: return editProfileFail(state, action);
        case actionTypes.PROFILE_LOGOUT: return logout(state, action);
        default:
            return state;
    }
};

export default reducer;