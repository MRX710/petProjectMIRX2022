import { Currency } from "entities/Currency";
import { Country } from "entities/Country";
import { ValidateProfileError } from "../../consts/consts";
import { validateProfileData } from "./validateProfileData";

const data = {
    firstname: "MIRX",
    lastname: "MIRX001",
    age: 21,
    currency: Currency.RUB,
    country: Country.Russia,
    city: "Krasnodar",
    username: "admin",
};

describe('validateProfileData.test', () => {
    test('success', () => {
        const result = validateProfileData(data);
        expect(result).toEqual([]);
    });

    test('without first and lastname', () => {
        const result = validateProfileData(
            {
                ...data,
                firstname: '',
                lastname: '',
            },
        );
        expect(result).toEqual(
            [ValidateProfileError.INCORRECT_USER_DATA],
        );
    });

    test('incorrect age', () => {
        const result = validateProfileData(
            {
                ...data,
                age: undefined,
            },
        );
        expect(result).toEqual(
            [ValidateProfileError.INCORRECT_AGE],
        );
    });

    test('incorrect country', () => {
        const result = validateProfileData(
            {
                ...data,
                country: undefined,
            },
        );
        expect(result).toEqual(
            [ValidateProfileError.INCORRECT_COUNTRY],
        );
    });

    test('incorrect all', async () => {
        const result = validateProfileData({});
        expect(result).toEqual(
            [
                ValidateProfileError.INCORRECT_USER_DATA,
                ValidateProfileError.INCORRECT_AGE,
                ValidateProfileError.INCORRECT_COUNTRY,
            ],
        );
    });
});
