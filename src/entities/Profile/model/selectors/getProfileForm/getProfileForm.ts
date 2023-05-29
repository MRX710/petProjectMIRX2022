import { StateScheme } from 'app/providers/StoreProvider';

export const getProfileForm = (state: StateScheme) => state.profile?.form;

export const getProfileFormFirstName = (state: StateScheme) => state.profile?.form?.firstname ?? null;
export const getProfileFormLastname = (state: StateScheme) => state.profile?.form?.lastname ?? null;
export const getProfileFormUsername = (state: StateScheme) => state.profile?.form?.username;
export const getProfileFormAge = (state: StateScheme) => state.profile?.form?.age;
export const getProfileFormAvatar = (state: StateScheme) => state.profile?.form?.avatar;
export const getProfileFormCountry = (state: StateScheme) => state.profile?.form?.country;
export const getProfileFormCity = (state: StateScheme) => state.profile?.form?.city;
export const getProfileFormCurrency = (state: StateScheme) => state.profile?.form?.currency;

