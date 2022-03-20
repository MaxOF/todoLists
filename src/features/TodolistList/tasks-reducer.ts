import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer';
import {TaskStatuses, TaskType, todolistsAPI} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";


// types>>>>>>>>>
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type ActionsType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof setTasksAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId] : state[action.todolistId].filter(t => t.id != action.taskId)
            }
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.task.todoListId] : [action.task, ...state[action.task.todoListId]]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId ? {...task, status: action.status} : task)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId ? {...task, title: action.title} : task)
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'SET-TASKS': {
            return {...state, [action.todolistId] : action.tasks}
        }
        default:
            return state;
    }
}

//actions>>>>>>>>>>>>>>
export const removeTaskAC = (taskId: string , todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const)
export const addTaskAC = (task: TaskType)=>
    ({type: 'ADD-TASK', task} as const)
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) =>
    ({type: 'CHANGE-TASK-STATUS', status, todolistId, taskId} as const)
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) =>
    ({type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)

//thunks>>>>>>>>>>>>>>>
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(res.data.items, todolistId))
        })
}
export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const removeTaskTC = (taksId: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.deleteTask(todolistId, taksId)
        .then(res => {
            dispatch(removeTaskAC(taksId, todolistId ))
        })
}
export const updateStatusTaskTC = (taskId: string, status: TaskStatuses, todolistId: string,) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {

    const allTasksFromState = getState().tasks
    const currentTasks = allTasksFromState[todolistId]
    const task = currentTasks.find(f => f.id === taskId)

    if (task) {
        todolistsAPI.updateTask(todolistId, taskId, {
            description: task.description,
            title: task.title,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            status: status
        })
            .then(res => {
                dispatch(changeTaskStatusAC(taskId, status, todolistId))
            })
    }

}
export const updateTitleTaskTC = (taskId: string, title: string, todolistId: string,) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {

        const allTasksFromState = getState().tasks
        const currentTasks = allTasksFromState[todolistId]
        const task = currentTasks.find(f => f.id === taskId)

        if (task) {
            todolistsAPI.updateTask(todolistId, taskId, {
                description: task.description,
                title: title,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                status: task.status
            })
                .then(res => {
                    dispatch(changeTaskTitleAC(taskId, title, todolistId))
                })
        }

    }