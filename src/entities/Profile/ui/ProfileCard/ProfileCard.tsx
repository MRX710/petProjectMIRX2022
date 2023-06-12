import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Input, onChangeInputFuncType } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Currency } from "entities/Currency/model/types/currency";
import { CurrencySelect } from "entities/Currency";
import { Country, CountrySelect } from "entities/Country";
import { IProfile } from '../../model/types/profileTypes';
import cls from './ProfileCard.module.scss';

interface IProfileCardProps {
    className?: string
    data?: IProfile
    error?: string
    readOnly?: boolean
    isLoading?: boolean
    onChangeFirstname?: onChangeInputFuncType
    onChangeLastname?: onChangeInputFuncType
    onChangeAge?: onChangeInputFuncType
    onChangeCity?: onChangeInputFuncType
    onChangeUsername?: onChangeInputFuncType
    onChangeAvatar?: onChangeInputFuncType
    onChangeCurrency?: (currency: Currency) => void
    onChangeCountry?: (country: Country) => void
}

export const ProfileCard: FC<IProfileCardProps> = (props) => {
    const {
        className,
        data,
        isLoading,
        error,
        readOnly,
        onChangeFirstname, onChangeLastname, onChangeAge,
        onChangeCity, onChangeUsername, onChangeAvatar,
        onChangeCurrency, onChangeCountry,
    } = props;

    const { t } = useTranslation('profile');

    const mods: Mods = {
        [cls.editing]: !readOnly,
    };

    if (isLoading) {
        return (
            <div className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
                <Text
                    align={TextAlign.CENTER}
                    theme={TextTheme.ERROR}
                    title={t('Произошла ошибка при загрузке профиля')}
                    text={t('Попробуйте обновить страницу')}
                />
            </div>
        );
    }

    return (
        <div className={classNames(cls.ProfileCard, mods, [className])}>
            <div className={cls.data}>
                {
                    data?.avatar
                        ? (
                            <div className={cls.avatarWrapper}>
                                <Avatar
                                    src={data?.avatar}
                                    height={100}
                                    width={100}
                                />
                            </div>
                        )
                        : null
                }
                <Input
                    value={data?.firstname}
                    placeholder={t('Ваше имя')}
                    className={cls.input}
                    readOnly={readOnly}
                    onChange={onChangeFirstname}
                />
                <Input
                    value={data?.lastname}
                    placeholder={t('Ваша фамилия')}
                    className={cls.input}
                    readOnly={readOnly}
                    onChange={onChangeLastname}
                />
                <Input
                    value={data?.username}
                    placeholder={t('Ваш username')}
                    className={cls.input}
                    readOnly={readOnly}
                    onChange={onChangeUsername}
                />
                <Input
                    value={data?.age}
                    placeholder={t('Ваш возраст')}
                    className={cls.input}
                    readOnly={readOnly}
                    onChange={onChangeAge}
                />
                <Input
                    value={data?.city}
                    placeholder={t('Ваш город')}
                    className={cls.input}
                    readOnly={readOnly}
                    onChange={onChangeCity}
                />

                <Input
                    value={data?.avatar}
                    placeholder={t('Ваше фото профиля')}
                    className={cls.input}
                    readOnly={readOnly}
                    onChange={onChangeAvatar}
                />

                <CurrencySelect
                    className={cls.input}
                    value={data?.currency}
                    onChange={onChangeCurrency}
                    readonly={readOnly}
                />
                <CountrySelect
                    value={data?.country}
                    className={cls.input}
                    onChange={onChangeCountry}
                    readonly={readOnly}
                />
            </div>
        </div>
    );
};

