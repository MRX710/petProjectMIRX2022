import { DeepPartial } from '@reduxjs/toolkit';
import { ILoginScheme } from '../types/loginScheme';
import { loginActions, loginReducer } from './loginSlice';

describe('loginSlice.test', () => {
    test('test set username', () => {
        const state: DeepPartial<ILoginScheme> = { username: '123' };
        expect(loginReducer(
          state as ILoginScheme,
          loginActions.setUsername('123123'),
        )).toEqual({ username: '123123' });
    });

    test('test set password', () => {
        const state: DeepPartial<ILoginScheme> = { password: '123' };
        expect(loginReducer(
          state as ILoginScheme,
          loginActions.setPassword('123123'),
        )).toEqual({ password: '123123' });
    });
});
