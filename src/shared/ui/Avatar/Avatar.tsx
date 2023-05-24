import React, { CSSProperties, FC, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Icon } from '../Icon/Icon';
import cls from './Avatar.module.scss';

interface IAvatarProps {
   className?: string
   src?: string | React.VFC<React.SVGProps<SVGSVGElement>>
   width?: number | string
   height?: number | string
}

export const Avatar: FC<IAvatarProps> = (props) => {
    const {
        className,
        src,
        width = 100,
        height = 100,
    } = props;

    const styles = useMemo<CSSProperties>(() => ({
        width,
        height,
    }), [width, height]);


    if (typeof src !== "string" && src) {
        return (
            <Icon
                className={classNames(cls.Avatar, {}, [className])}
                style={styles}
                Svg={src}
            />
        );
    }

    return (
        <img
            className={classNames(cls.Avatar, {}, [className])}
            style={styles}
            src={src}
            alt="avatar"
        />
    );
};

