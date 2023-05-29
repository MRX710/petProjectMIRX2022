import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { changeApi } from "shared/api/api";
import axios from "axios";
import { IUser, IUserScheme } from '../types/user';

const initialState: IUserScheme = {
    authData: undefined,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<IUser>) => {
            state.authData = action.payload;
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(action.payload));
            changeApi(axios.create({
                baseURL: __API__,
                headers: {
                    authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || '',
                },
            }));
        },
        initializeAuthData: (state) => {
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            if (user) {
                state.authData = JSON.parse(user);
            }
        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        },

    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
