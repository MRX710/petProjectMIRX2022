import { Currency } from "entities/Currency/model/consts/currency";
import { Country } from "entities/Country/model/consts/Country";

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
