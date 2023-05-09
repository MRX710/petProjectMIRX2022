export {
    getProfileValidateErrors,
} from "./model/selectors/getProfileValidateErrors/getProfileValidateErrors";

export {
    updateProfileData,
} from "./model/service/updateProfileData/updateProfileData";

export {
    ProfileCard,
} from './ui/ProfileCard/ProfileCard';

export {
    fetchProfileData,
} from './model/service/fetchProfileData/fetchProfileData';

export {
    IProfile,
    IProfileScheme,
    ValidateProfileError,
} from './model/types/profileTypes';

export {
    profileReducer,
    profileActions,
} from './model/slice/profileSlice';

export {
    getProfile,
    getProfileLoading,
    getProfileError,
    getProfileReadOnly,
} from './model/selectors/getProfile/getProfile';

export {
    getProfileData,
    getProfileAge,
    getProfileAvatar,
    getProfileCity,
    getProfileCountry,
    getProfileCurrency,
    getProfileFirstName,
    getProfileLastname,
    getProfileUsername,
} from './model/selectors/getProfileData/getProfileData';

export {
    getProfileForm,
    getProfileFormAge,
    getProfileFormAvatar,
    getProfileFormCity,
    getProfileFormCountry,
    getProfileFormCurrency,
    getProfileFormFirstName,
    getProfileFormLastname,
    getProfileFormUsername,
} from './model/selectors/getProfileForm/getProfileForm';

export {
    getProfileReadonly,
} from './model/selectors/getProfileReadonly/getProfileReadonly';
