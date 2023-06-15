import { Currency } from "entities/Currency/model/consts/currency";
import { Country } from "entities/Country/model/consts/Country";
import { ValidateProfileError } from "../consts/consts";

export interface IProfile {
    id?: string
    'firstname'?: string | null,
    'lastname'?: string | null,
    'age'?: number,
    'currency'?: Currency,
    'country'?: Country,
    'city'?: string,
    'username'?: string,
    'avatar'?: string
}

export interface IProfileScheme {
    data?: IProfile
    form?: IProfile
    isLoading: boolean
    error?: string
    readonly: boolean
    validateErrors?: ValidateProfileError[]
}
