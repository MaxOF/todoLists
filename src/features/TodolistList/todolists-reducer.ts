
import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetwork} from "../../utils/error-utils";
import {fetchTasksTC} from "./tasks-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

//types>>>>>>>>>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type clearTodosDataType = ReturnType<typeof clearTodosDataAC>

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

//initialState>>>>>>>>>

const initialState: Array<TodolistDomainType> = []

//slice>>>>>>>>>
const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{todolistId: string}>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if(index > -1){
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{todolist: TodolistType}>) {
            // if we want to use Update Pattern from immer js
            state.push({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{id: string, title: string}>) {
            // if we want to use Update Pattern from immer js
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if(index > -1) {
                state[index].title = action.payload.title
            }
        },
        changeTodolistFilterAC(state, action: PayloadAction<{id: string, filter: FilterValuesType}>) {
            // if we want to use Update Pattern from immer js
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if(index > -1){
                state[index].filter = action.payload.filter
            }
        },
        setTodolistsAC(state, action: PayloadAction<{todolists: Array<TodolistType>}>) {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{id: string, status: RequestStatusType}>) {
            // if we want to use Update Pattern from immer js
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1){
                state[index].entityStatus = action.payload.status
            }
        },
        clearTodosDataAC(state, action: PayloadAction) {
            state = []
        }
    }
})

export const {
    removeTodolistAC,
    addTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    setTodolistsAC,
    changeTodolistEntityStatusAC,
    clearTodosDataAC
} = slice.actions
export const todolistsReducer = slice.reducer


//thunks>>>>>>>>
export const fetchTodolistsTC = () => (dispatch: any) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC({todolists: res.data}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return res.data
        })
        .then(todos => {
            todos.forEach((tl) => {
                dispatch(fetchTasksTC(tl.id))
            })
        })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}))
    todolistsAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(removeTodolistAC({todolistId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })

}
export const updateTodolistTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.updateTodolistTitle(todolistId, title)
        .then(() => {
            dispatch(changeTodolistTitleAC({id: todolistId, title}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}
export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC({todolist: res.data.data.item}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}

