import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator";
import ArticleComments from './ArticleComments';

export default {
    title: 'features/ArticleCommentForm',
    component: ArticleComments,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleComments>;

const Template: ComponentStory<typeof ArticleComments> = (args) => <ArticleComments {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    id: '1',
};
Normal.decorators = [
    StoreDecorator({}),
];
