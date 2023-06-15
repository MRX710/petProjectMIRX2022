import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProvider';
import { ValidateProfileError } from "../../consts/consts";
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { IProfile } from '../../types/profileTypes';
import { validateProfileData } from '../validateProfileData/validateProfileData';

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
                `/profile/${formData?.id}`,
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

