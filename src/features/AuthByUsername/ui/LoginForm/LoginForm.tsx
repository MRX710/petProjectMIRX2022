import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { IReduxStoreWithManager } from 'app/providers/StoreProvider';
import {
    DynamicModuleLoader,
    ReducersList,
    ReducersListEntry,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import {
    getLoginError, getLoginIsLoading,
    getLoginPassword,
    getLoginUsername,
} from '../../model/selectors/getLoginState/getLoginState';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

export interface ILoginFormProps {
   className?: string
   isOpen: boolean
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm = memo((props: ILoginFormProps) => {
    const {
        className,
        isOpen,
    } = props;

    const { t } = useTranslation();
    const dispatch = useDispatch();

    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);


    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
        // eslint-disable-next-line
   }, []);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
        // eslint-disable-next-line
   }, []);

    const onLoginClick = useCallback(() => {
        dispatch(loginByUsername({ username, password }));
        // eslint-disable-next-line
   }, [username, password]);

    return (
        <DynamicModuleLoader reducers={initialReducers} removeReducerAfterUnmount>
            <div className={classNames(cls.LoginForm, {}, [className])}>
                <Text title={t('Форма авторизации')} />
                {
                    error
                        ? (
                            <Text text={t('Вы ввели неверный логин или пароль')} theme={TextTheme.ERROR} />
                        ) : null
                }
                <Input
                    autofocus={isOpen}
                    className={cls.input}
                    placeholder={t('Введите username')}
                    onChange={onChangeUsername}
                    value={username}
                />
                <Input
                    className={cls.input}
                    placeholder={t('Введите пароль')}
                    onChange={onChangePassword}
                    value={password}
                />
                <Button
                    className={cls.loginBtn}
                    onClick={onLoginClick}
                    disabled={isLoading}
                >
                    {t('Войти')}
                </Button>
            </div>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
