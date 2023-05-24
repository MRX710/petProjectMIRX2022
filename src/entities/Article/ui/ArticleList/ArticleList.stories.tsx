import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IArticleView } from "../../model/types/article";
import { ArticleList } from './ArticleList';

export default {
    title: 'entities/ArticleList',
    component: ArticleList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleList>;

const Template: ComponentStory<typeof ArticleList> = (args) => <ArticleList {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

export const ListIsLoading = Template.bind({});
ListIsLoading.args = {
    isLoading: true,
    articles: [],
    view: IArticleView.LIST,
};

export const TileIsLoading = Template.bind({});
TileIsLoading.args = {
    isLoading: true,
    articles: [],
    view: IArticleView.TILE,
};
