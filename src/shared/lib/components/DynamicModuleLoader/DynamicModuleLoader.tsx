import { FC, ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { IReduxStoreWithManager } from 'app/providers/StoreProvider';
import { StateSchemeKey } from 'app/providers/StoreProvider/config/StateScheme';
import { Reducer } from '@reduxjs/toolkit';


export type ReducersList = {
   [name in StateSchemeKey]?: Reducer // объект ключ значение
}

export interface IDynamicModuleLoader {
   children: ReactNode
   reducers: ReducersList
   removeReducerAfterUnmount?: boolean
}

export const DynamicModuleLoader: FC<IDynamicModuleLoader> = (props) => {
    const {
        children,
        reducers,
        removeReducerAfterUnmount = true,
    } = props;

    const store = useStore() as IReduxStoreWithManager;
    const dispatch = useDispatch();

    useEffect(() => {
        Object.entries(reducers)?.forEach(([name, reducer]) => {
            dispatch({ type: `Init ${name} reducer` });
            store.reducerManager.add(name as StateSchemeKey, reducer);
        });

        return () => {
            if (removeReducerAfterUnmount) {
                Object.entries(reducers)?.forEach(([reducerKey, _]) => {
                    store.reducerManager.remove(reducerKey as StateSchemeKey);
                    dispatch({ type: `Destroy ${reducerKey} reducer` });
                });
            }
        };
        // eslint-disable-next-line
   }, []);

    return (
        <>
            {children}
        </>
    );
};

