import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateScheme } from "app/providers/StoreProvider";
import { IArticle } from 'entities/Article/model/types/article';
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from "shared/const/localStorage";
import { IArticleView } from "entities/Article";
import { fetchArticlesList } from "../services/fetchArticlesList/fetchArticlesList";
import { IArticlesPageScheme } from '../types/articlesPageScheme';

const initialState: IArticlesPageScheme = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    view: IArticleView.TILE,
    limit: 9,
    page: 1,
    hasMore: true,
    _inited: false,
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
        initState: (state) => {
            state._inited = true;
            state.view = localStorage.getItem(ARTICLE_VIEW_LOCALSTORAGE_KEY) as IArticleView;
            state.limit = state.view === IArticleView.LIST ? 4 : 9;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setHasMore: (state, action: PayloadAction<boolean>) => {
            state.hasMore = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                if (action?.meta?.arg?.resetPreviousData) {
                    articlesPageAdapter.setAll(state, []);
                }
            })
            .addCase(fetchArticlesList.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action?.meta?.arg?.resetPreviousData) {
                    articlesPageAdapter.setAll(state, action?.payload);
                }
                else {
                    articlesPageAdapter.addMany(state, action?.payload);
                }
                state.hasMore = action.payload.length >= state.limit;
            })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});
export const { actions: articlesPageActions } = articlesPageSlice;
export const { reducer: articlesPageReducer } = articlesPageSlice;
