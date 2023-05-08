import { useCallback, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
    fetchProfileData,
    getProfileData,
    getProfileError, getProfileForm,
    getProfileLoading, getProfileReadonly, profileActions,
    ProfileCard,
    profileReducer,
} from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { regOnlyNumbers } from 'shared/lib/regExp/regExp';
import { onChangeInputFuncType } from "shared/ui/Input/Input";
import { Currency } from 'entities/Currency';
import { Country } from "entities/Country/model/types/Country";
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';
import cls from './ProfilePage.module.scss';


const reducers: ReducersList = {
    profile: profileReducer,
};

const ProfilePage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProfileData());
    }, [dispatch]);

    const formData = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);

    const onChangeFirstname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ firstname: value || '' }));
    }, [dispatch]);

    const onChangeLastname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ lastname: value || '' }));
    }, [dispatch]);

    const onChangeAge = useCallback((value: string, emptyString: boolean) => {
        const regNumbers = new RegExp(regOnlyNumbers);
        if (emptyString) {
            dispatch(profileActions.updateProfile({ age: undefined }));
        }
        if (value && (regNumbers.test(value))) {
            dispatch(profileActions.updateProfile({ age: Number(value) }));
        }
        else {
            return new Error('Возраст может состоять только из цифр');
        }
    }, [dispatch]);

    const onChangeCity = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ city: value || '' }));
    }, [dispatch]);

    const onChangeUsername = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ username: value || '' }));
    }, [dispatch]);

    const onChangeAvatar = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ avatar: value || '' }));
    }, [dispatch]);

    const onChangeCurrency = useCallback((currency: Currency) => {
        dispatch(profileActions.updateProfile({ currency }));
    }, [dispatch]);

    const onChangeCountry = useCallback((country: Country) => {
        dispatch(profileActions.updateProfile({ country }));
    }, [dispatch]);


    return (
        <DynamicModuleLoader reducers={reducers} removeReducerAfterUnmount>
            <div className={classNames(cls.ProfilePage, {}, [])}>
                <ProfilePageHeader />
                <ProfileCard
                    data={formData}
                    isLoading={isLoading}
                    error={error}
                    readOnly={readonly}
                    onChangeFirstname={onChangeFirstname}
                    onChangeLastname={onChangeLastname}
                    onChangeAge={onChangeAge}
                    onChangeCity={onChangeCity}
                    onChangeUsername={onChangeUsername}
                    onChangeAvatar={onChangeAvatar}
                    onChangeCurrency={onChangeCurrency}
                    onChangeCountry={onChangeCountry}
                />
            </div>
        </DynamicModuleLoader>
    );
};

export default ProfilePage;

