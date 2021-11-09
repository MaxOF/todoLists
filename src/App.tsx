import React from 'react';

import {ToDoList} from "./components/ToDoList";
import './App.css';

function App() {

    const todoListTitle_1:string = "What to learn";
    const todoListTitle_2:string = "What to buy";


    const  tasks1 = [
        { id: 1, title: "HTML&CSS", isDone: true},
        { id: 2, title: "JS", isDone: true},
        { id: 3, title: "ReactJS", isDone: false}
    ]
    const  tasks2 = [
        { id: 1, title: "Hello World", isDone: true},
        { id: 2, title: "I am Happy", isDone: true},
        { id: 3, title: "Yo", isDone: false}
    ]


    return (
        <div>
            <ToDoList title={todoListTitle_1} tasks={tasks1}/>
            <ToDoList title={todoListTitle_2} tasks={tasks2}/>

        </div>
    );
}

export function sum (a: number, b: number) {
    return a + b;
}

export default App;
