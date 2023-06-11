import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProvider';
import { IComment } from "entities/Comment";


export const fetchCommentsByArticleId = createAsyncThunk<IComment[], string | undefined, IThunkConfig<string>>(
    'articleDetails/fetchCommentsByArticleId',
    async (articleId, thunkAPI) => {
        const {
            extra,
            rejectWithValue,
        } = thunkAPI;

        if (!articleId) {
            return rejectWithValue('error');
        }

        try {
            const response = await extra.api.get<IComment[]>(
                `/comments`,
                {
                    params: {
                        articleId,
                        _expand: 'user',
                    },
                },
            );

            if (!response?.data) {
                throw new Error();
            }

            return response.data;
        }
        catch (err) {
            return rejectWithValue('error');
        }
    },
);

