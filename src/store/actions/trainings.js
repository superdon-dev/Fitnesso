import * as actionTypes from './actionTypes';
import firebase from '../../firebase';

export const trainingsFetchStart = () => {
    return {
        type: actionTypes.FETCH_TRAININGS_START,
    };
};
export const trainingsFetchSuccess = (data) => {
    return {
        type: actionTypes.FETCH_TRAININGS_SUCCESS,
        trainings: data
    };
};
export const trainingsFetchFail = (error) => {
    return {
        type: actionTypes.FETCH_TRAININGS_FAIL,
        error: error
    };
};
export const trainingsRemove = () => {
    return {
        type: actionTypes.FETCH_TRAININGS_LOGOUT,
    };
};
export const trainingsFetch = (userId) => {
    return dispatch => {
        dispatch(trainingsFetchStart());
        const db = firebase.firestore();
        let userRef = db.collection('users').doc(userId).collection('trainings');
        userRef.get()
        .then(collection => {
            let coll=[];
            collection.docs.forEach(doc => {
                coll.push(doc.data());
            })
            if(coll.length===0) {
                let error="Failed to load trainings!"
                dispatch(trainingsFetchFail(error));
            } else {
                dispatch(trainingsFetchSuccess(coll));
            }
        })
        .catch(error => {
            dispatch(trainingsFetchFail(error));
        });
    }
};