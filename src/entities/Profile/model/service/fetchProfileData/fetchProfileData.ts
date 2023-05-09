import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProvider';
import { IProfile } from '../../types/profileTypes';

interface IFetchProfileDataProps {
   username: string
   password: string
}

export const fetchProfileData = createAsyncThunk<IProfile, void, IThunkConfig<string>>(
    'profile/fetchProfileData',
    async (_, thunkAPI) => {
        const {
            extra,
            rejectWithValue,
        } = thunkAPI;

        try {
            const response = await extra.api.get<IProfile>(
                '/profile',
            );

            if (!response?.data) {
                throw new Error();
            }

            return response.data;
        }
        catch (err) {
            console.log(err);
            return rejectWithValue('error');
        }
    },
);

