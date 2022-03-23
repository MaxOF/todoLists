import {v1} from 'uuid';
import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetwork} from "../../utils/error-utils";
import {fetchTasksTC} from "./tasks-reducer";

//types>>>>>>>>>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
export type clearTodosDataType = ReturnType<typeof clearTodosDataAC>

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | SetTodolistsActionType
    | ReturnType<typeof changeTodolistEntityStatusAC>
    | clearTodosDataType

type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType>

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer =
    (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
        switch (action.type) {
            case 'REMOVE-TODOLIST': {
                return state.filter(tl => tl.id != action.id)
            }
            case 'ADD-TODOLIST': {
                return [{
                    ...action.todolist,
                    filter: 'all',
                    entityStatus: 'idle'
                }, ...state]
            }
            case 'CHANGE-TODOLIST-TITLE': {
                return state.map(tl => (tl.id === action.id ? {...tl, title: action.title} : tl))
            }
            case 'SET-TODOLISTS': {
                return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
            }
            case 'CHANGE-TODOLIST-FILTER': {
                return state.map(tl => (tl.id === action.id ? {...tl, filter: action.filter} : tl))
            }
            case 'CHANGE-TODOLIST-ENTITY-STATUS': {
                return state.map(tl => (tl.id === action.id ? {...tl, entityStatus: action.status} : tl))
            }
            case 'CLEAR-TODOS-DATA':
                return []
            default:
                return state;
        }
    }

//actions>>>>>>>>>
export const removeTodolistAC = (todolistId: string) =>
    ({type: 'REMOVE-TODOLIST', id: todolistId} as const)
export const addTodolistAC = (todolist: TodolistType) =>
    ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', id, title} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', id, filter} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) =>
    ({type: 'SET-TODOLISTS', todolists} as const)
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) =>
    ({type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status} as const)
export const clearTodosDataAC = () =>
    ({type: 'CLEAR-TODOS-DATA'} as const)


//thunks>>>>>>>>
export const fetchTodolistsTC = () => (dispatch: any) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
            return res.data
        })
        .then(todos => {
            todos.forEach((tl) => {
                dispatch(fetchTasksTC(tl.id))
            })
        })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    todolistsAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })

}
export const updateTodolistTC = (todolistId: string, title: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.updateTodolistTitle(todolistId, title)
        .then(() => {
            dispatch(changeTodolistTitleAC(todolistId, title))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const createTodolistTC = (title: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        })
}

