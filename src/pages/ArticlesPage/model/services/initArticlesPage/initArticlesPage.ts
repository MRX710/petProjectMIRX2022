import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProvider';
import { fetchArticlesList } from "pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList";
import { articlesPageActions } from "pages/ArticlesPage/model/slice/articlesPageSlice";
import { getArticlesIsInited } from "pages/ArticlesPage/model/selectors/getArticlesPageState";
import { articlesSortActions } from "features/articlesSort";
import { SortOrder } from "shared/types/baseFilters";
import { IArticleSortField } from "features/articlesSort/model/types/articlesSort";
import { ArticleEnum } from "entities/Article/model/types/article";

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

