import * as ActionTypes from "./ActionTypes"
export const USER=(state={userinfo:null},action)=>{


    switch(action.type){
        case ActionTypes.USER_LOGGED_IN:
            return {...state,userinfo:action.payload}
        case ActionTypes.UPDATE_CREDITS:
            return {...state,userinfo:{...state.userinfo,credits:action.payload.credits}}
        default:
            return state
    }

}