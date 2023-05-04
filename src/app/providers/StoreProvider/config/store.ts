import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { $api } from 'shared/api/api';
import { NavigateOptions } from 'react-router';
import { To } from 'react-router-dom';
import { CombinedState, Reducer } from 'redux';
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
    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateScheme>>,
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


