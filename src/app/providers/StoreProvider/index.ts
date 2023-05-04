import { AppDispatch, createReduxStore } from './config/store';
import { StoreProvider } from './ui/StoreProvider';
import type { IReduxStoreWithManager, IThunkConfig, StateScheme } from './config/StateScheme';
import { IThunkExtraArg } from './config/StateScheme';

export {
    StoreProvider,
    createReduxStore,
    StateScheme,
    IReduxStoreWithManager,
    AppDispatch,
    IThunkExtraArg,
    IThunkConfig,
};
