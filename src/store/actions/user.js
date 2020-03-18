import * as actionTypes from './actionTypes';
import firebase from '../../firebase';

export const userFetchStart = () => {
    return {
        type: actionTypes.FETCH_USER_START
    };
};
export const userFetchSuccess = (data) => {
    return {
        type: actionTypes.FETCH_USER_SUCCESS,
        email: data.email,
        fullname: data.fullname,
        gender: data.gender,
        height: data.height,
        weight: data.weight,
    };
};
export const userFetchFail = (error) => {
    return {
        type: actionTypes.FETCH_USER_FAIL,
        error: error
    };
};
export const userFetch = (userId) => {
    return dispatch => {
        dispatch(userFetchStart());
        const db = firebase.firestore();
        let userRef = db.collection('users').doc(userId);
        userRef.get()
        .then(doc => {
            if (!doc.exists) {
                let error="Failed to load user info!"
                dispatch(userFetchFail(error));
            } else {
                dispatch(userFetchSuccess(doc.data()));
            }
        })
        .catch(error => {
            dispatch(userFetchFail(error));
        });
    }
};
