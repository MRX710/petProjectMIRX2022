import { StateScheme } from 'app/providers/StoreProvider';

export const getProfileReadonly = (state: StateScheme) => state.profile?.readonly;
