import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IComment } from "entities/Comment";
import { StateScheme } from "app/providers/StoreProvider";
import { IArticleCommentsListScheme } from '../types/ArticleCommentsListScheme';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';


const initialState: IArticleCommentsListScheme = {
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
};

const commentsAdapter = createEntityAdapter<IComment>({
    selectId: (comment) => comment.id,
});

export const getArticleCommentsList = commentsAdapter.getSelectors<StateScheme>(
    (state) => state?.ArticleCommentsList || commentsAdapter.getInitialState(),
);

export const ArticleCommentsListSlice = createSlice({
    name: 'ArticleCommentsList',
    initialState: commentsAdapter.getInitialState<IArticleCommentsListScheme>(initialState),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsByArticleId.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchCommentsByArticleId.fulfilled, (state, action: PayloadAction<IComment[]>) => {
                state.isLoading = false;
                commentsAdapter.setAll(state, action?.payload);
            })
            .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: ArticleCommentsListActions } = ArticleCommentsListSlice;
export const { reducer: ArticleCommentsListReducer } = ArticleCommentsListSlice;
