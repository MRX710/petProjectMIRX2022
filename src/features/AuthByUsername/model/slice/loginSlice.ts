import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILoginScheme } from 'features/AuthByUsername/model/types/loginScheme';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';

const initialState: ILoginScheme = {
    username: 'admin',
    password: '123',
    isLoading: false,
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string | null>) => {
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string | null>) => {
            state.password = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByUsername.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(loginByUsername.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;
            })
            .addCase(loginByUsername.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
