
import * as ActionTypes from './ActionTypes';
export const loginUser=(userDetails)=>({
    type:ActionTypes.USER_LOGGED_IN,
    payload:userDetails

})
export const updateCredits=(credits)=>({
    type:ActionTypes.UPDATE_CREDITS,
    payload:credits

})