import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { checkArrayToMap } from "shared/lib/checkout/checkout";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { regOnlyNumbers } from "shared/lib/regExp/regExp";
import { Currency } from "entities/Currency";
import { Country } from "entities/Country";
import { useCallbackInTimeout } from "shared/lib/hooks/useCallbackInTimeout/useCallbackInTimeout";
import { useSelector } from "react-redux";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { ProfileCard } from 'entities/Profile';
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { ValidateProfileError } from "../../model/types/profileTypes";
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileError, getProfileLoading } from '../../model/selectors/getProfile/getProfile';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { fetchProfileData } from '../../model/service/fetchProfileData/fetchProfileData';

interface EditableProfileCardProps {
    className?: string;
    id: string
}

const reducers: ReducersList = {
    profile: profileReducer,
};

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
    const {
        className,
        id,
    } = props;

    const dispatch = useAppDispatch();
    useInitialEffect(() => {
        dispatch(fetchProfileData(id));
    });
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

    const callErrorWithTimeout = useCallbackInTimeout(2000);

    const onChangeFirstname = useCallback((value: string | null) => {
        if (!value) {
            dispatch(profileActions.addError(ValidateProfileError.INCORRECT_USER_DATA));
        }
        else if (!!value && validateErrors) {
            dispatch(profileActions.removeErrors(ValidateProfileError.INCORRECT_USER_DATA));
        }
        dispatch(profileActions.updateProfile({ firstname: value }));
    }, [dispatch, validateErrors]);

    const onChangeLastname = useCallback((value: string | null) => {
        dispatch(profileActions.updateProfile({ lastname: value }));
    }, [dispatch]);

    const onChangeAge = useCallback((value: string | null, emptyString: boolean) => {
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
            callErrorWithTimeout(
                () => dispatch(profileActions.removeErrors(ValidateProfileError.INCORRECT_AGE)),
            );

            return new Error(ValidateProfileError.INCORRECT_AGE);
        }
    }, [dispatch, validateErrors, callErrorWithTimeout]);

    const onChangeCity = useCallback((value: string | null) => {
        dispatch(profileActions.updateProfile({ city: value || '' }));
    }, [dispatch]);

    const onChangeUsername = useCallback((value: string | null) => {
        dispatch(profileActions.updateProfile({ username: value || '' }));
    }, [dispatch]);

    const onChangeAvatar = useCallback((value: string | null) => {
        dispatch(profileActions.updateProfile({ avatar: value || '' }));
    }, [dispatch]);

    const onChangeCurrency = useCallback((currency: Currency) => {
        dispatch(profileActions.updateProfile({ currency }));
    }, [dispatch]);

    const onChangeCountry = useCallback((country: Country) => {
        dispatch(profileActions.updateProfile({ country }));
    }, [dispatch]);

    return (

        <DynamicModuleLoader reducers={reducers}>
            {
                validateErrors && checkArrayToMap(validateErrors)
                    ? validateErrors.map((error: ValidateProfileError) => (
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
        </DynamicModuleLoader>
    );
});
