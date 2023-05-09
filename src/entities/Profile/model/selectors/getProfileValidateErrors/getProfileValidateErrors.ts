import { StateScheme } from 'app/providers/StoreProvider';

export const getProfileValidateErrors = (state: StateScheme) => state.profile?.validateErrors;
