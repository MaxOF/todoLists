import {authAPI} from "../api/todolists-api";
import {Dispatch} from "redux";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {handleServerAppError, handleServerNetwork} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


//types >>>>>>

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: RequestStatusType,
    error: string | null,
    isInitialized: boolean
}

//initial state >>>>>>

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

//slice >>>>>>

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppErrorAC(state, action: PayloadAction<{error: string | null}>){
            state.error = action.payload.error
        },
        setAppStatusAC(state, action: PayloadAction<{status: RequestStatusType }>){
            state.status = action.payload.status
        },
        setIsInitializedAC(state, action: PayloadAction<{isInitialized: boolean}>){
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = slice.reducer
export const {setAppErrorAC, setAppStatusAC, setIsInitializedAC} = slice.actions

//thunks >>>>>>

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
        dispatch(setIsInitializedAC({isInitialized: true}))
    })
        .catch((error) => {
            handleServerNetwork(error, dispatch)
        })
}
