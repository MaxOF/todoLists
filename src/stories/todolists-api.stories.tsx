import {useEffect, useState} from "react";
import {todolistsAPI, TodolistType} from "../api/todolists-api";

export default {
    title: 'API',
}

export const GetTodolists = () => {
    const [state, setState] = useState<TodolistType[]>()
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>()
    useEffect(() => {
        todolistsAPI.createTodolist('HEY MAN')
            .then(res => {
                setState(res.data.data.item.title)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>()
    const todolistId = '0169793c-61f8-4fd7-b634-7a159b1344fd'
    useEffect(() => {
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>()
    const todolistId = '6797dddd-6d38-4b2c-9a47-c02295d2d6b1'
    const title = 'don`t forget to learn english every day'
    useEffect(() => {
        todolistsAPI.updateTodolistTitle(todolistId, title)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>()

    useEffect(() => {
        const todolistId = 'dcee8987-720a-49dc-8df0-0259e195c1bc'
        todolistsAPI.getTasks(todolistId)
            .then(res => {
                setState(res.data.items)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>()

    useEffect(() => {
        const todolistId = '6797dddd-6d38-4b2c-9a47-c02295d2d6b1'
        const title = 'JavaScript'
        todolistsAPI.createTask(todolistId, title)
            .then(res => {
                setState(res.data.data.item)
            })
    })

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>()

    useEffect(() => {
        const todolistId = 'dcee8987-720a-49dc-8df0-0259e195c1bc'
        const taskId = '55c1974b-3268-4732-aed1-759148d9c9f7'
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(res => {
                setState(res.data)
            })
    })

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>()

    useEffect(() => {
        const todolistId = 'c0edf98b-f213-4ed8-88f4-d62d0c2876f8'
        const taskId = 'ac62cc5c-0ec8-43af-9c21-155bdbd1467a'
        const title = 'JavaScript >>'
        todolistsAPI.updateTaskTitle(todolistId, taskId, title)
            .then(res => {
                setState(res.data.data.item)
            })
    })

    return <div>{JSON.stringify(state)}</div>
}