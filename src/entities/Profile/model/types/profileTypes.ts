import { Currency } from "entities/Currency/model/types/currency";
import { Country } from "entities/Country/model/types/Country";

export interface IProfile {
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
}
