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
        userType: data.userType,
        imageUrl: imageUrl,
    };
};
export const usersFetchSuccess = (data) => {
    return {
        type: actionTypes.FETCH_USERS_SUCCESS,
        users: data
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
export const usersFetch = () =>{
    return dispatch => {
        const db = firebase.firestore();
        let userRef = db.collection('Practitioner');
        userRef.get()
        .then(user => {
            let users=[];
            user.docs.forEach(doc => {
                let user = {
                    fullname: doc.data().fullname,
                    userId: doc.id
                }
                users.push(user);
            })
            dispatch(usersFetchSuccess(users));
        }).catch(error => {
            console.log(error);
        });
    }
}
export const userFetch = (userId, userType) => {
    return dispatch => {
        dispatch(userFetchStart());
        const db = firebase.firestore();
        const storage = firebase.storage().ref();
        let userRef=db.collection(userType).doc(userId);
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
                    dispatch(userFetchSuccess(doc.data(),''));
                });
            }
        })
        .catch(error => {
            dispatch(userFetchFail(error));
        });        
    }
};
export const checkUserTypeSuccess = (userType) => {
    return {
        type: actionTypes.CHECK_USER_TYPE,
        userType: userType
    };
};
export const checkUserType = (userId) => {
    return dispatch => {
        const db = firebase.firestore();
        const ref=db.collection("Practitioner").doc(userId);
        let userType;
        ref.get().then((docSnapshot) => {
            if(docSnapshot.data()){
                userType="Practitioner";
            }else{
                userType="Trainer";
            }
            dispatch(checkUserTypeSuccess(userType));
        });
    }
};
