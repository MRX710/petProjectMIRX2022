import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
   className?: string
   isOpen: boolean
}

export const LoginForm: FC<LoginFormProps> = (props) => {
    const {
        className,
        isOpen,
    } = props;

    const { t } = useTranslation();

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Input
                autofocus={isOpen}
                className={cls.input}
                placeholder={t('Введите username')}
            />
            <Input
                className={cls.input}
                placeholder={t('Введите пароль')}
            />
            <Button className={cls.loginBtn}>
                {t('Войти')}
            </Button>
        </div>
    );
};

