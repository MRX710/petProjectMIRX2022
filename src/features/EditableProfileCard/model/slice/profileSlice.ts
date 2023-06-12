import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkArrayToMap } from "shared/lib/checkout/checkout";
import { fetchProfileData } from '../service/fetchProfileData/fetchProfileData';
import { updateProfileData } from "../service/updateProfileData/updateProfileData";
import { IProfile, IProfileScheme, ValidateProfileError } from '../types/profileTypes';

const initialState: IProfileScheme = {
    readonly: true,
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setReadOnly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload;
        },
        cancelEdit: (state) => {
            state.readonly = true;
            state.form = state?.data;
            state.validateErrors = undefined;
        },
        updateProfile: (state, action: PayloadAction<IProfile>) => {
            state.form = {
                ...(state?.form || state?.data || {}),
                ...action.payload,
            };
        },
        addError: (state, action: PayloadAction<ValidateProfileError>) => {
            if (state?.validateErrors && checkArrayToMap(state?.validateErrors) && state?.validateErrors?.every((item: string) => item !== action?.payload)) {
                state.validateErrors = [
                    // eslint-disable-next-line no-unsafe-optional-chaining
                    ...state?.validateErrors,
                    action?.payload,
                ];
            }
            else if (state?.validateErrors && checkArrayToMap(state?.validateErrors)) {
            // pass
            }
            else {
                state.validateErrors = [action?.payload];
            }
        },
        removeErrors: (state, action: PayloadAction<ValidateProfileError>) => {
            if (state?.validateErrors && checkArrayToMap(state?.validateErrors)) {
                state.validateErrors = state?.validateErrors?.filter((item: string) => item !== action?.payload);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileData.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<IProfile>) => {
                state.isLoading = false;
                state.data = action?.payload;
                state.form = action?.payload;
            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(updateProfileData.pending, (state, action) => {
                state.validateErrors = undefined;
                state.isLoading = true;
            })
            .addCase(updateProfileData.fulfilled, (state, action: PayloadAction<IProfile>) => {
                state.isLoading = false;
                state.data = action?.payload;
                state.form = action?.payload;
                state.readonly = true;
                state.validateErrors = undefined;
            })
            .addCase(updateProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.validateErrors = action.payload;
            });
    },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
