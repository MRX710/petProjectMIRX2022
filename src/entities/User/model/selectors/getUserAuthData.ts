import { StateScheme } from 'app/providers/StoreProvider';

export const getUserAuthData = (state: StateScheme) => state.user.authData;
