import { CounterScheme } from 'entities/Counter';
import { IUserScheme } from 'entities/User';
import { ILoginScheme } from 'features/AuthByUsername';

export interface StateScheme {
   counter: CounterScheme,
   user: IUserScheme
   loginForm?: ILoginScheme,
}
