import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProvider';
import { articlesSortActions } from "features/articlesSort";
import { SortOrder } from "shared/types/baseFilters";
import { IArticleSortField } from "features/articlesSort/model/types/articlesSort";
import { ArticleEnum } from "entities/Article/model/types/article";
import { getArticlesIsInited } from "../../selectors/getArticlesPageState";
import { articlesPageActions } from "../../slice/articlesPageSlice";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";

export const initArticlesPage = createAsyncThunk<void, URLSearchParams, IThunkConfig<string>>(
    'articlesPage/fetchNextArticlesList',
    async (searchParams, thunkAPI) => {
        const {
            getState,
            dispatch,
        } = thunkAPI;

        const isInited = getArticlesIsInited(getState());

        if (!isInited) {
            dispatch(
                articlesSortActions.setOrder(searchParams.get('order') as SortOrder ?? 'asc'),
            );
            dispatch(
                articlesSortActions.setSort(searchParams.get('sort') as IArticleSortField ?? IArticleSortField.CREATED),
            );
            dispatch(
                articlesSortActions.setSearch(searchParams.get('search') ?? null),
            );
            dispatch(
                articlesSortActions.setType(searchParams.get('type') as ArticleEnum ?? ArticleEnum.ALL),
            );

            dispatch(articlesPageActions.initState());
            dispatch(fetchArticlesList({
                page: 1,
            }));
        }
    },
);

