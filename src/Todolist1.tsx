import React, {ChangeEvent} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Delete} from "@mui/icons-material";
import {Button, Checkbox, IconButton} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistType} from "./AppWithRedux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/reducers/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/reducers/todolist-reducer";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
}

export function Todolist1(props: PropsType) {

    const todolist = useSelector<AppRootStateType, TodolistType>(state => state.todolists
        .filter(todo => todo.id === props.todolistId)[0])

    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todolistId])

    const dispatch = useDispatch()

    const addTask = (title: string) => {
        dispatch(addTaskAC(title, props.todolistId))
    }

    const removeTodolist = () => {
        let action = removeTodolistAC(props.todolistId)
        dispatch(action)
    }
    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(props.todolistId, title))
    }

    const onAllClickHandler = () => dispatch(changeTodolistFilterAC(props.todolistId, "all"));
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAC(props.todolistId, "active"));
    const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC(props.todolistId, "completed"));

    if (todolist.filter === "active") {
        tasks = tasks.filter(t => t.isDone === false);
    }
    if (todolist.filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true);
    }

    return <div>
        <h3><EditableSpan value={todolist.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                tasks.map(t => {
                    const onClickHandler = () => {
                        let action = removeTaskAC(t.id, props.todolistId)
                        dispatch(action)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id, newIsDoneValue, props.todolistId))
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(t.id, newValue, props.todolistId))
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox checked={t.isDone} color="primary" onChange={onChangeHandler}/>
                        <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button variant={todolist.filter === 'all' ? "outlined" : "text"}
                    onClick={onAllClickHandler}
                    color="inherit"
            >All
            </Button>
            <Button variant={todolist.filter === 'active' ? "outlined" : "text"}
                    onClick={onActiveClickHandler}
                    color="primary"
            >Active
            </Button>
            <Button variant={todolist.filter === 'completed' ? "outlined" : "text"}
                    onClick={onCompletedClickHandler}
                    color="secondary"
            >Completed
            </Button>
        </div>
    </div>
}


