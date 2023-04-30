import { StateScheme } from 'app/providers/StoreProvider';

export const getLoginState = (state: StateScheme) => state?.loginForm;
