import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Currency } from "entities/Currency";
import { Country } from "entities/Country";
import { fetchProfileData } from './fetchProfileData';

const response = {
    firstname: "MIRX",
    lastname: "MIRX001",
    age: 21,
    currency: Currency.RUB,
    country: Country.Russia,
    city: "Krasnodar",
    username: "admin",
};

describe('fetchProfileData', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(
            Promise.resolve({ data: response }),
        );
        const result = await thunk.callThunk();

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result?.payload).toEqual(response);
    });


    test('rejected', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(
            Promise.resolve({ status: 403 }),
        );
        const result = await thunk.callThunk();
        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
    });
});
