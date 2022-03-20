import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';


import {action} from "@storybook/addon-actions";
import {Task} from "../features/TodolistList/Todolist/Task/Task";
import {ReduxStoreProviderDecorator} from "../app/ReduxStoreProviderDecorator";


export default {
    title: 'TODOLIST/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
  //для общих аргументов
  args: {
    removeTask: action("Task has removed"),
    changeTaskStatus: action("changeTaskStatus"),
    changeTaskTitle: action("changeTaskTitle"),
  }
} as ComponentMeta<typeof Task>;

//можно упростить строки 15-20
// const baseArgs = {
//     removeTask: action("Task has removed"),
//     changeTaskStatus: action("changeTaskStatus"),
//     changeTaskTitle: action("changeTaskTitle"),
// }


const Template: ComponentStory<typeof Task> = (args: any) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});

TaskIsDoneStory.args = {
    // ...baseArgs,
    todolistId: "todolistId2",
    taskId: '3',
};
export const TaskIsNotDoneStory = Template.bind({});
TaskIsNotDoneStory.args = {
    // ...baseArgs,
    todolistId: "todolistId2",
    taskId: '4',
};


