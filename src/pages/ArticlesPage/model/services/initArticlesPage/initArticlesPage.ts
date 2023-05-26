import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProvider';
import { fetchArticlesList } from "pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList";
import { articlesPageActions } from "pages/ArticlesPage/model/slice/articlesPageSlice";
import { getArticlesIsInited } from "pages/ArticlesPage/model/selectors/getArticlesPageState";

export const initArticlesPage = createAsyncThunk<void, void, IThunkConfig<string>>(
    'articlesPage/fetchNextArticlesList',
    async (props, thunkAPI) => {
        const {
            getState,
            dispatch,
        } = thunkAPI;

        const isInited = getArticlesIsInited(getState());

        if (!isInited) {
            dispatch(articlesPageActions.initState());
            dispatch(fetchArticlesList({
                page: 1,
            }));
        }
    },
);

