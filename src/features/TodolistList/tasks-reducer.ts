import {
    addTodolistAC, fetchTodolistsTC,
    removeTodolistAC,
} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetwork} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


// types>>>>>>>>>
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

const initialState: TasksStateType = {}

//thunks>>>>>>>>>>>>>>>

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, {dispatch}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.getTasks(todolistId)
    const tasks = res.data.items
    dispatch(setAppStatusAC({status: 'succeeded'}))
    return {tasks, todolistId}
})

export const removeTaskTC = createAsyncThunk('tasks/removeTask', async (param: { taskId: string, todolistId: string }, {dispatch}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.deleteTask(param.todolistId, param.taskId)
    return {taskId: param.taskId, todolistId: param.todolistId}

})

export const createTaskTC = createAsyncThunk('tasks/createTask', async (param: { todolistId: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTask(param.todolistId, param.title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            const task = res.data.data.item
            return task
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error: any) {
        handleServerNetwork(error, dispatch)
        return rejectWithValue(null)
    }
})

export const updateTaskTC = createAsyncThunk('tasks/updateTask', async(param: {taskId: string, model: UpdateDomainTaskModelType, todolistId: string},
                                                                       {dispatch, getState, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}))

    const state = getState() as AppRootStateType
    const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
    if (!task) {
        return rejectWithValue('task not found in the state')
    }
    const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...param.model
    }

    try {
        const res = await todolistsAPI.updateTask(param.todolistId, param.taskId, apiModel)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return param
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch(error: any) {
        handleServerNetwork(error, dispatch)
        return rejectWithValue(null)
    }
})


const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        clearTodosDataAC(state, action: PayloadAction) {
            state = {}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todolistId]
        });
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            action.payload.todolists.forEach(tl => {
                state[tl.id] = []
            })
        });
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        });
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        });
        builder.addCase(createTaskTC.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload)
        });
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        });
    }
})

export const tasksReducer = slice.reducer

