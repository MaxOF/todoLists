import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';


import {action} from "@storybook/addon-actions";
import {Task} from "../Task";


export default {
    title: 'TODOLIST/Task',
    component: Task,
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


const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});

TaskIsDoneStory.args = {
    // ...baseArgs,
    todolistId: 'id todolist',
    task: {id: '1', title: 'JS', isDone: true},
};
export const TaskIsNotDoneStory = Template.bind({});
TaskIsNotDoneStory.args = {
    // ...baseArgs,
    todolistId: 'id todolist',
    task: {id: '1', title: 'HTML', isDone: false},
};


