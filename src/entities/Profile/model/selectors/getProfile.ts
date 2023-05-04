import { StateScheme } from 'app/providers/StoreProvider';

export const getProfile = (state: StateScheme) => state.profile;

export const getProfileLoading = (state: StateScheme) => state.profile?.isLoading;
export const getProfileError = (state: StateScheme) => state.profile?.error;
export const getProfileReadOnly = (state: StateScheme) => state.profile?.readonly;

