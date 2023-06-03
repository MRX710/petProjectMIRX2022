import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProvider';
import { IArticle } from "entities/Article";
import {
    getArticlesFiltersOrder,
    getArticlesFiltersSearch,
    getArticlesFiltersSort,
    getArticlesFiltersType,
} from "features/articlesSort/model/selectors/getArticlesSort";
import { IArticlesSortScheme } from "features/articlesSort";
import { addQueryParams } from "shared/lib/url/addQueryParams/addQueryParams";
import { ArticleEnum } from "entities/Article/model/types/article";
import { articlesPageActions } from "../../slice/articlesPageSlice";
import {
    getArticlesHasMore,
    getArticlesLimit,
    getArticlesPageNum,
} from "../../selectors/getArticlesPageState";


interface IFetchArticlesListProps {
   // page можно задать извне, но если не задан берется мз стейта
   page?: number
   // флаг менять ли номер страницы
   newPage?: boolean
   // сброс раннее полученных данных
   resetPreviousData?: boolean
   // измененное фильтруемое поле
   filterField?: DeepPartial<IArticlesSortScheme>
}

export const fetchArticlesList = createAsyncThunk<IArticle[], IFetchArticlesListProps, IThunkConfig<string>>(
    'articlesPage/fetchArticlesList',
    async (props, thunkAPI) => {
        const {
            extra,
            rejectWithValue,
            getState,
            dispatch,
        } = thunkAPI;

        let {
            page,
            newPage,
            filterField,
        } = props;
        const limit = getArticlesLimit(getState());
        const hasMore = getArticlesHasMore(getState());
        const order = getArticlesFiltersOrder(getState());
        const sort = getArticlesFiltersSort(getState());
        const search = getArticlesFiltersSearch(getState());
        const type = getArticlesFiltersType(getState());

        const payload = {
            order,
            sort,
            search,
            ...(filterField || {}),
        };

        if (!page) {
            page = getArticlesPageNum(getState()) ?? 1;
        }

        if (!hasMore) {
            console.log('Больше нет статей!');
        }

        try {
            addQueryParams({
                sort, order, search, type,
            });
            const response = await extra.api.get<IArticle[]>(
                `/articles`,
                {
                    params: {
                        _expand: 'user',
                        _limit: limit,
                        _page: page,
                        _order: payload?.order,
                        _sort: payload?.sort,
                        q: payload?.search,
                        type: type === ArticleEnum.ALL ? null : type,
                    },
                },
            );

            if (!response?.data) {
                throw new Error();
            }
            if (newPage) {
                dispatch(articlesPageActions.setPage(page));
            }

            return response.data;
        }
        catch (err) {
            return rejectWithValue('error');
        }
    },
);

