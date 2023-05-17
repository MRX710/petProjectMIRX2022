import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchArticleById } from "entities/Article/model/services/fetchArticleById/fetchArticleById";
import { IArticleDetailsScheme } from '../types/articleDetailsScheme';
import { IArticle } from "../types/article";


const initialState: IArticleDetailsScheme = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const articleDetailsSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleById.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticleById.fulfilled, (state, action: PayloadAction<IArticle>) => {
                state.isLoading = false;
                state.data = action?.payload;
            })
            .addCase(fetchArticleById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});
export const { actions: articleDetailsActions } = articleDetailsSlice;
export const { reducer: articleDetailsReducer } = articleDetailsSlice;
