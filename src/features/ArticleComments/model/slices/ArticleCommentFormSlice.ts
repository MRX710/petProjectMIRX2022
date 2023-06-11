import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IComment } from "entities/Comment";
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle";
import { IArticleCommentFormScheme } from '../types/ArticleCommentFormScheme';


const initialState: IArticleCommentFormScheme = {
    text: null,
    error: undefined,
    isLoading: false,
};

export const ArticleCommentFormSlice = createSlice({
    name: 'ArticleCommentForm',
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string | null>) => {
            state.text = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addCommentForArticle.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(addCommentForArticle.fulfilled, (state, action: PayloadAction<IComment>) => {
                state.isLoading = false;
                // state.data = action?.payload;
            })
            .addCase(addCommentForArticle.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});
export const { actions: ArticleCommentFormActions } = ArticleCommentFormSlice;
export const { reducer: ArticleCommentFormReducer } = ArticleCommentFormSlice;
