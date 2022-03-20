import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {
    removeTaskTC,
    updateStatusTaskTC, updateTitleTaskTC
} from "./state/tasks-reducer";
import {TaskStatuses, TaskType} from "./api/todolists-api";


export type TaskPropsType = {
    todolistId: string
    taskId: string

}

export const TaskRedux = React.memo(({
                                    todolistId,
                                    taskId
}: TaskPropsType) => {

    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistId]
        .filter(task => task.id === taskId)[0])

    const dispatch = useDispatch()

    const onClickHandler = useCallback(() => dispatch(removeTaskTC(taskId, todolistId)), [taskId, todolistId, dispatch])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(updateStatusTaskTC(taskId, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId));
    }, [taskId, todolistId, dispatch])

    const onTitleChangeHandler = useCallback((newValue: string) => {
        dispatch(updateTitleTaskTC(task.id, newValue, todolistId));
    }, [taskId, todolistId])


    return (
        <div key={task.id} className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                color="primary"
                onChange={onChangeHandler}
            />

            <EditableSpan value={task.title} onChange={onTitleChangeHandler} />
            <IconButton onClick={onClickHandler}>
                <Delete />
            </IconButton>
        </div>
    );
})