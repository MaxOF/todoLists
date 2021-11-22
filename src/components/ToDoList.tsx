import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {FilterValuesType} from "../App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}


export function ToDoList(props: PropsType) {
    const [title, setTitle] = useState<string>("")
    const addTask = () => {
        props.addTask(title)
        setTitle("")
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            addTask()
        }
    }
    const setAllFilter = () => props.changeFilter('all')
    const setActiveFilter = () => props.changeFilter('active')
    const setCompletedFilter = () => props.changeFilter('completed')

    const taskJSX = props.tasks.map(item => {
        return <li key={item.id}>
            <input type="checkbox" checked={item.isDone}/>
            <span>{item.title}</span>
            <button onClick={() => props.removeTask(item.id)}>x</button>
        </li>
    } )

    return(
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input
                    value={title}
                    onChange={changeTitle}
                    onKeyPress={onKeyPressHandler}
                    />
                    <button onClick={() => addTask()}>+</button>
                </div>
                <ul>
                    {taskJSX}
                </ul>
                <div>
                    <button onClick={setAllFilter}>All</button>
                    <button onClick={setActiveFilter}>Active</button>
                    <button onClick={setCompletedFilter}>Completed</button>
                </div>
            </div>
        </div>
    )
};

