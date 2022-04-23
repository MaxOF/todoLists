import axios from "axios";

//types>>>>>>

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number

}
export type FieldErrorType = { field: string, error: string };

export type BaseResponseType<D = {}> = {
    resultCode: 0
    messages: string[]
    fieldsErrors: Array<FieldErrorType>
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType =  {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export type GetTasksResponse = {
    items: TaskType[]
    totalCount: number
    error: string | null
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}

//api>>>>>>>
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'b588c31f-bc7d-4fbb-8788-c7e4777eca7b'
    }
})

export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<BaseResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<BaseResponseType>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<BaseResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<BaseResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`,  model)
    },
}

export const authAPI = {
    login(args: LoginParamsType) {
        return instance.post<BaseResponseType<{userId: number}>>('auth/login', args)
    },
    me() {
        return instance.get<BaseResponseType<{id: number, email: string, login: string}>>('auth/me')
    },
    logout() {
        return instance.delete<BaseResponseType>('auth/login')
    }
}