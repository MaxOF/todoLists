import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {
    changeTodolistFilterAC,
    createTodolistTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType,
    updateTodolistTC
} from "./todolists-reducer";
import {createTaskTC, TasksStateType} from "./tasks-reducer";
import React, {useCallback, useEffect} from "react";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";

type TodolistListPropsType = {}
export const TodolistsList = (props: TodolistListPropsType) => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])


    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(createTaskTC(todolistId, title));
    }, [dispatch])


    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, [dispatch])

    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistTC(id));
    }, [dispatch])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(updateTodolistTC(id, title))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch])


    return (
        <>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(tl => {
                        return <Grid item key={tl.id}>
                            <Paper style={{padding: "10px"}}>
                                <Todolist
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasks[tl.id]}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </>
    )
}