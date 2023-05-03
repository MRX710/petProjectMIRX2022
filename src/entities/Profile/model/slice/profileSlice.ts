import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProfile, IProfileScheme } from '../types/profileTypes';

const initialState: IProfileScheme = {
    readonly: true,
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
