import * as types from './ActionType'
import {  getDatabase,ref, child, push, update , onValue, off} from "firebase/database";
import { getStorage ,getDownloadURL,uploadBytes,ref as storageRef} from 'firebase/storage';

const getUsersRequest=()=>({
    type: types.GET_USERS_REQUEST
})

const getUserSuccess=(payload)=>({
    type:types.GET_USERS_SUCCESS,
    payload
})

const getUserFailure=(payload)=>({
    type:types.GET_USERS_FAILURE,
    payload
})

export const getUserDetails=(id)=>
{
    const db = getDatabase();
    return (dispatch)=>{
        dispatch(getUsersRequest());
        const postsRef = ref(db, 'posts/' + id);
            const onDataUpdate = (snapshot) => {
                const postData = snapshot.val() !== null ? snapshot.val() : [];
                console.log(postData);
                dispatch(getUserSuccess(postData))
            };
            onValue(postsRef, onDataUpdate);
            // Clean up the listener when the component unmounts
            return () => {
                off(postsRef, onDataUpdate);
            };
    }
}
