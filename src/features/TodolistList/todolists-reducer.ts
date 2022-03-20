import {v1} from 'uuid';
import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";

//types>>>>>>>>>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | SetTodolistsActionType

const initialState: Array<TodolistDomainType> =  []

export const todolistsReducer =
    (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST':  {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => (tl.id === action.id ? {...tl, title: action.title} : tl))
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => (tl.id === action.id ? {...tl, filter: action.filter} : tl))
        }
        default:
            return state;
    }
}

//actions>>>>>>>>>
export const removeTodolistAC = (todolistId: string) =>
    ({ type: 'REMOVE-TODOLIST', id: todolistId} as const)
export const addTodolistAC = (title: string) =>
    ({ type: 'ADD-TODOLIST', title: title, todolistId: v1()} as const)
export const changeTodolistTitleAC = (id: string, title: string) =>
    ({ type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
    ({ type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) =>
    ({type: 'SET-TODOLISTS', todolists} as const)


//thunks>>>>>>>>
export const fetchTodolistsTC = () => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
        })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
        })
}
export const updateTodolistTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.updateTodolistTitle(todolistId, title)
        .then(res => {
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
}
export const createTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(title))
        })
}

