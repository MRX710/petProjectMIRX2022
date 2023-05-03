import { DeepPartial } from '@reduxjs/toolkit';
import { StateScheme } from 'app/providers/StoreProvider';
import {
    getLoginError, getLoginIsLoading, getLoginPassword, getLoginUsername, 
} from './getLoginState';


describe('getLoginUsername', () => {
    test('should return value', () => {
        const state: DeepPartial<StateScheme> = {
            loginForm: {
                username: '123123',
            },
        };
        expect(getLoginUsername(state as StateScheme)).toEqual('123123');
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateScheme> = {};
        expect(getLoginUsername(state as StateScheme)).toEqual('');
    });
});

describe('getLoginPassword', () => {
    test('should return value', () => {
        const state: DeepPartial<StateScheme> = {
            loginForm: {
                password: '123123',
            },
        };
        expect(getLoginPassword(state as StateScheme)).toEqual('123123');
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateScheme> = {};
        expect(getLoginPassword(state as StateScheme)).toEqual('');
    });
});


describe('getLoginError', () => {
    test('should return error', () => {
        const state: DeepPartial<StateScheme> = {
            loginForm: {
                error: 'error',
            },
        };
        expect(getLoginError(state as StateScheme)).toEqual('error');
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateScheme> = {};
        expect(getLoginError(state as StateScheme)).toEqual(undefined);
    });
});


describe('getLoginIsLoading', () => {
    test('should return true', () => {
        const state: DeepPartial<StateScheme> = {
            loginForm: {
                isLoading: true,
            },
        };
        expect(getLoginIsLoading(state as StateScheme)).toEqual(true);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateScheme> = {};
        expect(getLoginIsLoading(state as StateScheme)).toEqual(false);
    });
});
