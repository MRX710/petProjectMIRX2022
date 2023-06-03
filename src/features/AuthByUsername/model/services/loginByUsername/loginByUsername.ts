import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProvider';
import { IUser, userActions } from 'entities/User';

interface LoginByUsernameProps {
   username: string | null
   password: string | null
}

export const loginByUsername = createAsyncThunk<IUser, LoginByUsernameProps, IThunkConfig<string>>(
    'login/loginByUsername',
    async (authData: LoginByUsernameProps, thunkAPI) => {
        const {
            extra,
            dispatch,
            rejectWithValue,
        } = thunkAPI;
        try {
            if (!authData!.username || !authData!.password) {
                return rejectWithValue('Введите username и пароль');
            }
            const response = await extra.api.post<IUser>(
                '/login',
                authData,
            );
            if (!response.data) throw new Error('Данных нет!');

            const data = response.data;
            dispatch(userActions.setAuthData(data));
            if (extra?.navigate) extra.navigate(`/profile/${data?.id}`);
            return response.data;
        }
        catch (err) {
            return rejectWithValue('error');
        }
    },
);

