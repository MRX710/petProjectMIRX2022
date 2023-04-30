import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IUser, userActions } from 'entities/User';
import i18n from 'shared/config/i18n/i18n';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';

interface LoginByUsernameProps {
   username: string
   password: string
}

export const loginByUsername = createAsyncThunk<IUser, LoginByUsernameProps, { rejectValue: string }>(
    'login/loginByUsername',
    async (authData: LoginByUsernameProps, thunkAPI) => {
        try {
            const response = await axios.post<IUser>(
                'http://localhost:8000/login',
                authData,
            );
            if (!response.data) throw new Error('Данных нет!');

            const data = response.data;
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(data));
            thunkAPI.dispatch(userActions.setAuthData(data));
            return response.data;
        }
        catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(i18n.t('Вы ввели неверный логин или пароль'));
        }
    },
);

