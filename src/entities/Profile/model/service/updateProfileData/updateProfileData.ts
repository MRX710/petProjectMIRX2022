import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProvider';
import { getProfileForm } from "entities/Profile";
import { validateProfileData } from "entities/Profile/model/service/validateProfileData/validateProfileData";
import { IProfile, ValidateProfileError } from '../../types/profileTypes';

interface IUpdateProfileDataProps extends IProfile {

}

export const updateProfileData = createAsyncThunk<IUpdateProfileDataProps, void, IThunkConfig<ValidateProfileError[]>>(
    'profile/updateProfileData',
    async (_, thunkAPI) => {
        const {
            extra,
            rejectWithValue,
            getState,
        } = thunkAPI;

        const formData = getProfileForm(getState());

        const errors: ValidateProfileError[] = validateProfileData(formData ?? {});

        if (errors?.length) {
            return rejectWithValue(errors);
        }

        try {
            const response = await extra.api.put<IProfile>(
                '/profile',
                formData,
            );
            
            if (!response?.data) {
                throw new Error();
            }
            return response.data;
        }
        catch (err) {
            console.log(err);
            return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
        }
    },
);

