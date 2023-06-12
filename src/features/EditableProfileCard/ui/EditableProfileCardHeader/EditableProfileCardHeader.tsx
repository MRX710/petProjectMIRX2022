import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from "entities/User";
import { profileActions } from '../../model/slice/profileSlice';
import cls from './EditableProfileCardHeader.module.scss';
import { updateProfileData } from '../../model/service/updateProfileData/updateProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';

interface IProfilePageHeaderProps {
    className?: string
}

export const EditableProfileCardHeader: FC<IProfilePageHeaderProps> = (props) => {
    const { className } = props;

    const { t } = useTranslation('profile');
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const canEdit = authData?.id === profileData?.id;
    const readonly = useSelector(getProfileReadonly);
    const dispatch = useAppDispatch();

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadOnly(false));
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);


    return (
        <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
            <Text title={t('Профиль')} />
            {
                canEdit
                    ? (
                        <div className={cls.ProfilePageHeader__btnsWrapper}>
                            {
                                readonly
                                    ? (
                                        <Button
                                            theme={ButtonTheme.OUTLINE}
                                            className={cls.ProfilePageHeader__editBtn}
                                            onClick={onEdit}
                                        >
                                            {t('Редактировать')}
                                        </Button>
                                    )
                                    : (
                                        <>
                                            <Button
                                                theme={ButtonTheme.OUTLINE_RED}
                                                className={cls.ProfilePageHeader__editBtn}
                                                onClick={onCancelEdit}
                                            >
                                                {t('Отменить')}
                                            </Button>
                                            <Button
                                                theme={ButtonTheme.OUTLINE}
                                                className={cls.ProfilePageHeader__save}
                                                onClick={onSave}
                                            >
                                                {t('Сохранить')}
                                            </Button>
                                        </>
                                    )
                            }
                        </div>
                    )
                    : null
            }
        </div>
    );
};

