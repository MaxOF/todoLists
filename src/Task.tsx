import React, {ChangeEvent, useCallback} from 'react';
import {TaskType} from "./Todolist";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";


export type TaskPropsType = {
    todolistId: string
    task: TaskType
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
}

export const Task = React.memo(({
                                    todolistId,
                                    task,
                                    removeTask,
                                    changeTaskStatus,
                                    changeTaskTitle
}: TaskPropsType) => {
    console.log("Task")
    const onClickHandler = useCallback(() => removeTask(task.id, todolistId), [task.id, removeTask, todolistId])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue, todolistId);
    }, [task.id, changeTaskStatus, todolistId])
    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue, todolistId);
    }, [task.id, changeTaskTitle, todolistId])


    return (
        <div key={task.id} className={task.isDone ? "is-done" : ""}>
            <Checkbox
                checked={task.isDone}
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