import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ArticleDetailPage from './ArticleDetailPage';

export default {
    title: 'shared/ArticleDetailPage',
    component: ArticleDetailPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleDetailPage>;

const Template: ComponentStory<typeof ArticleDetailPage> = () => <ArticleDetailPage />;

export const Normal = Template.bind({});
Normal.args = {};
