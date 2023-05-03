import { Country, Currency } from 'shared/const/common';

export interface IProfile {
   'firstname': string,
   'lastname': string,
   'age': number,
   'currency': Currency,
   'country': Country,
   'city': string,
   'username': string,
   'avatar'?: string
}

export interface IProfileScheme {
   data?: IProfile
   isLoading: boolean
   error?: string
   readonly: boolean
}
