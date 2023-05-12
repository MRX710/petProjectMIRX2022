import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProvider';
import { getUserAuthData, IUser, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';

interface LoginByUsernameProps {
   username: string
   password: string
}

export const loginByUsername = createAsyncThunk<IUser, LoginByUsernameProps, IThunkConfig<string>>(
    'login/loginByUsername',
    async (authData: LoginByUsernameProps, thunkAPI) => {
        const {
            extra,
            dispatch,
            rejectWithValue,
            getState,
        } = thunkAPI;
        try {
            const response = await extra.api.post<IUser>(
                '/login',
                authData,
            );
            if (!response.data) throw new Error('Данных нет!');

            const data = response.data;
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(data));
            dispatch(userActions.setAuthData(data));
            console.log(getUserAuthData(getState()));
            if (extra?.navigate) extra.navigate('/profile');
            console.log('return');
            return response.data;
        }
        catch (err) {
            console.log(err);
            return rejectWithValue('error');
        }
    },
);

