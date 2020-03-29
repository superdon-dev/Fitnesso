import * as actionTypes from '../actions/actionTypes';
import { updateObject } from  '../utility';

const initialState={
    trainings: null,
    message: null,
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
const trainingsFetchEmpty = (state, action) => {
    return updateObject(state, {
        empty: action.empty,
        loading: false
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
const trainingPostStart = (state) => {
    return updateObject(state, {error: null, loading: true});
}
const trainingPostSuccess = (state, action) => {
    return updateObject(state, {
        message: action.message,
        error: null,
        loading: false,
    });
}
const trainingPostFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}
const trainingDeleteSuccess = (state, action) => {
    return updateObject(state, {
        message: action.message,
        error: null,
        loading: false,
    });
}
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TRAININGS_START: return trainingsFetchStart(state);
        case actionTypes.FETCH_TRAININGS_SUCCESS: return trainingsFetchSuccess(state, action);
        case actionTypes.FETCH_TRAININGS_FAIL: return trainingsFetchFail(state, action);
        case actionTypes.FETCH_TRAININGS_EMPTY: return trainingsFetchEmpty(state, action);
        case actionTypes.FETCH_TRAININGS_LOGOUT: return trainingsRemove(state);
        case actionTypes.POST_TRAINING_START: return trainingPostStart(state);
        case actionTypes.POST_TRAINING_SUCCESS: return trainingPostSuccess(state, action);
        case actionTypes.POST_TRAINING_FAIL: return trainingPostFail(state, action);
        case actionTypes.DELETE_TRAINING: return trainingDeleteSuccess(state, action);
        default:
            return state;  
    }
    
}
export default reducer
