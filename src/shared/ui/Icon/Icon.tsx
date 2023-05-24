import React, { CSSProperties, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IIconProps {
   className?: string
   Svg: React.VFC<React.SVGProps<SVGSVGElement>>
   style?: CSSProperties
}

export const Icon = memo((props: IIconProps) => {
    const {
        className,
        Svg,
        style = {},
    } = props;

    return (
        <Svg className={classNames(cls.Icon, {}, [className])} style={style} />
    );
});

