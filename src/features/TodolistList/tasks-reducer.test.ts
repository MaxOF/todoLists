import {
    createTaskTC,
    fetchTasksTC,
    removeTaskTC,
    tasksReducer,
    TasksStateType, updateTaskTC
} from './tasks-reducer';
import {createTodolistTC, fetchTodolistsTC, removeTodolistTC} from './todolists-reducer';
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";

let startState: TasksStateType = {};
beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                description: '',
                startDate: '',
                deadline: '',
                todoListId: "todolistId1",
                order: 0,
                addedDate: ''
            },
            {
                id: "2",
                title: "JS",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                description: '',
                startDate: '',
                deadline: '',
                todoListId: "todolistId1",
                order: 0,
                addedDate: ''
            },
            {
                id: "3",
                title: "React",
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                description: '',
                startDate: '',
                deadline: '',
                todoListId: "todolistId1",
                order: 0,
                addedDate: ''
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                description: '',
                startDate: '',
                deadline: '',
                todoListId: "todolistId1",
                order: 0,
                addedDate: ''
            },
            {
                id: "2",
                title: "milk",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                description: '',
                startDate: '',
                deadline: '',
                todoListId: "todolistId1",
                order: 0,
                addedDate: ''
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                description: '',
                startDate: '',
                deadline: '',
                todoListId: "todolistId1",
                order: 0,
                addedDate: ''
            }
        ]
    };
});

test('correct task should be deleted f rom correct array', () => {

    let param = {taskId: "2", todolistId: "todolistId2"}
    const action = removeTaskTC.fulfilled(param, '', param);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
});
test('correct task should be added to correct array', () => {

    let task = {
        todoListId: "todolistId2",
        title: "juce",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        description: '',
        startDate: '',
        deadline: '',
        order: 0,
        addedDate: '',
        id: '123'
    }
    const action = createTaskTC.fulfilled(task, 'requestId', {title: task.title, todolistId: task.todoListId});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});
test('status of specified task should be changed', () => {
    const updatedTask = {
        taskId: "2", todolistId: "todolistId2", model: {
            title: '',
            description: '',
            status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: ''
        }
    };
    const action = updateTaskTC.fulfilled(updatedTask, 'requestId',
        {taskId: updatedTask.taskId, todolistId: updatedTask.todolistId, model: updatedTask.model})

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
});
test('title of specified task should be changed', () => {
    const updatedTask = {
        taskId: "2", todolistId: "todolistId2", model: {
            title: 'yogurt',
            description: '',
            status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: ''
        }
    };
    const action = updateTaskTC.fulfilled(updatedTask, 'requestId',
        {taskId: updatedTask.taskId, todolistId: updatedTask.todolistId, model: updatedTask.model})

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].title).toBe("JS");
    expect(endState["todolistId2"][1].title).toBe("yogurt");
    expect(endState["todolistId2"][0].title).toBe("bread");
});
test('new array should be added when new todolist is added', () => {
    const payload = {
        todolist: {
            id: 'todolistId3',
            title: 'new todolist',
            addedDate: '',
            order: 0
        }
    }
    const action = createTodolistTC.fulfilled(payload, 'requestId', payload.todolist.title);

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
test('propertry with todolistId should be deleted', () => {
    const action = removeTodolistTC.fulfilled({todolistId: "todolistId2"}, 'requestId', "todolistId2");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});
test('correct task should be set to the todolist', () => {

    const action = fetchTodolistsTC.fulfilled({
        todolists: [
            {id: '1', title: "What to learn", addedDate: '', order: 0},
            {id: '2', title: "What to buy", addedDate: '', order: 1},
        ]
    }, 'requestId');

    const endState = tasksReducer({}, action);

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2);
    expect(endState['1']).toStrictEqual([]);
    expect(endState['2']).toStrictEqual([]);
});

test('tasks should be added for todolist', () => {
    const action = fetchTasksTC.fulfilled({
        tasks: startState['todolistId1'],
        todolistId: 'todolistId1'
    }, '', 'todolistId1')

    const endState = tasksReducer({
        'todolistId2': [],
        'todolistId1': []
    }, action);


    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(0);
})