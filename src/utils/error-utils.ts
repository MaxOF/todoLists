import {BaseResponseType} from "../api/todolists-api";
import {
    setAppErrorAC,
    setAppStatusAC,
} from "../app/app-reducer";

import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: BaseResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'Some error 😠'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetwork = (error: { message: string }, dispatch: Dispatch) => {
    dispatch(setAppErrorAC({error: error.message ? error.message : 'Some error occurred'}))
    dispatch(setAppStatusAC({status: 'failed'}))
}