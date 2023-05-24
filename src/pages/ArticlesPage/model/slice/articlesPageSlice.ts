import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateScheme } from "app/providers/StoreProvider";
import { IArticle, IArticleView } from 'entities/Article/model/types/article';
import { fetchArticlesList } from "pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList";
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from "shared/const/localStorage";
import { IArticlesPageScheme } from '../types/articlesPageScheme';

const initialState: IArticlesPageScheme = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    view: IArticleView.TILE,
};

const articlesPageAdapter = createEntityAdapter<IArticle>({
    selectId: (comment) => comment.id,
});

export const getArticles = articlesPageAdapter.getSelectors<StateScheme>(
    (state) => state?.articlesPage || articlesPageAdapter.getInitialState(),
);


export const articlesPageSlice = createSlice({
    name: 'articlesPage',
    initialState: articlesPageAdapter.getInitialState<IArticlesPageScheme>(initialState),
    reducers: {
        setView: (state, action: PayloadAction<IArticleView>) => {
            state.view = action.payload;
            localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload);
        },
        initView: (state) => {
            state.view = localStorage.getItem(ARTICLE_VIEW_LOCALSTORAGE_KEY) as IArticleView;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticlesList.fulfilled, (state, action: PayloadAction<IArticle[]>) => {
                state.isLoading = false;
                articlesPageAdapter.setAll(state, action?.payload);
            })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});
export const { actions: articlesPageActions } = articlesPageSlice;
export const { reducer: articlesPageReducer } = articlesPageSlice;
