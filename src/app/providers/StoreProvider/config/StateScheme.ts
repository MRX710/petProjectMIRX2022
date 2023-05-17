import { CounterScheme } from 'entities/Counter';
import { IUserScheme } from 'entities/User';
import { ILoginScheme } from 'features/AuthByUsername';
import {
    AnyAction, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { CombinedState, Dispatch } from 'redux';
import { IProfileScheme } from 'entities/Profile';
import { AxiosInstance } from 'axios';
import { To } from 'react-router-dom';
import { NavigateOptions } from 'react-router';
import { IArticleDetailsScheme } from 'entities/Article';

export interface StateScheme {
   counter: CounterScheme,
   user: IUserScheme

   // Async reducers
   loginForm?: ILoginScheme,
   profile?: IProfileScheme,
   articleDetails?: IArticleDetailsScheme
}

// типы для работы с редьюсерами
export type StateSchemeKey = keyof StateScheme;

export interface IReducerManager {
   getReducerMap: () => ReducersMapObject<StateScheme>
   // reduce: (state: StateScheme, action: AnyAction) => CombinedState<StateScheme>
   reduce: Reducer<CombinedState<StateScheme>>
   add: (key: StateSchemeKey, reducer: Reducer) => void
   remove: (key: StateSchemeKey) => void
}

export interface IReduxStoreWithManager extends EnhancedStore<StateScheme> {
   reducerManager: IReducerManager
}


// типы для работы с thunk, запросами
export interface IThunkExtraArg {
   api: AxiosInstance
   navigate?: (to: To, options?: NavigateOptions) => void
}

export interface IThunkConfig<T> {
   rejectValue: T;
   extra: IThunkExtraArg
   state: StateScheme
}
