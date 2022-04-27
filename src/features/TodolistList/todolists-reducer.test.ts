import {
    changeTodolistEntityStatusAC,
    changeTodolistFilterAC,
    createTodolistTC, fetchTodolistsTC, FilterValuesType, removeTodolistTC,
    TodolistDomainType,
    todolistsReducer, updateTodolistTC
} from './todolists-reducer';
import {v1} from 'uuid';
import {RequestStatusType} from "../../app/app-reducer";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = [];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", entityStatus: 'idle', addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", entityStatus: 'idle', addedDate: '', order: 1},
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistTC.fulfilled({todolistId: todolistId1}, 'requestId', todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let newTodolistTitle = "New Todolist";

    let payload = {
        todolist: {
            id: 'todolistId3',
            title: newTodolistTitle,
            addedDate: '',
            order: 0
        }
    };
    const endState = todolistsReducer(startState, createTodolistTC.fulfilled(payload, 'requestId', newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe("all");
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    let payload = {id: todolistId2, title: newTodolistTitle};
    const action = updateTodolistTC.fulfilled(payload, 'requestId', payload);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";

    const action = changeTodolistFilterAC({id: todolistId2, filter: newFilter});

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('correct todolist should be set to the state', () => {

    let payload = {todolists: startState};

    const action = fetchTodolistsTC.fulfilled(payload, 'requestId');

    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2)
});

test('correct entity status of todolist should be changed', () => {
    let newStatus: RequestStatusType = "loading";

    const action = changeTodolistEntityStatusAC({id: todolistId2, status: newStatus});

    const endState = todolistsReducer(startState, action);

    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe(newStatus);
});


