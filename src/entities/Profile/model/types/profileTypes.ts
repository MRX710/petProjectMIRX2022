import { Currency } from "entities/Currency/model/types/currency";
import { Country } from "entities/Country/model/types/Country";

export enum ValidateProfileError {
   SERVER_ERROR = 'SERVER_ERROR',
   NO_USER_DATA = 'NO_USER_DATA',
   INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
   INCORRECT_AGE = 'INCORRECT_AGE',
   INCORRECT_COUNTRY = 'INCORRECT_COUNTRY',
}

export interface IProfile {
   id?: string
   'firstname'?: string,
   'lastname'?: string,
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
