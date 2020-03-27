import axios from 'axios';
import * as actionTypes from './actionTypes';
import firebase from '../../firebase';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};
export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
    };
};
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);      
    };
};
export const auth = (email, password, isSignup, userInfo) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBKNXjQsCHm5JeDq6FiYK-8hWZaWKh8Oeg';
        if(!isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBKNXjQsCHm5JeDq6FiYK-8hWZaWKh8Oeg'
        }
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
                if(isSignup){
                    dispatch(storeUser(response.data.localId, userInfo));
                }
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            });
    };
};
export const storeUser = (userId, userInfo) => {
    return dispatch => {
        const db = firebase.firestore();
        db.collection(userInfo.userType).doc(userId).set({
            email: userInfo.email,
            fullname: userInfo.fullname,
            gender: userInfo.gender,
            userType: userInfo.userType,
            weight: userInfo.weight,
            height: userInfo.height            
        });     
    }
};
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
                dispatch(logout());
            }else{
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) /1000));
            }
        }
    }
}