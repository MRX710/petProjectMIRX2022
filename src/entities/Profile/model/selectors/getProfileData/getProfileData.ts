import { StateScheme } from 'app/providers/StoreProvider';

export const getProfileData = (state: StateScheme) => state.profile?.data;

export const getProfileFirstName = (state: StateScheme) => state.profile?.data?.firstname ?? null;
export const getProfileLastname = (state: StateScheme) => state.profile?.data?.lastname ?? null;
export const getProfileUsername = (state: StateScheme) => state.profile?.data?.username;
export const getProfileAge = (state: StateScheme) => state.profile?.data?.age;
export const getProfileAvatar = (state: StateScheme) => state.profile?.data?.avatar;
export const getProfileCountry = (state: StateScheme) => state.profile?.data?.country;
export const getProfileCity = (state: StateScheme) => state.profile?.data?.city;
export const getProfileCurrency = (state: StateScheme) => state.profile?.data?.currency;

