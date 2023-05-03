import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export enum TextTheme {
   PRIMARY = 'primary',
   ERROR = 'error',
}

export interface TextProps {
   className?: string
   title?: string
   text?: string
   theme?: TextTheme
}

export const Text = memo((props: TextProps) => {
    const {
        className,
        title,
        text,
        theme = TextTheme.PRIMARY,
    } = props;


    return (
        <div className={classNames(cls.Text, { [cls[theme]]: true }, [className])}>
            {
                title
                    ? (
                        <p className={cls.title}>
                            {title}
                        </p>
                    )
                    : null
            }
            {
                text ? (
                    <p className={cls.text}>
                        {text}
                    </p>
                )
                    : null
            }
        </div>
    );
});

