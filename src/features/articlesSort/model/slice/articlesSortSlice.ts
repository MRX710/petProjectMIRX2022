import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortOrder } from "shared/types/baseFilters";
import { ArticleEnum } from "entities/Article/model/types/article";
import { IArticlesSortScheme } from '../types/articlesSortScheme';
import { IArticleSortField } from '../types/articlesSort';


const initialState: IArticlesSortScheme = {
    order: "asc",
    sort: IArticleSortField.CREATED,
    search: null,
    type: ArticleEnum.ALL,
};

export const articlesSortSlice = createSlice({
    name: 'articlesSort',
    initialState,
    reducers: {
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload;
        },
        setSort: (state, action: PayloadAction<IArticleSortField>) => {
            state.sort = action.payload;
        },
        setSearch: (state, action: PayloadAction<string | null>) => {
            state.search = action.payload;
        },
        setType: (state, action: PayloadAction<ArticleEnum>) => {
            state.type = action.payload;
        },
    },
});
export const { actions: articlesSortActions } = articlesSortSlice;
export const { reducer: articlesSortReducer } = articlesSortSlice;
