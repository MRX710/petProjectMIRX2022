import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProvider';
import { IProfile } from '../../types/profileTypes';

interface IFetchProfileDataProps {
   username: string
   password: string
}

export const fetchProfileData = createAsyncThunk<IProfile, string | undefined, IThunkConfig<string>>(
    'profile/fetchProfileData',
    async (profileId, thunkAPI) => {
        const {
            extra,
            rejectWithValue,
        } = thunkAPI;

        if (!profileId) {
            rejectWithValue('error');
        }

        try {
            const response = await extra.api.get<IProfile>(
                `/profile/${profileId}`,
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

