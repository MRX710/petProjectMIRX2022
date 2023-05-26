import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProvider';
import {
    getArticlesHasMore,
    getArticlesLoading,
    getArticlesPageNum,
} from "pages/ArticlesPage/model/selectors/getArticlesPageState";
import { fetchArticlesList } from "pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList";

export const fetchNextArticlesList = createAsyncThunk<void, void, IThunkConfig<string>>(
    'articlesPage/fetchNextArticlesList',
    async (props, thunkAPI) => {
        const {
            extra,
            rejectWithValue,
            getState,
            dispatch,
        } = thunkAPI;

        const isLoading = getArticlesLoading(getState());
        const hasMore = getArticlesHasMore(getState());
        const page = getArticlesPageNum(getState());

        try {
            if (hasMore && !isLoading) {
                dispatch(fetchArticlesList({
                    page: page + 1,
                    newPage: true,
                }));
            }

            if (!hasMore) {
                throw new Error('Больше нет статей!');
            }
        }
        catch (err) {
            return rejectWithValue('error');
        }
    },
);

