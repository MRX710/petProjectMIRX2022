import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProvider';
import { IArticle } from "entities/Article";
import { getArticlesHasMore, getArticlesLimit } from "pages/ArticlesPage/model/selectors/getArticlesPageState";
import { articlesPageActions } from "pages/ArticlesPage/model/slice/articlesPageSlice";


interface IFetchArticlesListProps {
   page?: number
   newPage?: boolean
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

        const {
            page = 1,
            newPage,
        } = props;
        const limit = getArticlesLimit(getState());
        const hasMore = getArticlesHasMore(getState());
        if (!hasMore) {
            throw new Error('Больше нет статей!');
        }

        try {
            const response = await extra.api.get<IArticle[]>(
                `/articles`,
                {
                    params: {
                        _expand: 'user',
                        _limit: limit,
                        _page: page,
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

