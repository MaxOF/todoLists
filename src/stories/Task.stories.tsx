import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';


import {action} from "@storybook/addon-actions";
import {TaskRedux} from "../TaskRedux";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";


export default {
    title: 'TODOLIST/Task',
    component: TaskRedux,
    decorators: [ReduxStoreProviderDecorator],
  //для общих аргументов
  args: {
    removeTask: action("Task has removed"),
    changeTaskStatus: action("changeTaskStatus"),
    changeTaskTitle: action("changeTaskTitle"),
  }
} as ComponentMeta<typeof TaskRedux>;

//можно упростить строки 15-20
// const baseArgs = {
//     removeTask: action("Task has removed"),
//     changeTaskStatus: action("changeTaskStatus"),
//     changeTaskTitle: action("changeTaskTitle"),
// }


const Template: ComponentStory<typeof TaskRedux> = (args: any) => <TaskRedux {...args} />;

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


