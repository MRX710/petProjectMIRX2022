import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchCommentsByArticleId.pending, (state, action) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(fetchCommentsByArticleId.fulfilled, (state, action: PayloadAction<IComment[]>) => {
    //             state.isLoading = false;
    //             commentsAdapter.setAll(state, action?.payload);
    //         })
    //         .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});
export const { actions: articlesPageActions } = articlesPageSlice;
export const { reducer: articlesPageReducer } = articlesPageSlice;
