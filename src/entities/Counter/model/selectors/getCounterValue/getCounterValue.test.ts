import { DeepPartial } from '@reduxjs/toolkit';
import { StateScheme } from 'app/providers/StoreProvider';
import { getCounterValue } from './getCounterValue';

describe('getCounterValue', () => {
    test('', () => {
        const state: DeepPartial<StateScheme> = {
            counter: { value: 10 },
        };
        expect(getCounterValue(state as StateScheme)).toEqual(10);
    });
});
