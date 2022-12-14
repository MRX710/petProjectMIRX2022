import { ButtonHTMLAttributes, FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ThemeButton{
   CLEAR = 'clear',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
   className?: string;
   theme?: ThemeButton[];
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        className, children, theme = [''], ...otherProps
    } = props;

    return (
        // eslint-disable-next-line max-len,react/button-has-type,no-unsafe-optional-chaining
        <button className={classNames(cls.Button, {}, [className, ...theme?.map((classNameStr) => cls[classNameStr])])} {...otherProps}>
            {children}
        </button>
    );
};
