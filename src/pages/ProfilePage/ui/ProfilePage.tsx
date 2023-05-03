import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { profileReducer } from 'entities/Profile';
import cls from './ProfilePage.module.scss';

interface IProfilePageProps {
   className?: string
}

const reducers: ReducersList = {
    profile: profileReducer,
};

const ProfilePage: FC<IProfilePageProps> = (props) => {
    const { className } = props;

    const { t } = useTranslation();

    return (
        <DynamicModuleLoader reducers={reducers} removeReducerAfterUnmount>
            <div className={classNames(cls.ProfilePage, {}, [className])}>
                {t('PROFILE PAGE')}
            </div>
        </DynamicModuleLoader>
    );
};

export default ProfilePage;

