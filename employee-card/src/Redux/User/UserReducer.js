import * as types from './ActionType';

const initialState={
    isLoading:false,
    users:null,
    error:null,

}

export const UserReducer =( state =initialState, action)=>{
const {type, payload} = action;
switch(type){
    case types.GET_USERS_REQUEST:
        return {
            ...state,
            isLoading:true
        }
    case types.GET_USERS_SUCCESS:
        return{
            ...state,
            users:payload,
            isLoading:false
        }
    case types.GET_USERS_FAILURE:
        return{
            ...state,
            isLoading:false,
            error:payload
        }
    default:
        return state;
}
}