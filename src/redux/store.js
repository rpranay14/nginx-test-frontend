import {createStore,combineReducers,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import { thunk } from 'redux-thunk'
import { USER } from './user'
export const configureStore=()=>{
    const store=createStore(
        combineReducers({
            user:USER
        }),
        applyMiddleware(thunk,logger)
    )
    return store;
}