import {
    AnyAction, combineReducers, ReducersMapObject, Reducer,
} from '@reduxjs/toolkit';
import { CombinedState } from 'redux';
import {
    IReducerManager, MountedReducers, StateScheme, StateSchemeKey,
} from './StateScheme';


export function createReducerManager(initialReducers: ReducersMapObject<StateScheme>): IReducerManager {
    const reducers = { ...initialReducers };

    let combinedReducer = combineReducers(reducers);

    let keysToRemove: StateSchemeKey[] = [];
    const mountedReducers: MountedReducers = {};

    return {
        getReducerMap: () => reducers,
        getMountedReducers: () => mountedReducers,

        reduce: (state: StateScheme | undefined, action: AnyAction) => {
            if (keysToRemove.length > 0 && state) {
                state = { ...state };
                keysToRemove.forEach((key) => {
                    delete state?.[key];
                });
                keysToRemove = [];
            }

            return combinedReducer(state, action);
        },

        add: (key: StateSchemeKey, reducer: Reducer) => {
            if (!key || reducers[key]) {
                return;
            }

            reducers[key] = reducer;
            mountedReducers[key] = true;

            combinedReducer = combineReducers(reducers);
        },

        remove: (key: StateSchemeKey) => {
            if (!key || !reducers[key]) {
                return;
            }

            delete reducers[key];

            keysToRemove.push(key);
            mountedReducers[key] = false;

            combinedReducer = combineReducers(reducers);
        },
    };
}
