import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { IArticleDetailsCommentsScheme } from "pages/ArticleDetailPage";
import { IComment } from "entities/Comment";
import { StateScheme } from "app/providers/StoreProvider";
import { IArticlesPageScheme } from '../types/articlesPageScheme';

const initialState: IArticlesPageScheme = {
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
};

const articlesPageAdapter = createEntityAdapter<IComment>({
    selectId: (comment) => comment.id,
});

export const getArticles = articlesPageAdapter.getSelectors<StateScheme>(
    (state) => state?.articleDetailsComments || articlesPageAdapter.getInitialState(),
);


export const articlesPageSlice = createSlice({
    name: 'articlesPage',
    initialState: articlesPageAdapter.getInitialState<IArticlesPageScheme>(initialState),
    reducers: {},
});
export const { actions: articlesPageActions } = articlesPageSlice;
export const { reducer: articlesPageReducer } = articlesPageSlice;
