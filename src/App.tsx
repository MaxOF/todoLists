import React, {useState} from 'react';

import {ToDoList} from "./components/ToDoList";
import './App.css';

import {TaskType} from "./components/ToDoList";
import {v1} from "uuid";

export type FilterValuesType = 'all'|'active'|'completed'


function App() {

    const todoListTitle_1:string = "What to learn";

    const initialState = [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ]

    const [tasks, setTasks] = useState<Array<TaskType>>(initialState)
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const changeFilter =  (filter: FilterValuesType) => {
        setFilter(filter)
    }
    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(task => task.id !== taskID))
    }
    const addTask = (newTaskTitle: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }
        setTasks([...tasks, newTask])
    }


    let tasksForRender = tasks
    if (filter === 'active') {
        tasksForRender = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForRender = tasks.filter(t => t.isDone)
    }

    return (
        <div>
            <ToDoList
                title={todoListTitle_1}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}


export default App;
