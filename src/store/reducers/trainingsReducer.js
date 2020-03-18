import * as actionTypes from '../actions/actionTypes';
import { updateObject } from  '../utility';

const initialState={
    trainings: null,
    error: null,
    loading: false,
}
const trainingsFetchStart = (state) => {
    return updateObject(state, {error: null, loading: true});
}
const trainingsFetchSuccess = (state, action) => {
    return updateObject(state, {
        trainings: action.trainings,
        error: null,
        loading: false,
    });
}
const trainingsFetchFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}
const trainingsRemove = (state) => {
    return updateObject(state, {trainings: null});
}
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TRAININGS_START: return trainingsFetchStart(state);
        case actionTypes.FETCH_TRAININGS_SUCCESS: return trainingsFetchSuccess(state, action);
        case actionTypes.FETCH_TRAININGS_FAIL: return trainingsFetchFail(state, action);
        case actionTypes.FETCH_TRAININGS_LOGOUT: return trainingsRemove(state);
        default:
            return state;  
    }
    
}
export default reducer
