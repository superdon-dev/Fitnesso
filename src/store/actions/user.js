import * as actionTypes from './actionTypes';
import firebase from '../../firebase';

export const userFetchStart = () => {
    return {
        type: actionTypes.FETCH_USER_START
    };
};
export const userFetchSuccess = (data, imageUrl) => {
    return {
        type: actionTypes.FETCH_USER_SUCCESS,
        email: data.email,
        fullname: data.fullname,
        gender: data.gender,
        height: data.height,
        weight: data.weight,
        imageUrl: imageUrl,
    };
};
export const userFetchFail = (error) => {
    return {
        type: actionTypes.FETCH_USER_FAIL,
        error: error
    };
};
export const removeUserUrl = () => {
    return{
        type: actionTypes.REMOVE_USER_URL,
    }
}
export const userFetch = (userId) => {
    return dispatch => {
        dispatch(userFetchStart());
        const db = firebase.firestore();
        const storage = firebase.storage().ref();
        let userRef = db.collection('users').doc(userId);
        userRef.get()
        .then(doc => {
            if (!doc.exists) {
                let error="Failed to load user info!"
                dispatch(userFetchFail(error));
            } else {
                let link='avatars/'+userId+'.jpg';
                storage.child(link).getDownloadURL()
                .then((url) => {
                    dispatch(userFetchSuccess(doc.data(),url));
                }).catch((error) => {
                    dispatch(userFetchFail(error));
                })
            }
        })
        .catch(error => {
            dispatch(userFetchFail(error));
        });
        
        
    }
};
