import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProvider';
import { getProfileForm } from "entities/Profile";
import { IProfile } from '../../types/profileTypes';

interface IUpdateProfileDataProps extends IProfile {

}

export const updateProfileData = createAsyncThunk<IUpdateProfileDataProps, void, IThunkConfig<string>>(
    'profile/updateProfileData',
    async (_, thunkAPI) => {
        const {
            extra,
            rejectWithValue,
            getState,
        } = thunkAPI;

        const formData = getProfileForm(getState());

        try {
            const response = await extra.api.put<IProfile>(
                '/profile',
                formData,
            );

            return response.data;
        }
        catch (err) {
            console.log(err);
            return rejectWithValue('error');
        }
    },
);

