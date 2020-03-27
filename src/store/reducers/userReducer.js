import * as actionTypes from '../actions/actionTypes';
import { updateObject } from  '../utility';

const initialState={
    email: '',
    fullname: '',
    gender: '',
    height: '',
    weight: '',
    userType: '',
    imageUrl: '',
    error: null,
    users: null,
    loading: false,
}
const fetchUserStart = (state) => {
    return updateObject(state, {error: null, loading: true});
}
const fetchUserSuccess = (state, action) => {
    return updateObject(state, {
        email: action.email,
        fullname: action.fullname,
        gender: action.gender,
        height: action.height,
        weight: action.weight,
        imageUrl: action.imageUrl,
        loading: false,
        error: null,
    });
}
const fetchUsersSuccess = (state, action) => {
    return updateObject(state, {
        users: action.users
    });
}
const fetchUserFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}
const userUrlRemove = (state) => {
    return updateObject(state, {imageUrl: ''});
}
const checkUserType = (state, action) => {
    return updateObject(state, {
        userType: action.userType
    });
}
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USER_START: return fetchUserStart(state);
        case actionTypes.FETCH_USER_SUCCESS: return fetchUserSuccess(state, action);
        case actionTypes.FETCH_USERS_SUCCESS: return fetchUsersSuccess(state, action);
        case actionTypes.FETCH_USER_FAIL: return fetchUserFail(state, action);
        case actionTypes.REMOVE_USER_URL: return userUrlRemove(state, action);
        case actionTypes.CHECK_USER_TYPE: return checkUserType(state, action);
        default:
            return state;  
    }
    
}
export default reducer
