import {
    createEntityAdapter,
    createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import { IComment } from "entities/Comment";
import { StateScheme } from "app/providers/StoreProvider";
import { fetchProfileData, IProfile } from "entities/Profile";
import {
    fetchCommentsByArticleId,
} from "pages/ArticleDetailPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { IArticleDetailsCommentsScheme } from "../types/ArticleDetailsCommentsScheme";

const initialState: IArticleDetailsCommentsScheme = {
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
};

const commentsAdapter = createEntityAdapter<IComment>({
    selectId: (comment) => comment.id,
});

export const getArticleComments = commentsAdapter.getSelectors<StateScheme>(
    (state) => state?.articleDetailsComments || commentsAdapter.getInitialState(),
);

const ArticleDetailsCommentsSlice = createSlice({
    name: 'ArticleDetailsCommentsSlice',
    initialState: commentsAdapter.getInitialState<IArticleDetailsCommentsScheme>(initialState),
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

export const { actions: ArticleDetailsCommentsActions } = ArticleDetailsCommentsSlice;
export const { reducer: ArticleDetailsCommentsReducer } = ArticleDetailsCommentsSlice;
