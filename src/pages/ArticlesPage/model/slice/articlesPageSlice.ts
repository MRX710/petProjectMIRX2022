import { createSlice } from '@reduxjs/toolkit';
import { IArticlesPageScheme } from '../types/articlesPageScheme';


const initialState: IArticlesPageScheme = {};

export const articlesPageSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {},
});
export const { actions: articlesPageActions } = articlesPageSlice;
export const { reducer: articlesPageReducer } = articlesPageSlice;
