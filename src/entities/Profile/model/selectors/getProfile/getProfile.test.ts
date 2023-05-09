import { StateScheme } from 'app/providers/StoreProvider';
import { Currency } from "entities/Currency";
import { Country } from "entities/Country";
import {
    getProfile, getProfileLoading, getProfileError,
} from './getProfile';


describe('getProfile', () => {
    test('should return value', () => {
        const data = {
            firstname: "MIRX",
            lastname: "MIRX001",
            age: 21,
            currency: Currency.RUB,
            country: Country.Russia,
            city: "Krasnodar",
            username: "admin",
        };
        const state: DeepPartial<StateScheme> = {
            profile: {
                data,
            },
        };
        expect(getProfile(state as StateScheme)).toEqual(state.profile);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateScheme> = {};
        expect(getProfile(state as StateScheme)).toEqual(undefined);
    });
});


describe('getProfileError', () => {
    test('should return value', () => {
        const state: DeepPartial<StateScheme> = {
            profile: {
                error: '123',
            },
        };
        expect(getProfileError(state as StateScheme)).toEqual('123');
    });
});

describe('getProfileLoading', () => {
    test('should return value', () => {
        const state: DeepPartial<StateScheme> = {
            profile: {
                isLoading: true,
            },
        };
        expect(getProfileLoading(state as StateScheme)).toBe(true);
    });
});
