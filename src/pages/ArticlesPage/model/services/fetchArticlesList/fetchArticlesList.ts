import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProvider';
import { IArticle } from "entities/Article";


export const fetchArticlesList = createAsyncThunk<IArticle[], void, IThunkConfig<string>>(
    'articlesPage/fetchArticlesList',
    async (_, thunkAPI) => {
        const {
            extra,
            rejectWithValue,
        } = thunkAPI;

        try {
            const response = await extra.api.get<IArticle[]>(
                `/articles`,
                {
                    params: {
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

