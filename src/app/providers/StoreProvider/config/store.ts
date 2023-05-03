import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { StateScheme } from './StateScheme';
import { createReducerManager } from './reducerManager';


export function createReduxStore(initialState?: StateScheme, asyncReducers?: ReducersMapObject<StateScheme>) {
    const rootReducers: ReducersMapObject<StateScheme> = {
        // нужны asyncReducers в случае, когда storybook грузится
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const store = configureStore<StateScheme>({
        reducer: reducerManager.reduce,
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];


