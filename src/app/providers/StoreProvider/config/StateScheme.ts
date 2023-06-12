import { CounterScheme } from 'entities/Counter';
import { IUserScheme } from 'entities/User';
import { ILoginScheme } from 'features/AuthByUsername';
import { EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { CombinedState } from 'redux';
import { AxiosInstance } from 'axios';
import { To } from 'react-router-dom';
import { NavigateOptions } from 'react-router';
import { IArticleDetailsScheme } from 'entities/Article';
import { IArticlesPageScheme } from "pages/ArticlesPage";
import { IScrollRestoreScheme } from "features/scrollRestore";
import { IArticlesSortScheme } from "features/articlesSort";
import { rtkApi } from "shared/api/rtkApi";
import { IArticleCommentsListScheme } from 'features/ArticleComments';
import { IArticleCommentFormScheme } from "features/ArticleComments/model/types/ArticleCommentFormScheme";
import { IProfileScheme } from 'features/EditableProfileCard';

export interface StateScheme {
    counter: CounterScheme,
    user: IUserScheme
    scrollRestore: IScrollRestoreScheme
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

    // Async reducers

    loginForm?: ILoginScheme,
    profile?: IProfileScheme,

    // articles
    articlesPage?: IArticlesPageScheme
    articleDetails?: IArticleDetailsScheme,
    articlesSort?: IArticlesSortScheme,

    ArticleCommentsList?: IArticleCommentsListScheme
    ArticleCommentForm?: IArticleCommentFormScheme
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
