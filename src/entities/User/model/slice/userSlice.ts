import { createSlice } from '@reduxjs/toolkit';
import { IUserScheme } from 'entities/User/model/types/user';

const initialState: IUserScheme = {
    authData: {
        id: '1',
        username: 'admin',
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
