import { Currency } from "entities/Currency/model/types/currency";
import { Country } from "entities/Country/model/types/Country";

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
