import { CounterScheme } from 'entities/Counter';
import { IUserScheme } from 'entities/User';

export interface StateScheme {
   counter: CounterScheme,
   user: IUserScheme
}
