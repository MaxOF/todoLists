
import {v1} from "uuid";
import {TasksType} from "../../App";

export const TasksReducer = (state: Array<TasksType>, action: actionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {

            return state
        }
        default:
            return state
    }
};

type actionType = removeTaskType
type removeTaskType = ReturnType<typeof removeTaskAC>



export const removeTaskAC = (todolistID: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistID: todolistID,
            id: id
        }

    } as const
}
