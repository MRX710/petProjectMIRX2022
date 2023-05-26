import { ReactNode, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createReduxStore } from 'app/providers/StoreProvider/config/store';
import { StateScheme } from 'app/providers/StoreProvider/config/StateScheme';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { getUserAuthData, userActions } from "entities/User";
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

interface StoreProviderProps {
   children?: ReactNode;
   initialState?: StateScheme,
   asyncReducers?: DeepPartial<ReducersMapObject<StateScheme>>
}

export const StoreProvider = (props: StoreProviderProps) => {
    const {
        children,
        initialState,
        asyncReducers,
    } = props;

    // const navigate = useNavigate();

    const store = createReduxStore(
        initialState,
       asyncReducers as ReducersMapObject<StateScheme>,
        // navigate,
    );

    console.log('render');

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
