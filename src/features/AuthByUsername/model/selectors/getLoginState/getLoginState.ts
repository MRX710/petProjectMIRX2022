import { StateScheme } from 'app/providers/StoreProvider';

export const getLoginState = (state: StateScheme) => state?.loginForm;

export const getLoginUsername = (state: StateScheme) => state?.loginForm?.username || '';
export const getLoginPassword = (state: StateScheme) => state?.loginForm?.password || '';
export const getLoginError = (state: StateScheme) => state?.loginForm?.error;
export const getLoginIsLoading = (state: StateScheme) => state?.loginForm?.isLoading || false;
