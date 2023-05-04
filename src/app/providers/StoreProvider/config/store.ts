import {
    AnyAction, configureStore, EnhancedStore, MiddlewareArray, ReducersMapObject, ThunkDispatch,
} from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { $api } from 'shared/api/api';
import { NavigateOptions } from 'react-router';
import { To } from 'react-router-dom';
import { CombinedState, Reducer } from 'redux';
import { ThunkMiddleware } from 'redux-thunk';
import { IThunkExtraArg, StateScheme } from './StateScheme';
import { createReducerManager } from './reducerManager';


export function createReduxStore(
    initialState?: StateScheme,
    asyncReducers?: ReducersMapObject<StateScheme>,
    navigate?: (to: To, options?: NavigateOptions) => void,
) {
    const rootReducers: ReducersMapObject<StateScheme> = {
        // нужны asyncReducers в случае, когда storybook грузится
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const extraArg: IThunkExtraArg = {
        api: $api,
        navigate,
    };


    // const store = configureStore<StateScheme>({

    // const store = configureStore<EnhancedStore<CombinedState<StateScheme>,
    //    AnyAction,
    //    MiddlewareArray<[ThunkMiddleware<CombinedState<StateScheme>, AnyAction, IThunkExtraArg>]>>>({

    const store = configureStore({
        reducer: reducerManager.reduce,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: extraArg,
            },
        }),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
// export type AppDispatch = ThunkDispatch<CombinedState<StateScheme>, IThunkExtraArg, AnyAction>


