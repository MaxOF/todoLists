import {todolistsAPI, TodolistType} from "../../api/todolists-api";

import {RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {handleServerNetwork} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

//types>>>>>>>>>
export type clearTodosDataType = ReturnType<typeof clearTodosDataAC>

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

//thunks>>>>>>>>


export const fetchTodolistsTC = createAsyncThunk('todolists/fetchTodolists', async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.getTodolists()
    try {
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolists: res.data}
    } catch (error: any) {
        handleServerNetwork(error, dispatch)
        return rejectWithValue(null)
    }

})

export const removeTodolistTC = createAsyncThunk('todolists/removeTodolist', async (todolistId: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}))
    try {
        const res = await todolistsAPI.deleteTodolist(todolistId)
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolistId: todolistId}
    } catch (error: any) {
        handleServerNetwork(error, dispatch)
        return rejectWithValue(null)
    }
})

export const updateTodolistTC = createAsyncThunk('todolists/updateTodolist', async (param: { id: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))

    try {
        const res = await todolistsAPI.updateTodolistTitle(param.id, param.title)
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {id: param.id, title: param.title}
    } catch (error: any) {
        handleServerNetwork(error, dispatch)
        return rejectWithValue(null)
    }
})

export const createTodolistTC = createAsyncThunk('todolists/createTodolist', async (title: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTodolist(title)
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolist: res.data.data.item}
    } catch (error: any) {
        handleServerNetwork(error, dispatch)
        return rejectWithValue(null)
    }
})


//slice>>>>>>>>>
const slice = createSlice({
    name: 'todolists',
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            // if we want to use Update Pattern from immer js
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state[index].filter = action.payload.filter
            }
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            // if we want to use Update Pattern from immer js
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state[index].entityStatus = action.payload.status
            }
        },
        clearTodosDataAC(state, action: PayloadAction) {
            state = []
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(createTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        })
        builder.addCase(updateTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state[index].title = action.payload.title
            }
        })
    }
})

export const {
    changeTodolistFilterAC,
    changeTodolistEntityStatusAC,
    clearTodosDataAC
} = slice.actions
export const todolistsReducer = slice.reducer





