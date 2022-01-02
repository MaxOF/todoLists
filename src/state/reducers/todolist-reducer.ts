import {FilterValuesType, TodolistType} from "../../App";
import {v1} from "uuid";

export type removeTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type addTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
}
export type changeTodolistTittleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}
export type changeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}
type ActionsType =
    removeTodolistActionType
    | addTodolistActionType
    | changeTodolistTittleActionType
    | changeTodolistFilterActionType

export const TodolistReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                id: v1(), title: action.title, filter: 'all'
            }]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title;
            }
            return [
                ...state
            ]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [
                ...state
            ]
        }
        default:
            return state
    }
};


export const removeTodolistAC = (todolistId: string): removeTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistId
    } as const
}

export const addTodolistAC = (title: string): addTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        title
    } as const
}

export const changeTodolistTitle = (id: string, title: string): changeTodolistTittleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id,
        title

    }
}

export const changeTodolistFilter = (id: string, filter: FilterValuesType): changeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id,
        filter

    }
}