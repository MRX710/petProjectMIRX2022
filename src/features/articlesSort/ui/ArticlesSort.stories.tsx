import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator";
import { ArticlesSort } from './ArticlesSort';

export default {
    title: 'features/ArticlesSort',
    component: ArticlesSort,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticlesSort>;

const Template: ComponentStory<typeof ArticlesSort> = (args) => <ArticlesSort {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
    StoreDecorator({}),
];
