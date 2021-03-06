import {tasksReducer} from '../features/TodolistList/tasks-reducer';
import {todolistsReducer} from '../features/TodolistList/todolists-reducer';
import {combineReducers} from 'redux';
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";




const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})

// export const store = createStore(rootReducer, applyMiddleware(thunk));

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

export type RootReducerType = typeof rootReducer
export type AppRootStateType = ReturnType<RootReducerType>

// in order to apply to store in object window in any moment
// @ts-ignore
window.store = store;

type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()
