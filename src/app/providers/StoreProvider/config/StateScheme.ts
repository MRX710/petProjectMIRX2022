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
import { IArticleDetailsCommentsScheme } from "pages/ArticleDetailPage";
import { IAddCommentFormScheme } from 'features/addCommentForm';
import { IArticlesPageScheme } from "pages/ArticlesPage";
import { IScrollRestoreScheme } from "features/scrollRestore";
import { IArticlesSortScheme } from "features/articlesSort";

export interface StateScheme {
   counter: CounterScheme,
   user: IUserScheme
   scrollRestore: IScrollRestoreScheme

   // Async reducers
   loginForm?: ILoginScheme,
   profile?: IProfileScheme,
   // articles
   articlesPage?: IArticlesPageScheme
   articleDetails?: IArticleDetailsScheme,
   articleDetailsComments?: IArticleDetailsCommentsScheme
   articlesSort?: IArticlesSortScheme,

   addCommentForm?: IAddCommentFormScheme
}

// типы для работы с редьюсерами
export type StateSchemeKey = keyof StateScheme;
export type MountedReducers = OptionalRecord<StateSchemeKey, boolean>;

export interface IReducerManager {
   getReducerMap: () => ReducersMapObject<StateScheme>
   // reduce: (state: StateScheme, action: AnyAction) => CombinedState<StateScheme>
   reduce: Reducer<CombinedState<StateScheme>>
   add: (key: StateSchemeKey, reducer: Reducer) => void
   remove: (key: StateSchemeKey) => void
   // true - вмонтирован, false - не вмонтирован
   getMountedReducers: () => MountedReducers
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
