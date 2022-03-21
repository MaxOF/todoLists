import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import App from "./App";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";


export default {
  title: 'TODOLIST/App',
  component: App,
  decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args ) => <App {...args}/>

export const AppStory = Template.bind({});
AppStory.args = {
  demo: true
};


