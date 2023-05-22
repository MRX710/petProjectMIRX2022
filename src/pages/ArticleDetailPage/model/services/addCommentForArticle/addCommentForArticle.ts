import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProvider';
import { IComment } from "entities/Comment";
import { getUserAuthData } from "entities/User";
import { getArticleDetailsData } from "entities/Article/model/selectors/articleDetails";
import {
    fetchCommentsByArticleId,
} from "../../services/fetchCommentsByArticleId/fetchCommentsByArticleId";

export const addCommentForArticle = createAsyncThunk<IComment, string, IThunkConfig<string>>(
    'articleDetails/addCommentForArticle',
    async (text, thunkAPI) => {
        const {
            extra,
            dispatch,
            rejectWithValue,
            getState,
        } = thunkAPI;

        const userData = getUserAuthData(getState());
        const article = getArticleDetailsData(getState());

        if (!userData || !text || !article) {
            return rejectWithValue('no data');
        }

        try {
            const response = await extra.api.post<IComment>(
                '/comments',
                {
                    articleId: article?.id,
                    userId: userData?.id,
                    text,
                },
            );
            if (!response.data) throw new Error();

            dispatch(fetchCommentsByArticleId(article?.id));

            return response.data;
        }
        catch (err) {
            return rejectWithValue('error');
        }
    },
);

