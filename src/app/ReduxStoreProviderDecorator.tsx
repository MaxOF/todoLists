import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType, RootReducerType} from "./store";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../features/TodolistList/tasks-reducer";
import {todolistsReducer} from "../features/TodolistList/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {appReducer} from "./app-reducer";
import thunk from "redux-thunk";
import {authReducer} from "../features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {BrowserRouter, HashRouter} from "react-router-dom";


const rootReducer: RootReducerType = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})



const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", entityStatus: 'idle', addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", entityStatus: 'loading', addedDate: '', order: 1}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: '1',
                title: 'JS',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                description: '',
                startDate: '',
                deadline: '',
                todoListId: "todolistId1",
                order: 0,
                addedDate: ''
            },
            {id: '2',
                title: 'TS',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                description: '',
                startDate: '',
                deadline: '',
                todoListId: "todolistId1",
                order: 0,
                addedDate: ''}
        ],
        ["todolistId2"]: [
            {id: '3',
                title: 'GraphQL',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                description: '',
                startDate: '',
                deadline: '',
                todoListId: "todolistId2",
                order: 0,
                addedDate: ''},
            {id: '4',
                title: 'jQuery',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                description: '',
                startDate: '',
                deadline: '',
                todoListId: "todolistId2",
                order: 0,
                addedDate: ''}
        ]
    },
    app: {
        status: 'idle',
        error: null,
        isInitialized: true
    },
    auth: {
        isLoggedIn: true
    }
};


export const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

export const ReduxStoreProviderDecorator = (storeFn: () => React.ReactNode) => {
    return (
        <HashRouter>
            <Provider store={storyBookStore}>{storeFn()}</Provider>
        </HashRouter>
        )
}