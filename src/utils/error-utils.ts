import {BaseResponseType} from "../api/todolists-api";
import {
    setAppErrorAC,
    setAppStatusAC,
    SetAppErrorActionType,
    SetAppStatusActionType
} from "../app/app-reducer";

import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: BaseResponseType<D>, dispatch: Dispatch<SetAppStatusActionType | SetAppErrorActionType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error 😠'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetwork = (error: { message: string }, dispatch: Dispatch<SetAppStatusActionType | SetAppErrorActionType>) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}