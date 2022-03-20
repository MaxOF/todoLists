import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType} from "./store";
import {combineReducers, createStore} from "redux";
import {tasksReducer, TasksStateType} from "./tasks-reducer";
import {TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

type InititalGlobalStateType = {
    todolists: Array<TodolistDomainType>,
    tasks: TasksStateType
}

const initialGlobalState: InititalGlobalStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 1}
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
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storeFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storeFn()}</Provider>
}