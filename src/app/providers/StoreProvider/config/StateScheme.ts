import { CounterScheme } from 'entities/Counter';
import { IUserScheme } from 'entities/User';
import { ILoginScheme } from 'features/AuthByUsername';
import {
    AnyAction, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { CombinedState } from 'redux';

export interface StateScheme {
   counter: CounterScheme,
   user: IUserScheme

   // Async reducers
   loginForm?: ILoginScheme,
}

export type StateSchemeKey = keyof StateScheme;

export interface IReducerManager {
   getReducerMap: () => ReducersMapObject<StateScheme>
   reduce: (state: StateScheme, action: AnyAction) => CombinedState<StateScheme>
   add: (key: StateSchemeKey, reducer: Reducer) => void
   remove: (key: StateSchemeKey) => void
}

export interface IReduxStoreWithManager extends EnhancedStore<StateScheme> {
   reducerManager: IReducerManager

}
