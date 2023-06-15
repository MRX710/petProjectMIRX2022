import { Currency } from "entities/Currency";
import { Country } from "entities/Country";
import { ValidateProfileError } from "../../model/consts/consts";
import { IProfileScheme } from "../types/profileTypes";
import { profileActions, profileReducer } from "./profileSlice";
import { updateProfileData } from "../service/updateProfileData/updateProfileData";

const data = {
    firstname: "MIRX",
    lastname: "MIRX001",
    age: 21,
    currency: Currency.RUB,
    country: Country.Russia,
    city: "Krasnodar",
    username: "admin",
};

describe('profileSlice', () => {
    test('test readonly true', () => {
        const state: DeepPartial<IProfileScheme> = { readonly: false };
        expect(profileReducer(
            state as IProfileScheme,
            profileActions.setReadOnly(true),
        )).toEqual({ readonly: true });
    });

    test('test update profile service pending', () => {
        const state: DeepPartial<IProfileScheme> = {
            isLoading: false,
            validateErrors: [ValidateProfileError.SERVER_ERROR],
        };
        expect(profileReducer(
            state as IProfileScheme,
            updateProfileData.pending,
        )).toEqual({
            isLoading: true,
            validateErrors: undefined,
        });
    });

    test('test update profile service fulfilled', () => {
        const state: DeepPartial<IProfileScheme> = {
            isLoading: true,
        };
        expect(profileReducer(
            state as IProfileScheme,
            updateProfileData.fulfilled(data, ''),
        )).toEqual({
            isLoading: false,
            validateErrors: undefined,
            readonly: true,
            form: data,
            data,
        });
    });
});
