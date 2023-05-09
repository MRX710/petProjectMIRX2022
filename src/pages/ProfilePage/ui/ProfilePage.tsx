import { useCallback, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
    fetchProfileData,
    getProfileError, getProfileForm,
    getProfileLoading, getProfileReadonly, getProfileValidateErrors, profileActions,
    ProfileCard,
    profileReducer, ValidateProfileError,
} from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { regOnlyNumbers } from 'shared/lib/regExp/regExp';
import { Currency } from 'entities/Currency';
import { Country } from "entities/Country/model/types/Country";
import { checkArrayToMap } from "shared/lib/checkout/checkout";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';
import cls from './ProfilePage.module.scss';


const reducers: ReducersList = {
    profile: profileReducer,
};

const ProfilePage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchProfileData());
        }
    }, [dispatch]);

    const { t } = useTranslation('profile');

    const formData = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);
    const validateErrors = useSelector(getProfileValidateErrors);

    const validateErrorsTranslate = {
        [ValidateProfileError.SERVER_ERROR]: t('Ошибка сервера'),
        [ValidateProfileError.NO_USER_DATA]: t('Данные не указаны'),
        [ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
        [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
        [ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректный регион'),
    };

    const onChangeFirstname = useCallback((value?: string) => {
        if (value?.length === 0) {
            dispatch(profileActions.addError(ValidateProfileError.INCORRECT_USER_DATA));
        }
        else if (value?.length && validateErrors) {
            dispatch(profileActions.removeErrors(ValidateProfileError.INCORRECT_USER_DATA));
        }
        dispatch(profileActions.updateProfile({ firstname: value || '' }));
    }, [dispatch, validateErrors]);

    const onChangeLastname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ lastname: value || '' }));
    }, [dispatch]);

    const onChangeAge = useCallback((value: string, emptyString: boolean) => {
        const regNumbers = new RegExp(regOnlyNumbers);
        if (emptyString) {
            dispatch(profileActions.updateProfile({ age: undefined }));
            if (validateErrors) {
                dispatch(profileActions.removeErrors(ValidateProfileError.INCORRECT_AGE));
            }
        }
        if (value && (regNumbers.test(value)) && Number(value) < 150) {
            dispatch(profileActions.updateProfile({ age: Number(value) }));
            if (validateErrors) {
                dispatch(profileActions.removeErrors(ValidateProfileError.INCORRECT_AGE));
            }
        }
        else {
            dispatch(profileActions.addError(ValidateProfileError.INCORRECT_AGE));
            return new Error(ValidateProfileError.INCORRECT_AGE);
        }
    }, [dispatch, validateErrors]);

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
                {
                    validateErrors && checkArrayToMap(validateErrors)
                        ? validateErrors.map((error) => (
                            <Text
                                theme={TextTheme.ERROR}
                                text={validateErrorsTranslate[error]}
                                key={error}
                            />
                        )) : null
                }
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

