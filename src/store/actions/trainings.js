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
export const trainingsFetchEmpty = (empty) => {
    return {
        type: actionTypes.FETCH_TRAININGS_EMPTY,
        empty: empty
    };
};
export const trainingsRemove = () => {
    return {
        type: actionTypes.FETCH_TRAININGS_LOGOUT,
    };
};
export const trainingsFetch = (userId, userType) => {
    return dispatch => {
        dispatch(trainingsFetchStart());
        const db = firebase.firestore();
        let userRef = db.collection('Trainings');
        userRef.get()
        .then(collection => {
            let coll=[];
            if(userType==="Practitioner"){
                collection.docs.forEach(doc => {
                    if(doc.data().practitionerId===userId){
                        coll.push(doc.data());
                    }
                })
            }else if(userType==="Trainer"){
                collection.docs.forEach(doc => {
                    if(doc.data().trainerId===userId){
                        let info = doc.data()
                        info.tId = doc.id;
                        coll.push(info);
                    }
                })   
            }
            if(coll.length===0) {
                dispatch(trainingsFetchEmpty("No trainings found!"));
            } else {
                dispatch(trainingsFetchSuccess(coll));
            }
        })
        .catch(error => {
            dispatch(trainingsFetchFail(error));
        });
    }
};

export const trainingPostStart = () => {
    return {
        type: actionTypes.POST_TRAINING_START,
    };
};
export const trainingPostSuccess = (message) => {
    return {
        type: actionTypes.POST_TRAINING_SUCCESS,
        message: message,
    };
};
export const trainingPostFail = (error) => {
    return {
        type: actionTypes.POST_TRAINING_FAIL,
        error: error,
    };
};
export const trainingPost = (training) => {
    return dispatch => {
        dispatch(trainingPostStart());
        const db = firebase.firestore();
        db.collection("Trainings").doc().set({
            practitionerId: training.practitionerId,
            practitionerFullname: training.practitionerFullname,
            trainerId: training.trainerId,
            trainerFullname: training.trainerFullname,
            place: training.place,
            time: training.dateTime,
            type: training.trainingType,
            intensity: training.intensity,
        }).then(() => {
            let message="Successfully added training";
            dispatch(trainingPostSuccess(message));       
        }).catch((error) => {
            dispatch(trainingPostFail(error));
        })
    }
}
export const trainingDeleteSuccess = (message) => {
    return {
        type: actionTypes.POST_TRAINING_SUCCESS,
        message: message,
    };
};
export const trainingDelete = (tId) => {
    return dispatch => {
        const db = firebase.firestore();
        let deleteDoc = db.collection('Trainings').doc(tId);
        deleteDoc.delete()
        .then(function(){
            dispatch(trainingDeleteSuccess("Remove succeeded"));
        })
    }
}
