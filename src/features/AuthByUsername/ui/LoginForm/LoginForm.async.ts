import { FC, lazy } from 'react';
import { ILoginFormProps } from './LoginForm';

export const LoginFormAsync = lazy<FC<ILoginFormProps>>(() => new Promise((resolve) => {
    // @ts-ignore
    // ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!!
    setTimeout(() => resolve(import('./LoginForm')), 1500);
}));
