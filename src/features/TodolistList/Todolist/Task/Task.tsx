import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../app/store";
import {
    removeTaskTC
} from "../../tasks-reducer";
import {TaskStatuses, TaskType} from "../../../../api/todolists-api";


export type TaskPropsType = {
    todolistId: string
    taskId: string
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
}

export const Task = React.memo(({
                                    todolistId,
                                    taskId,
                                    changeTaskStatus,
                                    changeTaskTitle,
                                    removeTask
                                }: TaskPropsType) => {

    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistId]
        .filter(task => task.id === taskId)[0])

    const dispatch = useDispatch()

    const onClickHandler = useCallback(() => removeTask(taskId, todolistId), [taskId, todolistId])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(taskId, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId);
    }, [taskId, todolistId])

    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue, todolistId)
    }, [taskId, todolistId])


    return (
        <div key={task.id} className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                color="primary"
                onChange={onChangeHandler}
            />

            <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
})