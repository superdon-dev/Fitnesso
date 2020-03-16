import * as actionTypes from '../actions/actionTypes';
import { updateObject } from  '../utility';

const initialState={
    email: '',
    fullname: '',
    gender: '',
    height: '',
    weight: '',
    error: null,
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
        error: null,
        loading: false,
    });
}
const fetchUserFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USER_START: return fetchUserStart(state);
        case actionTypes.FETCH_USER_SUCCESS: return fetchUserSuccess(state, action);
        case actionTypes.FETCH_USER_FAIL: return fetchUserFail(state, action);
        default:
            return state;  
    }
    
}
export default reducer
