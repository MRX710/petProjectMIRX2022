export {
    updateProfileData,
} from "entities/Profile/model/service/updateProfileData/updateProfileData";

export {
    ProfileCard,
} from './ui/ProfileCard/ProfileCard';

export {
    fetchProfileData,
} from './model/service/fetchProfileData/fetchProfileData';

export {
    IProfile,
    IProfileScheme,
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
} from './model/selectors/getProfile';

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
} from './model/selectors/getProfileData';

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
} from './model/selectors/getProfileForm';

export {
    getProfileReadonly,
} from './model/selectors/getProfileReadonly/getProfileReadonly';
